<template>
  <div class="login-registration-window">
    <form>
      <h1 class="header">Rejestracja</h1>
      <div class="input-box">
        <input type="text" v-model="username" placeholder="email" >
      </div>
      <div class="input-box">
        <input type="password" v-model="password" placeholder="hasło">
      </div>
      <div>
        <div class="informational-text">Wybierz jakiego typu konto chcesz stworzyć</div>
        <select v-model="role" class="select-box">
          <option>Ankietowany</option>
          <option>Ankieter</option>
        </select>
      </div>
      <button @click="onClick()" class="login-registration-button">
        Zarejestruj się
      </button>
      <div>
        <router-link to="/login" style="color: #324B4C">Posiadasz konto? Zaloguj się tutaj</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const roleMappings = new Map([
    ['Ankietowany', 'PARTICIPANT'],
    ['Ankieter', 'RESEARCHER']
])

export default {
  name: "Registration",
  props: {
    username: String,
    password: String,
    role: String
  },
  methods: {
    onClick() {
      const body = {
        username: this.username,
        password: this.password,
        role: roleMappings.get(this.role)
      };
      console.log(body)
      api.post("/register", body)
        .then( res => {
          if (res.status === 201) {
            console.log("successful")
          } else {
            console.log("error")
            console.log(res.data.errors)
          }
        })
    }
  }
}
</script>

<style scoped>
@import '../styles/style.css';
</style>