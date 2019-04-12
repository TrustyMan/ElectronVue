<template>
  <div class="root">
    <titleBar v-bind:playBtn="true" title="Home"></titleBar>
    <div class="constrain">
      <div id="profileBox" class="ignore">
        <div id="playerInfo">
          <img id="profileImg" :src="'https://ubisoft-avatars.akamaized.net/' + user.uplay_uuid + '/default_256_256.png'">
          <h1>{{user.username}}</h1>
          <h4>Placed #2231</h4>
        </div>
        <img :src="'/src/renderer/assets/img/icons/silver_1.png'">
        <p class="rating">{{user.rating['mu'].toFixed(2).replace('.','')}} MMR</p>
      </div>
      <profileBox :user="user"></profileBox>
      <div id="profileGrid">
        <matchHistory></matchHistory>
        <stats></stats>
      </div>
    </div>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import profileBox from './pageElements/profileBox.vue'
  import matchHistory from './pageElements/matchHistory.vue'
  import stats from './pageElements/stats.vue'

  export default {
    name: 'home',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    components: {
      titleBar: titleBar,
      profileBox: profileBox,
      matchHistory: matchHistory,
      stats: stats
    },
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    }
  }
</script>
