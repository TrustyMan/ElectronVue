<template>
  <div class="root">
    <titleBar title="Modes"></titleBar>
    <div id="modeWrapper">
      <mode v-bind:modeData="{name: 'Casual', description: 'Faster queue time, choose teams, rematches. No SR gains or losses.', image: 'ash_smasher.png'}"></mode>
      <mode v-bind:modeData="{name: 'Ranked', description: 'Slower queue time, Flashback enabled, and match results determine rank.',image: 'wind_bastion.png'}"></mode>
    </div>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import mode from './pageElements/mode.vue'
  export default {
    name: 'modes',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    components: {
      titleBar: titleBar,
      mode: mode
    }
  }
</script>

