<template>
  <div class="root">
      <lobby :players="this.players"></lobby>
  </div>
</template>
<script>
import lobby from './lobby.vue'
import axios from 'axios'
export default {
  name: 'matchIntro',
  data: function () {
    return {
      match: {},
      players: []
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
    getMatch: function () {
      console.log(this.id)
      axios.post('http://localhost:5000/api/getMatch', { data: { 'id': this.id } }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then((response) => {
        this.players = response.data.players
        this.match = response.data

        this.match.stage = '- Map Selection'
        this.$emit('match', this.match)
      }, function (err) {
        console.log('err', err)
      })
    }
  },
  components: {
    lobby: lobby
  },
  mounted () {
    this.getMatch()
  }
}
</script>