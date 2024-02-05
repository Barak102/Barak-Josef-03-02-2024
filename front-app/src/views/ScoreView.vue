<template>
  <div class="score-view">
    <div class="score-display">
      <h2>The Score is:</h2>
      <span :style="{ color: color }" class="score">{{ message }}</span>
    </div>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ScoreView",
  computed: {
    ...mapState("webSocket", ["color", "message", "clientId"]),
  },
  created() {
    this.initializeWebSocket();
    if (!this.clientId) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    ...mapActions("webSocket", ["initializeWebSocket"]),
  },
};
</script>
<style scoped>
.score-view {
}
.score-display {
  display: flex;
  justify-content: center;
  align-items: center;
}
.score {
  padding-left: 20px;
  font-size: 40px;
}
</style>
