<template>
  <body>
  <NavBar :logged-in="false"/>
  <Login/>
  </body>
</template>

<script>
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";

export default {
  name: "LoginView",
  components: {NavBar, Login},
}
</script>

<style scoped>

</style>