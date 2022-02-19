socket.on('init_nickname', (nickname) => {
  const input = nicknameForm.querySelector('input[name="nickname"]');
  input.value = nickname;
  currentNickname = nickname;
});

socket.on('channel_list', (channels) => {
  channelList.innerHTML = '';
  console.log(channels);
  channels.forEach(addNewChannel);
  channelActiveCount.textContent = channels.length;
});

socket.on('someone_joined', (nickname) => {
  addNewMessage('notice', `${nickname}님이 입장했습니다.`);
});

socket.on('someone_left', (nickname) => {
  addNewMessage('notice', `${nickname}님이 퇴장했습니다.`);
});

socket.on('participants', (participantList) => {
  participants.innerHTML = '';
  participantList.forEach(addNewParticipant);
});
