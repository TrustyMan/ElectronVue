<template>
  <div class="root">
    <titleBar title="Admin panel"></titleBar>
    <table id="adminQueue">
        <tr>
            <th>Ranked queue</th>
            <th>Name</th>
            <th>SR</th>
        </tr>
        <tr v-for="player in queue">
            <td>Ranked queue</td>
            <td>Name</td>
            <td>SR</td>
        </tr>
    </table>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  export default {
    name: 'adminPanel',
    data: function () {
      return {
        queue: {}
      }
    },
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    },
    methods: {
      addPlayer: function () {
      },
      updateQueue: function () {
      }
    },
    components: {
      titleBar: titleBar
    },
    mounted () {
    }
  }
</script>
