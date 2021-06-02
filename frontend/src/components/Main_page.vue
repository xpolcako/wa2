<template>
  <div>
    <Profile/>
    <button v-b-modal="'show_profile'" class="btn btn-dark">My profile</button>
    <br>
    <br>
    <button type="button" class="btn btn-dark" @click="addNewRoom">
      Add New Room
    </button>

    <table class="table mt-5">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Topic</th>
        <th scope="col">Users</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in roomList" :key="item.name">
        <td @click="showRoom(item.room_id)">{{ item.name }}</td>
        <td>{{ item.topic }}</td>
        <td>{{ item.room_users }}</td>
      </tr>
      </tbody>
    </table>
  <Room_chat :id="this.id" :userID="this.userID"/>
  </div>
</template>

<script>

  import Profile from "@/components/Profile";
  import Room_chat from "@/components/Room_chat";

export default {

  name: "Main_page",

  components: {Profile,Room_chat},

  emits: ["test"],

  data() {
    return {
      roomList: "aaaa",
      id:-1
    }
  },
  props:{
    userID:Number
  },

  methods: {

    loadRooms() {
      window.axios.get("http://localhost:3000/room/list",{withCredentials:true}).then(response => {
        console.log(response)
        this.roomList = response.data
      })
    },

    addNewRoom() {
      var name = prompt("Zadej jmeno")
      if (!name) return
      var topic = prompt("Zadej Topic")
      if (!topic) return
      window.axios.post("http://localhost:3000/room/", {
        "name": name,
        "topic": topic
      },{withCredentials:true}).then(response => {
        if (response) this.loadRooms()
      })
    },

    showRoom(id) {
      this.id=id;
      this.$socket.emit('GETMESSAGES',{"id":id})
      this.$bvModal.show("chat-window")
    },
  },


  beforeMount() {
    this.loadRooms()
  },
}

</script>

<style scoped>

</style>