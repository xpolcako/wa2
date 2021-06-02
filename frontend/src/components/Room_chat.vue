<template>
  <b-modal id="chat-window" hide-footer title="Room Name">
      <h3>Room name {{this.name}}</h3>
    <div class="grouping">
        <div v-for="message in messageList" :key="message.message_id">
          <span v-bind:class="{'right':userID===message.user_id,'left':userID!==message.user_id}">{{message.message}} FROM {{message.user_id}} </span>
        </div>
    </div>
    <span class="input">
      <input ref="message" @keyup.enter="sendMessage">
    </span>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      messageList:{}
    }
  },
name: "Room_chat",
  props:{
    id:Number,
    userID:Number
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    // eslint-disable-next-line no-unused-vars
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    SHOWMESSAGES(data) {
      this.messageList = data.messageList
    }
  },
  methods: {
    sendMessage() {
      let message = this.$refs.message.value;
      this.$socket.emit('NEWMESSAGE', {"message":message,"user":this.userID,"room":this.id})
    },
  }
}
</script>

<style scoped>

.left{
  float: left;
  clear: both;
  background: #F1F0F0;
  color: black;
  width: 45%;
  border-radius: 10px;
  padding: .5em;
  /*   margin-bottom: .5em; */
  font-size: .8em;
}
.right{
  float:right;
  clear: both;
  background: #407FFF;
  color: white;
  width: 45%;
  border-radius: 10px;
  padding: .5em;
  /*   margin-bottom: .5em; */
  font-size: .8em;
}
.grouping{
  flex:1;
}
#chat-window{
  display: flex;
}
.input{
  position:absolute;
  bottom: 0;
  left:0;
  margin:10px;
  clear: both;
}

</style>