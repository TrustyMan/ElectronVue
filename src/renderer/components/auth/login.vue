<template>
  <div v-bind:class="{window: Object.keys(this.user).length === 0, app: true}">
      <div class="authbox">
        <div class="authboxInner">
            <h2>Login</h2>
            <input type="text" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Password">
            <button  v-on:click="login" class="btn btnOrange">Submit</button>
            <a href="/users/register" class="btn">Register</a>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import io from 'socket.io-client'
  export default {
    data: function () {
    },
    name: 'login',
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
          this.$socket.on('refresh user', user => {
            console.log('user object updated' + JSON.stringify(user.notifications))
            this.user = user
          })
        }, function (err) {
          console.log('err', err)
        })
      }
    },
    mounted () {
    }
  }
</script>