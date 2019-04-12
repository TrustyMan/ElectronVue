<template>
  <div v-bind:class="{window: Object.keys(this.user).length === 0, app: true}">
    <appBar></appBar>
    <div class="appArea">
      <div v-if="Object.keys(this.user).length !== 0">
        <div id="searchCont" v-if="searchOverlay == true">
          <input type="text" v-on:keyup="searchUsers()" id="searchBox" v-model="userQuery" placeholder="Search by Uplay name">
          <div id="searchResults">
            <router-link v-on:click.native="searchOverlay = false" class="searchResult" v-for="elem in userResults" :to="{ name: 'chat', params: {username: elem.username } }" :key="elem._id">{{elem.username}}</router-link>
          </div>
        </div>
        <div id="searchOverlay" class="click" v-on:click="searchOverlay = false" v-if="searchOverlay == true"></div>
        <div id="sidebar">
          <div id="searchArea">
            <div style="width: 100%; height: 7.5px;"></div>
            <div id="searchBtn" class="click" v-on:click="searchOverlay = true">Find or start a chat</div>
          </div>
          <div id="nav">
            <router-link tag="li" to="/" exact>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"/><path id="homeGlyph" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg>
                Home
                <span v-if="this.user.tallies.home !== 0">{{this.user.tallies.home}}</span>
              </a>
            </router-link>
            <router-link tag="li" to="/friends">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/>
                <path id="teamsGlyph" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                Friends
                <span v-if="this.user.tallies.friends !== 0">{{this.user.tallies.friends}}</span>
              </a>
            </router-link>
            <router-link tag="li" to="/teams">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path id="friendsGlyph" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                Teams
                <span v-if="this.user.tallies.teams !== 0">{{this.user.tallies.teams}}</span>
              </a>
            </router-link>
          </div>
          <div id="statusBox">
            <img id="profileImg" :src="'https://ubisoft-avatars.akamaized.net/' + user.uplay_uuid + '/default_256_256.png'">
            <div id="statusInfo">
              <p>{{user.username}}</p>
              <img class="click" src="../renderer/assets/img/icons/settings.svg">
              <img class="click" src="../renderer/assets/img/icons/mic.svg">
              <img class="click" src="../renderer/assets/img/icons/headset.svg">
            </div>
          </div>
          <div id="chatTabs">
            <router-link active-class="friend-tab-active" :to="{ name: 'chat', params: {username: friend.username } }" class="friendTab click" v-for="friend in user.friends">
              <div :id="'voip-icn-' + friend.uplay_uuid" :style="{ backgroundImage: 'url(https://ubisoft-avatars.akamaized.net/' + friend.uplay_uuid + '/default_256_256.png)'}"></div>
              <p>{{friend.username}}</p>
              <p>In game</p>
            </router-link>
          </div>
        </div>
        <div id="pageWindow">
          <router-view :user="user"></router-view>
        </div>
      </div>
      <div v-else>
        <div class="welcome">
          <svg class="icon" version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="142.000000pt" height="142.000000pt" viewBox="0 0 142.000000 142.000000"
          preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,142.000000) scale(0.100000,-0.100000)"
          fill="#FF5500" stroke="none">
          <path d="M3 1044 c-6 -16 36 -105 79 -167 l20 -27 426 2 c381 3 427 5 430 19
          1 9 -19 54 -46 100 l-48 84 -427 3 c-389 2 -428 1 -434 -14z"/>
          <path d="M1109 930 l-74 -129 -187 -1 c-175 0 -188 -1 -198 -19 -12 -23 -14
          -380 -2 -399 6 -9 35 -12 108 -10 l99 3 3 123 c1 67 6 122 10 122 4 0 39 -51
          78 -113 50 -80 76 -112 90 -112 14 0 35 31 86 125 37 68 71 126 77 128 7 2 11
          -45 13 -135 l3 -138 103 -3 102 -3 0 346 0 345 -118 0 -118 0 -75 -130z"/>
          <path d="M361 786 c-8 -9 -11 -74 -9 -212 l3 -199 105 0 105 0 3 204 c2 157
          -1 206 -10 213 -23 14 -184 10 -197 -6z"/>
          </g>
          </svg>
          <h1 class="ignore">R6TM</h1>
          <ul class="welcomeMessage">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>
              Find a team and queue with friends
            </li>
            <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z"/></svg>            Review past matches to improve quickly
            </li>
            <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/></svg>            Compete to win cash prizes
            </li>
          </ul>
        </div>
        <div class="authbox">
          <div class="authboxInner">
              <h2>Login</h2>
              <input type="text" id="email" placeholder="Email">
              <input type="password" id="password" placeholder="Password">
              <button  v-on:click="login" class="btn btnOrange">SUBMIT</button>
              <p>Don't have an account? <a>Register</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import io from 'socket.io-client'
  import appBar from './components/pageElements/appBar.vue'
  export default {
    data: function () {
      return {
        user: {},
        searchOverlay: false,
        userQuery: '',
        userResults: [],
        notifications: []
      }
    },
    name: 'R6TM',
    methods: {
      login () {
        axios.post('http://localhost:5000/api/login', {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        }).then((response) => {
          this.user = response.data.user
          Vue.prototype.$socket = io.connect('http://localhost:5000', {query: {token: localStorage.getItem('token')}})
          Vue.set(this.user, 'tallies', { 'home': 0, 'friends': 0, 'teams': 0 })
          localStorage.setItem('token', response.data.token)
          this.tallyNotifications()

          // Socket.io listeners
          // Listen for user object updates
          this.$socket.on('refresh user', user => {
            console.log('user object updated' + JSON.stringify(user.notifications))
            this.user = user
          })

          // Listen for a queue events match
          this.$socket.on('queue', msg => {
            if (msg.status === 'found') {
              this.$router.push({name: 'match', params: {id: msg.id}})
              console.log('Match found')
            }
          })
        }, function (err) {
          console.log('err', err)
        })
      },
      tallyNotifications: function () {
        this.user.notifications.forEach(notification => {
          console.log(notification.msg)
          if (notification.type === 1) {
            this.user.tallies.friends++
          }
        })
      },
      searchUsers: function () {
        axios.post('http://localhost:5000/api/searchUsers', { input: document.getElementById('searchBox').value }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then((response) => {
          this.userResults = response.data
          console.log(response.data)
          console.log(this.userResults)
        }, function (err) {
          console.log('err', err)
        })
      }
    },
    components: {
      appBar: appBar
    }
  }
</script>
<style>
  @import './assets/css/animate.css';
  @import './assets/css/main.css';
</style>