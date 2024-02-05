import { io } from "socket.io-client";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  socket: null,
  color: "",
  message: 0,
  clientId: undefined,
};

const mutations = {
  SET_CLIENT_ID(state, clientId) {
    state.clientId = clientId;
  },

  SET_SOCKET(state, socket) {
    state.socket = socket;
  },
  SET_COLOR(state, color) {
    state.color = color;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  SOCKET_MESSAGE(state, message) {
    // Handle incoming messages
    console.log("Received message:", message);
    // Here you can commit mutations or dispatch actions based on the received message
  },
};

const actions = {
  initializeWebSocket({ commit, state }) {
    console.log("Starting connection to WebSocket Server");

    const { clientId } = state;
    const URL = `ws://localhost:3000/?clientid=${clientId}`;
    const socket = io(URL);

    commit("SET_SOCKET", socket);

    socket.on("connect", () => {
      console.log("CONNETED");
    });

    socket.on("disconnect", () => {
      console.log("DISCONNETED");
    });

    socket.on("score", ({ score }) => {
      commit("SET_COLOR", state.message > score ? "red" : "green");
      commit("SET_MESSAGE", score);
    });
  },

  setClientId({ commit }, payload) {
    commit("SET_CLIENT_ID", payload);
  },

  //   sendMessage({ state }, message) {
  //     // Send message through WebSocket
  //     if (state.socket) {
  //       state.socket.send(message);
  //     }
  //   },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
