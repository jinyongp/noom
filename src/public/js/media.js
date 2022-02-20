async function initMedia() {
  await startUserMedia();
  await initSelectDevices();
}

/**
 * @param {string} deviceId
 */
async function startUserMedia(constraints) {
  try {
    myMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: currentMicId ? { deviceId: { exact: currentMicId } } : true,
      video: {
        ...(currentCamId && { deviceId: { exact: currentCamId } }),
        facingMode: 'user',
      },
      ...constraints,
    });
  } catch (error) {
    myMediaStream = null;
  } finally {
    myVideo.srcObject = myMediaStream;
    enabledMic ? turnOnMic() : turnOffMic();
    enabledCam ? turnOnCam() : turnOffCam();
  }
}

function closeUserMedia() {
  myMediaStream?.getTracks().forEach((track) => track.stop());
}

async function initSelectDevices() {
  if (!myMediaStream) return;
  try {
    const mics = await getDevices('audioinput');
    const cams = await getDevices('videoinput');
    const currentMicLabel = myMediaStream.getAudioTracks()[0].label;
    const currentCamLabel = myMediaStream.getVideoTracks()[0].label;
    mics.forEach(({ deviceId, label }) => addMicOption(deviceId, label, currentMicLabel));
    cams.forEach(({ deviceId, label }) => addCamOption(deviceId, label, currentCamLabel));
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {MediaDeviceInfo['kind']} kind
 * @returns
 */
async function getDevices(kind) {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === kind);
  } catch (error) {
    console.error(error);
  }
}

function turnOnMic() {
  myMediaStream?.getAudioTracks().forEach((track) => (track.enabled = true));
  turnOnMicIcon();
}

function turnOffMic() {
  myMediaStream?.getAudioTracks().forEach((track) => (track.enabled = false));
  turnOffMicIcon();
}

function turnOnCam() {
  myMediaStream?.getVideoTracks().forEach((track) => (track.enabled = true));
  turnOnCamIcon();
}

function turnOffCam() {
  myMediaStream?.getVideoTracks().forEach((track) => (track.enabled = false));
  turnOffCamIcon();
}
