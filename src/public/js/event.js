socket.on('init_nickname', (nickname) => {
  const input = nicknameForm.querySelector('input[name="nickname"]');
  input.value = nickname;
  currentNickname = nickname;
});
