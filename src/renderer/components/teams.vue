<template>
  <titleBar title="Teams"></titleBar>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  export default {
    name: 'teams',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    components: {
      titleBar: titleBar
    }
  }
</script>

