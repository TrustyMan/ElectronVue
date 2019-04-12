<template>
  <div class="root">
    <titleBar title="Match replay"></titleBar>
    <div id="replay">
      <section>
          <div></div>
          <div>
            <img :src="'https://ubisoft-avatars.akamaized.net/' + user.uplay_uuid + '/default_256_256.png'">
            <span>{{user.username}}</span>
            <span>{{user.uplay_uuid}}</span>
            <img :src="'/src/renderer/assets/img/'+'icons/more_vert.svg'">
          </div>
      </section>
      <section>
        <span>Vertical sensitivity: 11</span>
        <span>Horizontal sensitivity: 11</span>
        <span>Multiplier: .223</span>
        <span>DPI: 400</span>
        <span>CPU: RYZEN 1700X</span>
        <span>GPU: GTX 970</span>
        <span>Monitors: 2</span>
      </section>
      <section>
        <div id="blueTeam">
          <div>4</div>
          <table>
            <tr>
              <td>KingGeorge.</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Merc.-</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Jeb.-</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Fabian.G2</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Pengu.G2</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
          </table>
        </div>
        <div id="orangeTeam">
          <div>0</div>
          <table>
            <tr>
              <td>Goddess.C9</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>FoxA.C9</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Gotcha.EG</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>BC.EG</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Canadian.EG</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
            </tr>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  export default {
    name: 'matchReplay',
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    components: {
      titleBar: titleBar
    },
    mounted () {
      function scroll () {
        function scrollHorizontally (e) {
          e = window.event || e
          var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
          document.getElementById('replay').scrollLeft -= (delta * 80) // Multiplied by 40
          e.preventDefault()
        }
        if (document.getElementById('replay').addEventListener) {
          // IE9, Chrome, Safari, Opera
          document.getElementById('replay').addEventListener('mousewheel', scrollHorizontally, false)
          // Firefox
          document.getElementById('replay').addEventListener('DOMMouseScroll', scrollHorizontally, false)
        } else {
          // IE 6/7/8
          document.getElementById('replay').attachEvent('onmousewheel', scrollHorizontally)
        }
      }
      scroll()
    }
  }
</script>
