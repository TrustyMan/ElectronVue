<template>
  <div class="root">
    <div id="liveToggle">
      <router-link class="lighten" active-class="liveToggleActive" to="/" exact>
        <span>Profile</span><p>{{user.username}}</p><div class="tabIndicator"></div>
      </router-link>
      <router-link class="lighten" active-class="liveToggleActive" to="/leaderboard">
        <span>Leaderboard</span><p>Player stats and rankings</p><div class="tabIndicator"></div>
      </router-link>
      <router-link class="lighten" active-class="liveToggleActive" v-bind:style="{ backgroundImage: 'url(/src/renderer/assets/img/icons/siegegg.jpg)' }" to="/news">
        <span>News & Updates</span><p>SiegeGG and blog updates</p><div class="tabIndicator"></div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: 'Error: no name passed in'
    }
  }
}
</script>