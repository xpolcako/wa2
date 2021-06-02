<template>


  <div v-if="!register">

    <h3>Sign in</h3>

    <div class="form-group">
      <label for="defaultFormLoginEmailEx" class="grey-text">Your nickname</label>
      <input v-model="nickname" type="text" id="defaultFormLoginEmailEx" class="form-control"/>
    </div>

    <div class="form-group">
      <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
      <input v-model="password" type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
    </div>

    <button type="submit" class="btn btn-dark" @click="sendLoginForm">Login</button>

    <div class="text-center mt-4">
      <button class="btn btn-dark" @click="register= !register">Register</button>
    </div>
  </div>


  <form v-else>

    <p class="h4 text-center mb-4">Sign up</p>
    <label for="RegisterName" class="grey-text">Your name</label>
    <input type="email" id="RegisterName" class="form-control"/>
    <br/>
    <label for="RegisterEmail" class="grey-text">Your email</label>
    <input type="email" id="RegisterEmail" class="form-control"/>
    <br/>
    <label for="RegisterPassword" class="grey-text">Your password</label>
    <input type="password" id="RegisterPassword" class="form-control"/>
    <div class="text-center mt-4">
      <button class="btn btn-dark" type="submit">Register</button>
    </div>


    <br/>
    <button class="btn btn-dark" @click="register= !register">Back</button>

  </form>


</template>

<script>
export default {
  name: "Login",
  emits: ["loginSuccessful"],
  methods: {
    sendLoginForm() {
      window.axios.post("http://localhost:3000/login", {
        "nickname": this.nickname,
        "password": this.password
      },{withCredentials:true}).then((response) => {
        if (response.data.status) this.$emit("loginSuccessful", response.data.id)
        else alert("Bad username/password")
      })
    },
  },
  data() {
    return {
      register: false
    }
  }
}
</script>

<style scoped>


</style>