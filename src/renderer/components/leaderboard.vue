<template>
  <div class="root">
    <titleBar v-bind:playBtn="true" title="Leaderboard"></titleBar>
    <div class="constrain">
      <div id="profileBox" class="ignore"></div>
      <profileBox :user="user"></profileBox>
    </div>
    <div class="constrain">
      <div class="playerResult lighten click" v-for="(user, index) in users" :key="index" v-bind:style="{ backgroundImage: 'url( https://ubisoft-avatars.akamaized.net/' + user.uplay_uuid + '/default_256_256.png )' }">
        <div class="tint"></div>
        <span>{{index + 1}}</span>
        <img :src="'https://ubisoft-avatars.akamaized.net/' + user.uplay_uuid + '/default_256_256.png'">
        <h1>
          {{user.username}}
          <span>{{user.rating['mu'].toFixed(2).replace('.','')}} MMR</span>
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import profileBox from './pageElements/profileBox.vue'
  import axios from 'axios'
  export default {
    name: 'leaderboard',
    data: function () {
      return {
        users: []
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    components: {
      titleBar: titleBar,
      profileBox: profileBox
    },
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    },
    mounted () {
      axios.post('http://localhost:5000/api/leaderboard', { data: { 'id': 1 } }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then((response) => {
        this.users = response.data
        console.log(this.users.length)
      }, function (err) {
        console.log('err', err)
      })
    }
  }
</script>
