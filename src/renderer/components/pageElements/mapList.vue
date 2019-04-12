<template>
  <div class="root">
    <ul class="mapList">
        <li v-for="map in maps" class="click lighten" @click="vote(map)">
          <p>{{ map }}</p>
          <img :src="'/src/renderer/assets/img/maps/' + map + '.jpg'">
        </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'lobby',
  data: function () {
    return {
      maps: []
    }
  },
  props: {
    id: {
      type: String,
      required: true,
      default: 'Error: no match id passed in'
    }
  },
  methods: {
    getMaps: function () {
      axios.post('http://localhost:5000/api/getMaps', { match_id: this.id }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then((response) => {
        console.log(this.id)
        this.maps = response.data
      }, function (err) {
        console.log('err', err)
      })
    },
    vote: function (map) {
      document.getElementsByClassName('app')[0].style.backgroundImage = 'linear-gradient(rgba(33, 47, 61, 0.975), rgba(33, 47, 61, 0.975)), url(/src/renderer/assets/img/maps/' + map + '.jpg)'
      document.getElementsByClassName('app')[0].style.backgroundSize = 'cover'
      console.log(map)
    }
  },
  mounted () {
    this.getMaps()
    function scroll () {
      function scrollHorizontally (e) {
        e = window.event || e
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
        document.getElementsByClassName('mapList')[0].scrollLeft -= (delta * 80) // Multiplied by 40
        e.preventDefault()
      }
      if (document.getElementsByClassName('mapList')[0].addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.getElementsByClassName('mapList')[0].addEventListener('mousewheel', scrollHorizontally, false)
        // Firefox
        document.getElementsByClassName('mapList')[0].addEventListener('DOMMouseScroll', scrollHorizontally, false)
      } else {
        // IE 6/7/8
        document.getElementsByClassName('mapList')[0].attachEvent('onmousewheel', scrollHorizontally)
      }
    }
    scroll()
  }
}
</script>