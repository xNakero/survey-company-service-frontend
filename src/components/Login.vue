<template>
  <div class="login-registration-window">
    <form @submit.prevent>
      <h1 class="header">Logowanie</h1>
      <div class="input-box">
        <input type="text" v-model="username" placeholder="email">
      </div>
      <div class="input-box">
        <input type="password" v-model="password" placeholder="hasło">
      </div>
        <button @click="onClick()" class="login-registration-button">
          Zaloguj się
        </button>
      <div>
        <router-link to="/register" style="color: #324B4C">Nie posiadasz konta? Zarejestruj się tutaj</router-link>
      </div>
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
@import '../styles/style.css';
</style>