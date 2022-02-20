function initPeerConnection() {
  // console.log('Init peerConnection');
  peerConnection = new RTCPeerConnection();
  peerConnection.addEventListener('icecandidate', (data) => {
    socket.emit('ice', data.candidate, currentChannel);
  });
  peerConnection.addEventListener('track', (data) => {
    peerVideo.srcObject = data.streams[0];
  });
  myMediaStream.getTracks().forEach((track) => peerConnection.addTrack(track, myMediaStream));
}

function closePeerConnection() {
  peerConnection.close();
  peerConnection = null;
  peerVideo.srcObject = null;
}

async function sendOffer() {
  // console.log('Send Offer');
  try {
    dataChannel = peerConnection.createDataChannel('chat');
    dataChannel.addEventListener('message', receiveMessage);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', offer, currentChannel);
  } catch (error) {
    console.error(error);
  }
}

async function sendAnswer(offer) {
  // console.log('Send Answer');
  try {
    peerConnection.addEventListener('datachannel', (event) => {
      dataChannel = event.channel;
      dataChannel.addEventListener('message', receiveMessage);
    });
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer, currentChannel);
  } catch (error) {
    console.error(error);
  }
}

async function sendIceCandidate(answer) {
  // console.log('Send IceCandidate');
  try {
    await peerConnection.setRemoteDescription(answer);
  } catch (error) {
    console.error(error);
  }
}

async function shareStream(icecandidate) {
  // console.log('Receive IceCandidate');
  try {
    await peerConnection.addIceCandidate(icecandidate);
  } catch (error) {
    console.error(error);
  }
}

socket.on('offer', (offer) => {
  // console.log('Receive Offer');
  sendAnswer(offer);
});

socket.on('answer', async (answer) => {
  // console.log('Receive Answer');
  await sendIceCandidate(answer);
});

socket.on('ice', async (icecandidate) => {
  await shareStream(icecandidate);
});
