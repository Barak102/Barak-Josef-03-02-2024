<template>
  <div id="app">
    <p :style="{ color: color }" class="score">{{ message }}</p>
    <router-view />
  </div>
</template>

<script>
import { io } from "socket.io-client";
export default {
  name: "App",
  data: function () {
    return {
      connection: null,
      message: "Test SOME MESSAGE",
      color: "red",
    };
  },
  created() {
    console.log("Starting connection to WebSocket Server");

    const URL = "ws://localhost:3000/?clientid=4";
    const socket = io(URL);

    socket.on("connect", () => {
      console.log("CONNETED");
    });

    socket.on("disconnect", () => {
      console.log("DISCONNETED");
    });

    socket.on("score", ({ score }) => {
      this.color = this.message > score ? "red" : "green";
      this.message = score;
    });

    // this.connection.onmessage = (event) => {
    //   debugger;
    //   this.message = event.data;
    //   console.log("SOME MESSAGE FROM WS");
    //   console.log(event);
    // };

    // this.connection.onopen = (event) => {
    //   console.log(event);
    //   console.log("Successfully connected to the echo websocket server...");
    // };
  },
};
</script>

<style scoped>
.score {
  margin-left: 30px;
}
</style>
