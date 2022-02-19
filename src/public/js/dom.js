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
