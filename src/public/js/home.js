nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const { value: nickname } = event.target.elements.nickname;
  nicknameForm.classList.remove('changed');
  nicknameForm.classList.add('changing');
  nicknameInput.blur();
  socket.emit('update_nickname', nickname, () => {
    nicknameForm.classList.remove('changing');
    nicknameForm.classList.add('changed');
  });
});
