<template>
  <div v-if="loggedIn === true">
    <nav>
      <div>
        <div class="navbar">
              <span class="navbar-element">
                <router-link class="primary-button" to="/surveys">Surveys</router-link>
              </span>
          <span class="navbar-element">
                <router-link class="primary-button" to="/history">History</router-link>
              </span>
          <span class="navbar-element" v-if="role === 'RESEARCHER'">
                <router-link class="primary-button" to="/add-survey">Publish</router-link>
              </span>
          <span class="navbar-element" v-else>
                <router-link class="primary-button" to="/profile">Profile</router-link>
              </span>
          <span class="navbar-element">
                <router-link class="primary-button" @click.native="logout()" to="/">Logout</router-link>
              </span>
        </div>
      </div>
    </nav>
  </div>
  <div v-else>
    <nav>
      <div>
        <div class="navbar">
          <span class="navbar-element">
            <router-link class="primary-button" to="/">Home</router-link>
          </span>
          <span class="navbar-element">
            <router-link class="primary-button" to="/login">Login</router-link>
          </span>
          <span class="navbar-element">
            <router-link class="primary-button" to="/register">Register</router-link>
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
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

.navbar {
  /*border-bottom: solid 2px #068488;*/
  font-size: 24px;
  text-decoration: none;
  color: inherit;
  padding-top: 20px;
  padding-bottom: 30px;
}

.navbar-element {
  text-decoration: none;
  color: #324B4C;
  margin: 1%;
}

.primary-button {
  text-decoration: none;
  border: solid #068488;
  border-radius: 50px;
  font-size: 25px;
  font-weight: 900;
  padding: 1rem;
  color: #068488;
  -webkit-transition: 0.5s ease-out;
  transition: 0.5s ease-out;
}

.primary-button:hover {
  color: white;
  background-color: #068488;
}

.navigation__links li {
  padding: 1rem;
}
</style>