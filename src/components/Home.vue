<template>
  <div v-if="routeLogin()"/>
  <div v-else/>
</template>

<script>
export default {
  name: "Home",
  methods: {
    routeLogin() {
      this.$router.push('/login')
      return true
    }
  }
}
</script>

<style scoped>

</style>