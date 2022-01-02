<template>
  <form>
    <h1>Register</h1>
    <div class="form-control">
      <input type="text" v-model="username" placeholder="" >
    </div>
    <div class="form-control">
      <input type="password" v-model="password" placeholder="">
    </div>
    <div class="form-control">
      <select v-model="role">
        <option>Participant</option>
        <option>Researcher</option>
      </select>
    </div>
    <button @click="onClick()" class="btn">
      Register
    </button>
  </form>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

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
        role: this.role.toUpperCase()
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

</style>