<template>
  <div class="root">
      <lobby :players="this.players"></lobby>
      <mapList :id="match._id"></mapList>
  </div>
</template>
<script>
import lobby from './lobby.vue'
import mapList from './mapList.vue'
export default {
  name: 'mapSelection',
  data: function () {
    return {
      players: []
    }
  },
  props: {
    match: {
      type: Object,
      required: true,
      default: 'Error: no match object passed in'
    }
  },
  methods: {
  },
  components: {
    lobby,
    mapList
  },
  mounted () {
    this.players = this.match.players
  }
}
</script>