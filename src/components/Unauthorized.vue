<template>
  <div>
    <div>
      <h2>You have no access on this account to this feature</h2>
    </div>
    <router-link to="/login" @click.native="removeLocalToken()">
      Please log in to proper account
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
  methods: {
    removeLocalToken() {
      localStorage.clear()
    }
  }
}
</script>

<style scoped>

</style>