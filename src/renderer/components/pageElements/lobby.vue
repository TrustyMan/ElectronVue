<template>
  <div class="root">
    <div class="lobby">
        <ul>
            <li>
              <p @click="copy(players[0].username)" class="click">COPY</p>
              <h2>{{ players[0].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[0].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[1].username)" class="click">COPY</p>
              <h2>{{ players[1].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[1].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[2].username)" class="click">COPY</p>
              <h2>{{ players[2].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[2].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[3].username)" class="click">COPY</p>
              <h2>{{ players[3].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[3].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[4].username)" class="click">COPY</p>
              <h2>{{ players[4].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[4].uplay_uuid + '/default_256_256.png'">
            </li>
            <li><h3>Blue Team</h3></li>
        </ul>
        <ul>
            <li>
              <p @click="copy(players[5].username)" class="click">COPY</p>
              <h2>{{ players[5].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[5].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[6].username)" class="click">COPY</p>
              <h2>{{ players[6].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[6].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[7].username)" class="click">COPY</p>
              <h2>{{ players[7].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[7].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[8].username)" class="click">COPY</p>
              <h2>{{ players[8].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[8].uplay_uuid + '/default_256_256.png'">
            </li>
            <li>
              <p @click="copy(players[8].username)" class="click">COPY</p>
              <h2>{{ players[9].username }}</h2>
              <img :src="'https://ubisoft-avatars.akamaized.net/' + players[9].uplay_uuid + '/default_256_256.png'">
            </li>
            <li><h3>Orange Team</h3></li>
        </ul>
        <h1 class="ignore">
            VS
        </h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lobby',
  data () {
    return {
      teamOneMMR: 0,
      teamTwoMMR: 0
    }
  },
  props: {
    players: {
      type: Array,
      required: true,
      default: 'Error: no players passed in'
    }
  },
  methods: {
    sanitizeString: function (str) {
      str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim, '')
      return str.trim()
    },
    copy: function (text) {
      this.sanitizeString(text)
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text)
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.warn('Copy to clipboard failed.', ex)
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    }
  },
  mounted () {
    for (let i = 0; this.players.length < 5; i++) {
      console.log('qqqq' + this.players[i])
      // this.teamOneMMR += players[i].
    }
  }
}
</script>