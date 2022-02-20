'use strict';

/**
 * @type {import('socket.io-client').Socket}
 */
const socket = io();

/**
 * @type {MediaStream}
 */
let myMediaStream = null;

/**
 * @type {RTCPeerConnection}
 */
let peerConnection = null;

/**
 * @type {RTCDataChannel}
 */
let dataChannel = null;
