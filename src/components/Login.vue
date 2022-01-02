<template>
  <div class="form-window">
    <form @submit.prevent>
      <h1>Sign in</h1>
      <div class="form-control">
        <input type="text" v-model="username" placeholder="login">
      </div>
      <div class="form-control">
        <input type="password" v-model="password" placeholder="password">
      </div>
      <div class="form-control">
        <button @click="onClick()" class="btn">
          Login
        </button>
      </div>
      <router-link to="/register" style="color: grey">Doesn't have an account? Sign up there</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

export default {
  name: "Login",
  props: {
    username: String,
    password: String
  },
  methods: {
    onClick() {
      const body = {
        username: this.username,
        password: this.password
      };
      console.log(body)
      api.post("/login", body, {})
          .then(res => {
            console.log(res.status)
            if (res.status === 200) {
              localStorage.setItem("auth-token", res.data.authorizationToken)
              console.log(res.data)
            } else {
              console.log("Error")
            }
          })
    }
  }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
  padding: 5% 5%;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 70%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border-radius: 5px;
  text-align: center;
  background-color: aqua;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 70%;
  align-items: center;
  border: 2px solid black;
  border-radius: 10px;
  /*background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);*/
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}

.form-element {
  padding: 20px 30px;
}

.btn {
  width: 50%;
  display: inline-block;
  background: lightgreen;
  color: black;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-family: inherit;
  border: 2px solid black;
}

h1 {
  color: black;
  margin-top: 10%;
}

</style>