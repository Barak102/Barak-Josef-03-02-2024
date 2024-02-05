<template>
  <div class="home-view">
    <div class="form-wrapper">
      <div class="form-title">Client Registration</div>
      <div class="form-div">
        <div>Client Id</div>
        <div>
          <input type="text" @change="clientIdChanged" class="client-input" />
        </div>
        <div>
          <button @click="submit" class="submit-button">Submit</button>
        </div>
        <div class="error-alert">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { registerClient } from "./../services/auth.service";
export default {
  name: "HomeView",
  data() {
    return {
      clientId: undefined,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("webSocket", ["setClientId"]),
    async submit(event) {
      const result = await registerClient(this.clientId);
      if (result.message) {
        this.errorMessage = result.message;
      } else {
        this.setClientId(this.clientId);
        this.errorMessage = "";
        this.$router.push({ path: "/score" });
      }
    },
    clientIdChanged(event) {
      this.clientId = event.target.value;
    },
  },
};
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 50px;
  border-radius: 15px;
}
.form-wrapper {
  width: 30vw;
}
.form-div {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.client-input {
  background-color: #f4f6f9;
  height: 40px;
  width: 100%;
  border-radius: 10px;
  outline: none;
  border: 0;
  padding: 5px;
}

.submit-button {
  background-color: #6da7fd;
  color: #ffffff;
  height: 40px;
  margin-top: 5px;
  border-radius: 10px;
  border: 0;
  width: 100%;
  padding: 5px;
}

.error-alert {
  color: red;
  background-color: black;
}
</style>
