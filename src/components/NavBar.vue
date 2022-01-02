<template>
  <div v-if="loggedIn === true">
    <nav>
      <div>
        <div class="navbar">
              <span>
                <router-link class="navbar-element" to="/surveys">Surveys</router-link>
              </span>
          <span>
                <router-link class="navbar-element" to="/history">History</router-link>
              </span>
          <span v-if="role === 'RESEARCHER'">
                <router-link class="navbar-element" to="/add-survey">Publish</router-link>
              </span>
          <span v-else>
                <router-link class="navbar-element" to="/profile">Profile</router-link>
              </span>
          <span>
                <router-link class="logout-element" @click.native="logout()" to="/">Logout</router-link>
              </span>
        </div>
      </div>
    </nav>
  </div>
  <div v-else>
    <nav>
      <div>
        <div class="navbar">
          <span>
            <router-link class="navbar-element" to="/">Home</router-link>
          </span>
          <span>
            <router-link class="navbar-element" to="/login">Login</router-link>
          </span>
          <span>
            <router-link class="logout-element" to="/register">Register</router-link>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    loggedIn: Boolean,
    role: String
  },
  methods: {
    logout() {
      localStorage.clear()
    }
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: solid 2px #068488;
  font-size: 24px;
  text-decoration: none;
  color: inherit;
  padding-top: 20px;
  padding-bottom: 30px;
}

.navbar-element {
  padding-right: 10%;
  text-decoration: none;
  color: #324B4C;
}

.logout-element {
  color: #324B4C;
  text-decoration: none;
}
</style>