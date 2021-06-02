<template>
  <div id="app">
    <Login v-if="isLoggedIn === false" @loginSuccessful="onLoginSuccessful"/>
    <Main_page v-else-if="isLoggedIn && !showRoom" @test="showRoom=!showRoom" :userID="userID"/>

  </div>
</template>

<script>
import Login from './components/Login.vue'
import Main_page from "@/components/Main_page";
import axios from 'axios'

window.axios = axios

export default {
  name: 'App',
  components: {
    Login, Main_page
  },

  methods: {
    suc() {
      console.log("AHoj")
    },
    onLoginSuccessful(id) {
      this.userID = id;
      this.isLoggedIn = !this.isLoggedIn
    }
  },

  data() {
    return {
      isLoggedIn: false,
      showRoom: false,
      userID: 0,
    }
  },
  beforeMount() {
    axios.post("http://localhost:3000/login/isLoggedIn", {}, {withCredentials: true}).then(response => {
      this.isLoggedIn = response.data.status;
      this.userID = response.data.user.id;
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
