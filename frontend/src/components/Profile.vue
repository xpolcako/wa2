<template>
  <b-modal id="show_profile">
    <table class="table mt-5">
      <thead>
      <tr>
        <th scope="col">Nickname</th>
        <th scope="col">Name</th>
        <th scope="col">E-mail</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in profileList" :key="item.nickname">
        <td>{{ item.nickname }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
      </tr>
      </tbody>
    </table>
    <button>Edit profile</button>
  </b-modal>
</template>

<script>
import axios from 'axios'

window.axios = axios
export default {
  name: "Profile",

  data() {
    return {
      profileList: "",
    }
  },

  methods: {
    loadProfile() {
      window.axios.get("http://localhost:3000/profile", {withCredentials:true}).then(response => {
        this.profileList = response.data
      })
    },
  },
  beforeMount() {
    this.loadProfile()
  },
}

</script>

<style scoped>

</style>