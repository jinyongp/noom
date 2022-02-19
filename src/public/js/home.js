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

createChannelForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target.elements.channel;
  enterChannel(input.value, () => {
    input.value = '';
    initUserMedia();
  });
});

channelList.addEventListener('click', (event) => {
  const channel = event.target.closest('.channel-item');
  if (!channel || !channelList.contains(channel)) return;
  enterChannel(channel.dataset.name, () => {
    initUserMedia();
  });
});
