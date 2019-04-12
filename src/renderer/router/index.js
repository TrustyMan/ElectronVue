import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: require('@/components/home').default
    },
    {
      path: '/friends',
      name: 'friends',
      component: require('@/components/friends').default
    },
    {
      path: '/teams',
      name: 'teams',
      component: require('@/components/teams').default
    },
    {
      path: '/auth/login',
      name: 'login',
      component: require('@/components/auth/login').default
    },
    {
      path: '/modes',
      name: 'modes',
      component: require('@/components/modes').default
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: require('@/components/leaderboard').default
    },
    {
      path: '/news',
      name: 'news',
      component: require('@/components/news').default
    },
    {
      path: '/queue',
      name: 'queue',
      component: require('@/components/queue').default
    },
    {
      path: '/replay',
      name: 'replay',
      component: require('@/components/replay').default
    },
    {
      path: '/admin',
      name: 'adminPanel',
      component: require('@/components/admin').default
    },
    {
      path: '/chat/:username',
      name: 'chat',
      component: require('@/components/chat').default
    },
    {
      path: '/match/:id',
      name: 'match',
      component: require('@/components/match').default
    }
  ]
})
