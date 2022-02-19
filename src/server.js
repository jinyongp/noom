import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);

/**
 * @type {SocketIO.Server}
 */
const wsServer = SocketIO(httpServer);

function getPublicChannels() {
  return Array.from(wsServer.sockets.adapter.rooms)
    .filter(([sid, channels]) => !channels.has(sid))
    .map(([channel]) => channel);
}

function getParticipantsInChannel(channel) {
  const clientId = wsServer.sockets.adapter.rooms.get(channel);
  return [...clientId].map((id) => wsServer.sockets.sockets.get(id).nickname);
}

let userId = 1;

wsServer.on('connection', (socket) => {
  socket['nickname'] = '익명' + userId++;
  socket.emit('init_nickname', socket.nickname);
  socket.emit('channel_list', getPublicChannels());

  socket.on('update_nickname', (nickname, done) => {
    socket.nickname = nickname;
    setTimeout(done, 500);
  });

  socket.on('enter_channel', (channel, done) => {
    socket.join(channel);
    socket.to(channel).emit('someone_joined', socket.nickname);
    wsServer.sockets.emit('channel_list', getPublicChannels());
    wsServer.sockets.to(channel).emit('participants', getParticipantsInChannel(channel));
    done(channel);
  });

  socket.on('leave_channel', (channel, done) => {
    socket.leave(channel);
    socket.to(channel).emit('someone_left', socket.nickname);
    wsServer.sockets.emit('channel_list', getPublicChannels());
    wsServer.sockets.to(channel).emit('participants', getParticipantsInChannel(channel));
    done();
  });
});

httpServer.listen(3000, () => console.log(`Server is running on http://localhost:3000`));
