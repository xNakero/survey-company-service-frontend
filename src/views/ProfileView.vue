<template>
  <div>
    <NavBar :logged-in="isLoggedIn()" :role="getRoleFromToken()"/>
    <ParticipantParams :role="getRoleFromToken()" :loggedIn="isLoggedIn()"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ParticipantParams from "@/components/ParticipantParams";

export default {
  name: "ProfileView",
  components: {ParticipantParams, NavBar},
  methods: {
    getRoleFromToken() {
      if (localStorage.getItem('auth-token') !== null) {
        const claims = localStorage.getItem("auth-token").split('.')[1]
        return Buffer.from(claims, 'base64').toString()
            .split(',')[1].substr(9)
            .replace('"', "")
      } else {
        return null
      }
    },
    isLoggedIn() {
      if (localStorage.getItem('auth-token') !== null) {
        const claims = localStorage.getItem("auth-token").split('.')[1]
        return new Date(
            Buffer.from(claims, 'base64')
                .toString()
                .split(',')[3]
                .substr(6) * 1e3)
            .getTime() >= Date.now()
      }
    }
  }
}
</script>

<style scoped>

</style>