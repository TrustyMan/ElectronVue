<template>
  <div class="root">
    <titleBar v-bind:timer="true" title="Queue"></titleBar>
    <div id="queueInfo" class="ignore">
        <div>
            <p>{{$route.params.name}}</p>
            <p>00:00</p>
        </div>
        <div>
            <img :src="'/src/renderer/assets/img/icons/silver_1.png'">
            <p>2123 SR</p>
        </div>
    </div>
    <div id="queueBtns">
      <div class="click">LEAVE QUEUE</div>
      <div class="click">CHOOSE ROLE</div>
    </div>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  export default {
    name: 'queue',
    components: {
      titleBar: titleBar
    },
    methods: {
      joinQueue: function () {
        var mode = 'ranked'
        var token = localStorage.getItem('token')
        this.$socket.emit('join queue', mode, token, function (data) {
          console.log('data:' + data)
        })
      }
    },
    mounted () {
      this.joinQueue()
    }
  }
</script>