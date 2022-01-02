<template>
  <div>{{loggedIn}}</div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    loggedIn: Boolean,
    role: String
  }
}
</script>

<style scoped>

</style>