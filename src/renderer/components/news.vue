<template>
  <div class="root">
    <titleBar v-bind:playBtn="true" title="News"></titleBar>
    <div class="constrain">
      <div id="newsBox" class="ignore">
      </div>
      <profileBox :user="user"></profileBox>
      <div v-if="read == true" v-on:click="close" class="click" id="readOverlay"></div>
      <iframe id="reader" v-if="read == true" v-bind:src="link" frameborder="0" target="_self"></iframe>
      <div id="news">
          <div class="article click lighten" v-for="article in articles" v-on:click="readArticle(article.link)">
              <div class="articleTint"></div>
              <div class="articleImage" v-bind:style="{ backgroundImage: 'url(' + article.img + ')' }"></div>
              <h2>{{article.title}}</h2>
              <p>{{article.date}} | {{article.readtime}}</p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import titleBar from './pageElements/titleBar.vue'
  import profileBox from './pageElements/profileBox.vue'
  import newsToggle from './pageElements/newsToggle.vue'
  import matchHistory from './pageElements/matchHistory.vue'
  import request from 'request'
  import jsdom from 'jsdom'
  let { JSDOM } = jsdom

  export default {
    name: 'news',
    data: function () {
      return {
        articles: [],
        read: false,
        link: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      scrape (link) {
        request(link, (error, response, body) => {
          let dom = new JSDOM(body)
          var titles = []
          console.log(link)
          if (link === 'https://siege.gg/news') {
            titles = dom.window.document.getElementsByClassName('card-title')
          } else {
            titles = dom.window.document.getElementsByClassName('newsfilter-newslist')[0].querySelectorAll('h3 > a')
          }
          for (var i = 0; i < titles.length - 2; i++) {
            if (titles[i].textContent.length > 55) {
              titles[i].textContent = titles[i].textContent.substring(0, 55) + '...'
            }
            this.articles.push({'title': titles[i].textContent, 'date': titles[i].parentElement.parentElement.querySelector('.meta__date').textContent, 'readtime': titles[i].parentElement.parentElement.querySelector('.meta__readtime').textContent, 'img': titles[i].parentElement.parentElement.querySelector('.card-img__img').src, 'link': 'https://siege.gg' + titles[i].parentElement.href})
          }
          console.log('error:', error)
          console.log('statusCode:', response && response.statusCode)
          console.log('body:', dom)
        })
      },
      readArticle: function (link) {
        this.read = true
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        console.log(link)
        this.link = link
      },
      close: function () {
        this.read = false
        document.getElementsByTagName('body')[0].style.overflow = 'scroll'
      }
    },
    components: {
      titleBar: titleBar,
      profileBox: profileBox,
      matchHistory: matchHistory,
      newsToggle: newsToggle
    },
    props: {
      user: {
        type: Object,
        required: true,
        default: 'Error: no name passed in'
      }
    },
    mounted () {
      this.scrape('https://siege.gg/news')
    }
  }
</script>