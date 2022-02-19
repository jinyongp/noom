'use strict';

/**
 * @type {import('socket.io-client').Socket}
 */
const socket = io();

/**
 * @type {RTCPeerConnection}
 */
let peerConnection = null;

/**
 * @type {RTCDataChannel}
 */
let dataChannel = null;
