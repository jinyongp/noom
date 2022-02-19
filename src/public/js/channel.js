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
  await startUserMedia({
    audio: { deviceId: { exact: deviceId } },
  });
});

camSelect.addEventListener('input', async () => {
  const deviceId = camSelect.value;
  currentCamId = deviceId;
  await startUserMedia({
    video: { deviceId: { exact: deviceId } },
  });
});
