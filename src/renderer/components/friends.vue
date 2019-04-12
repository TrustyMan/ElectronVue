<template>
  <div class="root">
    <titleBar title="Friends"></titleBar>
    <section id="dropdowns">
      <div id="notifDrop">
        <section class="ignore" v-on:click="accordian(1)">
          Notifications
          <span>{{user.tallies.friends}}</span>
        </section>
        <section>
          <div class="click" v-for="notification in user.notifications">
              {{ notification.msg }}
          </div>
        </section>
      </div>
      <div id="blockedDrop">
        <section class="ignore" v-on:click="accordian(0)">
          Blocked
          <span>{{user.tallies.friends}}</span>
        </section>
        <section>
          <div class="click" v-for="notification in user.notifications">
              {{ notification.msg }}
          </div>
        </section>
      </div>
    </section>
    <table style="width: 100%;">
      <tr>
        <th align="left">Username</th>
        <th align="left">Status</th>
        <th align="left">Message</th>
      </tr>
      <tr v-for="request in requests">
        <td>{{ request.requester }}</td>
        <td>Maria Anders</td>
        <td>
          <a v-on:click="requestResponse(request.requester)" class="btn btnAccept">✓</a>
          <a class="btn btnDeny">✗</a>
        </td>
      </tr>
      <tr v-for="friend in user.friends" class="click">
        <td>
          <div :style="{ backgroundImage: 'url(https://ubisoft-avatars.akamaized.net/' + friend.uplay_uuid + '/default_256_256.png)'}"></div>
          {{ friend.username }}
        </td>
        <td>In game</td>
        <td>
          LOL
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import axios from 'axios'
  export default {
    name: 'friends',
    data: function () {
      return {
        requests: []
      }
    },
    methods: {
      requestResponse: function (requester) {
        var token = localStorage.getItem('token')
        this.$socket.emit('request response', requester, token, function (data) {
          console.log('data:' + data)
        })
      },
      accordian: function (drop) {
        let blockedDrop = document.getElementById('blockedDrop')
        let blockedList = blockedDrop.getElementsByTagName('section')[1]
        let notifDrop = document.getElementById('notifDrop')
        let notificationList = notifDrop.getElementsByTagName('section')[1]
        if (drop === 0) {
          if (blockedList.style.display === 'none') {
            blockedList.style.display = 'block'
            blockedDrop.style.height = 'auto'
          } else {
            blockedList.style.display = 'none'
            blockedDrop.style.height = notifDrop.clientHeight + 'px'
          }
        } else {
          if (notificationList.style.display === 'none') {
            notificationList.style.display = 'block'
            let height = notifDrop.clientHeight
            blockedDrop.style.height = height + 'px'
          } else {
            notificationList.style.display = 'none'
            blockedDrop.style.height = 'auto'
          }
        }
      }
    },
    components: {
      titleBar: titleBar
    },
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    },
    mounted () {
      axios.post('http://localhost:5000/api/getRequests', { from: document.getElementById('pageTitle').textContent }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then((response) => {
        this.requests = response.data
      }, function (err) {
        console.log('err', err)
      })
    }
  }
</script>

