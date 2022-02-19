leaveChannelButton.addEventListener('click', () => {
  leaveChannel();
});

micIcon.addEventListener('click', () => {
  enabledMic ? turnOffMic() : turnOnMic();
});

camIcon.addEventListener('click', () => {
  enabledCam ? turnOffCam() : turnOnCam();
});

micSelect.addEventListener('input', async () => {
  const deviceId = micSelect.value;
  currentMicId = deviceId;
  await startUserMedia({ audio: { deviceId: { exact: deviceId } } });
  if (peerConnection) {
    const audioSender = peerConnection.getSenders().find((sender) => sender.track.kind === 'audio');
    audioSender.replaceTrack(myMediaStream.getVideoTracks()[0]);
  }
});

camSelect.addEventListener('input', async () => {
  const deviceId = camSelect.value;
  currentCamId = deviceId;
  await startUserMedia({ video: { deviceId: { exact: deviceId } } });
  if (peerConnection) {
    const videoSender = peerConnection.getSenders().find((sender) => sender.track.kind === 'video');
    videoSender.replaceTrack(myMediaStream.getVideoTracks()[0]);
  }
});
