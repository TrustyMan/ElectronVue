<template>
  <div class="root">
    <titleBar v-bind:timer="false" :title="'Match ' + this.match.stage" :noBackground="true"></titleBar>
    <div id="toggleAudio" @click="toggleAudio"></div>
    <component :id="this.$route.params.id" :match="this.match" :is="stage" @match="updateMatch"></component>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import matchConfirmation from './pageElements/matchConfirmation.vue'
  import matchIntro from './pageElements/matchIntro.vue'
  import mapSelection from './pageElements/mapSelection.vue'
  export default {
    name: 'match',
    data: function () {
      return {
        match: { stage: '- Confirm' },
        audio: {}
      }
    },
    methods: {
      updateMatch (val) {
        this.match = val
      },
      toggleAudio () {
        if (this.audio.muted) {
          document.getElementById('toggleAudio').style.backgroundImage = 'url(\'/src/renderer/assets/img/icons/sound.svg\')'
          this.audio.muted = false
        } else {
          document.getElementById('toggleAudio').style.backgroundImage = 'url(\'/src/renderer/assets/img/icons/muted.svg\')'
          this.audio.muted = true
        }
      }
    },
    components: {
      titleBar,
      matchConfirmation,
      matchIntro,
      mapSelection
    },
    computed: {
      stage () {
        if (this.match.stage === '- Confirm') {
          this.audio = new Audio('/src/renderer/assets/audio/beep.mp3')
          this.audio.playbackRate = 1.5
          this.audio.loop = true
          this.audio.volume = 0.35
          this.audio.play()
          return matchConfirmation
        }
        if (this.match.stage === '- Team Reveals') {
          this.audio.muted = true
          this.toggleAudio()
          this.audio.pause()
          return matchIntro
        }
        if (this.match.stage === '- Map Selection') {
          this.audio = new Audio('/src/renderer/assets/audio/Blockbuster.mp3')
          this.audio.volume = 0.15
          this.audio.play()
          return mapSelection
        }
      }
    },
    beforeDestroy: function () {
      document.getElementsByClassName('app')[0].style.background = '#212f3d'
      this.audio.pause()
    }
  }
</script>