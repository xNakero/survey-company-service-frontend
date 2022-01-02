<template>
  <div class="form-window">
    <form @submit.prevent>
      <h1 class="header">Sign in</h1>
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
      <router-link to="/register" style="color: #324B4C">Doesn't have an account? Sign up there</router-link>
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
  background-color: #FFFFFF;
}

.form-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 70%;
  align-items: center;
  border-radius: 10px;
  background-color: #00C6CF;
}

.btn {
  width: 50%;
  display: inline-block;
  background: #324B4C;
  color: #00C6CF;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-family: inherit;
}

.header {
  color: #324B4C;
  margin-top: 10%;
}
</style>