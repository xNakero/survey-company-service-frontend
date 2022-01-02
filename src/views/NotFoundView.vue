<template>
  <div>
    <NavBar :loggedIn="isLoggedIn()" :role="getRoleFromToken()"/>
    <div>404 not found a path</div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "NotFoundView",
  components: {NavBar},
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