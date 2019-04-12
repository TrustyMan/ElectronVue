<template>
    <div id="titleBar"><p id="pageTitle">{{title}}</p>
      <img v-if="callBtn == true" v-on:click="call" id="callBtn" class="click" :src="'/src/renderer/assets/img/icons/call.svg'">
      <div id="addFriend" v-on:click="sendRequest" class="click" v-if="addFriend == true">+ Add Friend</div>
      <router-link v-if="playBtn == true" id="queueBtn" to="/modes">
        Play
      </router-link>
      <div id="inQueue" v-if="timer == true">
        <img src="/src/renderer/assets/img/icons/queue_icon.gif">
        <span>IN QUEUE</span>
        <span id="timer">
          00 : 00 . 000
        </span>
        <div id="inQueueBtn">LEAVE QUEUE</div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Error: no title passed in'
    },
    addFriend: {
      type: Boolean
    },
    playBtn: {
      type: Boolean
    },
    callBtn: {
      type: Boolean
    },
    timer: {
      type: Boolean
    },
    noBackground: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sendRequest: function () {
      axios.post('http://localhost:5000/api/friendRequest', {
        data: { 'requestee': document.getElementById('pageTitle').textContent }},
      {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }}
      ).then((response) => {
        console.log(document.getElementById('pageTitle').textContent)
        console.log(response)
      }, function (err) {
        console.log('err', err)
      })
    },
    updateTimer: function () {
      function Stopwatch (elem) {
        let time = 0
        let offset
        let interval

        function update () {
          if (this.isOn) {
            time += delta()
          }
          elem.textContent = timeFormatter(time)
        }

        function delta () {
          let now = Date.now()
          let timePassed = now - offset

          offset = now

          return timePassed
        }

        function timeFormatter (time) {
          time = new Date(time)

          let minutes = time.getMinutes().toString()
          let seconds = time.getSeconds().toString()
          let milliseconds = time.getMilliseconds().toString()

          if (minutes.length < 2) {
            minutes = '0' + minutes
          }

          if (seconds.length < 2) {
            seconds = '0' + seconds
          }

          while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds
          }

          return minutes + ' : ' + seconds
        }

        this.start = function () {
          interval = setInterval(update.bind(this), 10)
          offset = Date.now()
          this.isOn = true
        }

        this.stop = function () {
          clearInterval(interval)
          interval = null
          this.isOn = false
        }

        this.reset = function () {
          time = 0
          update()
        }

        this.isOn = false
      }
      let timer = document.getElementById('timer')
      console.log(timer)
      let watch = new Stopwatch(timer)
      console.log(watch)
      watch.start()
    },
    call: function () {
      console.log('call')
      this.$emit('call')
    }
  },
  mounted () {
    if (this.timer === true) {
      this.updateTimer()
    }
    console.log(this.noBackground)
    if (this.noBackground === true) {
      document.getElementById('titleBar').style.background = 'none'
    }
  }
}
</script>