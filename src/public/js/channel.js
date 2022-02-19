leaveChannelButton.addEventListener('click', () => {
  leaveChannel();
});

micIcon.addEventListener('click', () => {
  enabledMic ? turnOffMic() : turnOnMic();
});

camIcon.addEventListener('click', () => {
  enabledCam ? turnOffCam() : turnOnCam();
});
