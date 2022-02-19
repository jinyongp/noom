/**
 * @type {RTCPeerConnection}
 */
let peerConnection = null;

async function initPeerConnection() {
  peerConnection = new RTCPeerConnection();
  peerConnection.addEventListener('icecandidate', (data) => {
    socket.emit('ice', data.candidate, currentChannel);
  });
  peerConnection.addEventListener('track', (data) => {
    console.log(data);
    peerVideo.srcObject = data.streams[0];
  });
  myMediaStream.getTracks().forEach((track) => peerConnection.addTrack(track, myMediaStream));
}

async function sendOffer() {
  console.log('Send Offer');
  if (!peerConnection) initPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('offer', offer, currentChannel);
}

async function sendAnswer(offer) {
  console.log('Send Answer');
  if (!peerConnection) initPeerConnection();
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, currentChannel);
}

async function sendIceCandidate(answer) {
  console.log('Send IceCandidate');
  await peerConnection.setRemoteDescription(answer);
}

async function shareStream(icecandidate) {
  console.log('Receive IceCandidate');
  await peerConnection.addIceCandidate(icecandidate);
}

socket.on('offer', async (offer) => {
  console.log('Receive Offer');
  await sendAnswer(offer);
});

socket.on('answer', async (answer) => {
  console.log('Receive Answer');
  await sendIceCandidate(answer);
});

socket.on('ice', async (icecandidate) => {
  await shareStream(icecandidate);
});
