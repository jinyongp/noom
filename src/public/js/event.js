socket.on('init_nickname', (nickname) => {
  const input = nicknameForm.querySelector('input[name="nickname"]');
  input.value = nickname;
  currentNickname = nickname;
});

socket.on('someone_joined', (nickname, participantList) => {
  participants.innerHTML = '';
  participantList.forEach(addNewParticipant);
  addNewMessage('notice', `${nickname}님이 입장했습니다.`);
});
