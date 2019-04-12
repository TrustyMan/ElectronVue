<template>
  <div class="root">
    <titleBar @call="call" v-bind:addFriend="true" v-bind:callBtn="true"  :title="$route.params.username"></titleBar>
    <video autoplay></video>
    <div class="message" v-for="message in messages">
      <img src="https://media.karousell.com/media/photos/products/2017/11/19/seling_kimi_no_nawa_mitsuha_kimono_cosplay_1511061642_f19ffadf.jpg">
      <h4>{{ message.from }}</h4>
      <p>{{ message.message }}</p>
    </div>
    <chatArea @newMessage="appendMessage"></chatArea>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import chatArea from './pageElements/chatArea.vue'
  import axios from 'axios'
  import hark from 'hark'
  export default {
    name: 'chat',
    data: function () {
      return {
        messages: []
      }
    },
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    },
    methods: {
      appendMessage: function (message) {
        this.messages.push(message)
      },
      call: function () {
        navigator.getUserMedia({video: false, audio: true, noiseSuppression: true, echoCancellation: true, channelCount: 1}, (localMediaStream) => {
          var viopIcon = document.getElementById('voip-icn-' + this.user.friends[0].uplay_uuid)
          var options = {threshold: -70}
          var speechEvents = hark(localMediaStream, options)
          var video = document.querySelector('video')
          speechEvents.on('speaking', function () {
            video.src = window.URL.createObjectURL(localMediaStream)
            viopIcon.style.border = '1px solid red'
          })
          speechEvents.on('stopped_speaking', function () {
            viopIcon.style.border = '1px solid green'
            video.src = '/src/renderer/assets/audio/silence.mp3'
          })
          video.onloadedmetadata = (e) => {
          }
        }, errorCallback)
        function errorCallback (e) {
          console.log('Error', e)
        }
        console.log(document.querySelectorAll('#chatTabs > .friendTab'))
      }
    },
    components: {
      titleBar: titleBar,
      chatArea: chatArea
    },
    mounted () {
      axios.post('http://localhost:5000/api/getMessages', { from: document.getElementById('pageTitle').textContent }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then((response) => {
        console.log(response.data)
        this.messages = response.data
      }, function (err) {
        console.log('err', err)
      })
    }
  }
</script>
