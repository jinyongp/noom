socket.on('init_nickname', (nickname) => {
  const input = nicknameForm.querySelector('input[name="nickname"]');
  input.value = nickname;
  currentNickname = nickname;
});

socket.on('channel_list', (channels) => {
  channelList.innerHTML = '';
  channels.forEach(addNewChannel);
  channelActiveCount.textContent = channels.length;
});

socket.on('someone_joined', (nickname) => {
  addNewMessage('notice', `${nickname}님이 입장했습니다.`);
  initPeerConnection();
  setTimeout(sendOffer, 300);
});

socket.on('someone_left', (nickname) => {
  addNewMessage('notice', `${nickname}님이 퇴장했습니다.`);
  closePeerConnection();
});

socket.on('participants', (participantList) => {
  participants.innerHTML = '';
  participantList.forEach(addNewParticipant);
});

socket.on('full_channel', (channel) => {
  createChannelForm.elements.channel.value = '';
  createChannelForm.elements.channel.focus();
  fullMessage.textContent = `"${channel}"은 이미 누군가 사용 중이에요.`;
});
