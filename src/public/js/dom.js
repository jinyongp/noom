/**
 * @type {import('socket.io-client').Socket}
 */
const socket = io();

const homeScreen = document.querySelector('main.home');
const createChannelForm = homeScreen.querySelector('.create-channel-form');
const fullMessage = homeScreen.querySelector('.full');
const channelList = homeScreen.querySelector('.channel-list ul');
const nicknameForm = homeScreen.querySelector('.nickname-form');
const nicknameInput = nicknameForm.querySelector('input[name="nickname"]');
const channelActiveCount = homeScreen.querySelector('.active-count');

const channelScreen = document.querySelector('main.channel');
const channelName = channelScreen.querySelector('.channel-name');
const leaveChannelButton = channelScreen.querySelector('.leave-channel');
const peerVideo = channelScreen.querySelector('.main-video-wrapper video');
const myVideo = channelScreen.querySelector('.sub-video-wrapper video');
const micToggle = channelScreen.querySelector('.mic-toggle');
const camToggle = channelScreen.querySelector('.cam-toggle');
const cameraSelect = channelScreen.querySelector('.camera-select');

const chatBox = channelScreen.querySelector('.chat-box');
const chatList = chatBox.querySelector('.chat-list');
const chatForm = chatBox.querySelector('.chat-form');
const participants = chatBox.querySelector('.participants');

let currentNickname = '';

/**
 *
 * @param {'home' | 'channel'} screen
 */
function selectScreen(screen) {
  if (screen === 'home') {
    homeScreen.hidden = false;
    channelScreen.hidden = true;
  } else {
    homeScreen.hidden = true;
    channelScreen.hidden = false;
  }
  createChannelForm.classList.remove('full');
}

/**
 * @param {string} channel
 * @param {function} cb
 */
function enterChannel(channel, cb) {
  socket.emit('enter_channel', channel, () => {
    selectScreen('channel');
    currentChannel = channel;
    channelName.textContent = channel;
    typeof cb === 'function' && cb();
  });
}

/**
 * @param {function} cb
 */
function leaveChannel(cb) {
  socket.emit('leave_channel', currentChannel, () => {
    currentChannel = '';
    chatList.innerHTML = '';
    chatForm.querySelector('textarea').textContent = '';
    selectScreen('home');
    typeof cb === 'function' && cb();
  });
}

/**
 * @param {'me' | 'other' | 'notice'} type
 * @param {string} message
 * @param {string} nickname
 */
function addNewMessage(type, message, nickname = '') {
  const li = document.createElement('li');
  const senderName = document.createElement('span');
  const messageText = document.createElement('span');

  li.classList.add(type);
  senderName.classList.add('sender-name');
  messageText.classList.add('message');

  senderName.textContent = nickname;
  messageText.textContent = message;

  li.appendChild(senderName);
  li.appendChild(messageText);

  chatList.appendChild(li);
}

/**
 * @param {string} nickname
 */
function addNewParticipant(nickname) {
  const li = document.createElement('li');
  li.textContent = nickname;
  participants.appendChild(li);
}

/**
 * @param {string} channel
 */
function addNewChannel(channel) {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');
  const i = document.createElement('i');

  h3.textContent = channel;
  i.classList.add('fas', 'fa-sign-in-alt');
  li.appendChild(h3);
  li.appendChild(div);
  div.appendChild(i);
  li.classList.add('channel-item');
  li.dataset.name = channel;

  channelList.appendChild(li);
}
