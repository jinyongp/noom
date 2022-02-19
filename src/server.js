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

let userId = 1;

wsServer.on('connection', (socket) => {
  socket['nickname'] = '익명' + userId++;
  socket.emit('init_nickname', socket.nickname);

  socket.on('update_nickname', (nickname, done) => {
    socket.nickname = nickname;
    setTimeout(done, 500);
  });
});

httpServer.listen(3000, () => console.log(`Server is running on http://localhost:3000`));
