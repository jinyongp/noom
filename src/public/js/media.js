/**
 * @type {MediaStream}
 */
let myMediaStream = null;

async function initUserMedia() {
  try {
    myMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myVideo.srcObject = myMediaStream;
    turnOffMic();
    turnOffCam();
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
