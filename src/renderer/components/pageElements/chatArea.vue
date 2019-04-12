<template>
    <div id="chatArea">
        <textarea id="messageInput" placeholder="Type message here" type="text" name="message"></textarea>
        <button v-on:click="sendMsg" class="click" type="button">Submit</button> 
    </div>
</template>
<script>
export default {
  data () {
    return {
      socket: false,
      token: false
    }
  },
  methods: {
    sendMsg: function () {
      let message = document.getElementById('messageInput').value
      let token = localStorage.getItem('token')
      let to = document.getElementById('pageTitle').textContent
      this.$socket.emit('private message', token, to, message, function (data) {
        console.log('data:' + data)
      })
    }
  },
  mounted () {
    this.$socket.on('private message', message => {
      console.log('private message recieved!: ' + message)
      this.$emit('newMessage', message)
    })
  },
  destroyed () {
    this.$socket.off('private message')
  }
}
</script>