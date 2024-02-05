<template>
  <div id="app" class="app-div">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      connection: null,
      message: "Test SOME MESSAGE",
      color: "red",
    };
  },
};
</script>

<style scoped>
.app-div {
  background-color: #d1dff4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
