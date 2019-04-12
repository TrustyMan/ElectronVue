<template>
    <router-link class="mode" :to="{ name: 'queue', params: {name: modeData.name } }">
        <img :src="'/src/renderer/assets/img/'+modeData.image">
        <h1>{{modeData.name}}</h1>
        <p>{{modeData.description}}</p>
    </router-link>
</template>
<script>
export default {
  props: {
    modeData: {
      type: Object,
      required: true,
      default: 'Error: no mode data passed in'
    }
  }
}
</script>