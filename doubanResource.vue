<template>
  <div id="doubanResource">
    <!-- <Card> -->
    <div>
      <h1>DoubanMovie Top 10</h1>
    </div>
      <ul v-for="article in articles">
        <li class="collapse-wrap" v-bind:key="article.key" v-on:click="_showMovieDetail">
          {{article.title}}
        </li>
        <transition name="bounce">
          <div v-show="article.title === selectedArticle.title" class="movieMessage">
            <h3>上映</h3>
            <li>{{selectedArticle.year}}</li>
            <h3>导演</h3>
            <div v-for="director in selectedArticle.directors">
              <li>{{director.name}}</li>
              <!-- <img v-bind:src="director.avatars.small" v-bind:alt="director.alt"> -->
            </div>
            <h3>主演</h3>
            <div v-for="cast in selectedArticle.casts">
              <li>{{cast.name}}</li>
            </div>
          </div>
        </transition>
      </ul>
    <!-- </Card> -->
  </div>
</template>

<script>
// import { Card } from 'vux';

export default {
  name: 'doubanResource',
  data: () => ({
    articles: [],
    selectedArticle: {},
  }),
  // components: {
  //   Card
  // },
  mounted() {
    let movietop10 = JSON.parse(window.localStorage.getItem('movietop10'));
    if (movietop10) {
      // console.log(movietop10);
      this.articles = movietop10;
    }
    else {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=100', {}, {
        headers: {

        },
        emulateJSON: true,
        cache: true,
      }).then((response) => {
        this.articles = response.data.subjects;
        window.localStorage.setItem('movietop10', JSON.stringify(response.data.subjects));
        // console.log(response.data.subjects);
      }, (response) => {
        console.log(response);
      });
    }
  },
  methods: {
    _showMovieDetail: function (e) {
      console.log(this.articles);
      let _selectedArticle = {};
      this.articles.forEach(function (item, index) {
        // console.log(item);
        if (item.title === e.target.innerText) {
          _selectedArticle = item;
        }
      });
      if (this.selectedArticle && this.selectedArticle === _selectedArticle) {
        this.selectedArticle = {};
        return;
      }
      this.selectedArticle = _selectedArticle;
      // console.log(this.selectedArticle);
    },
  }
};
</script>

<style>
  #doubanResource{
    /* margin: 0 40px; */
    width: 400px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #333;
    margin: 0 auto;
    font-size: 1em;
    margin-top: 10px;
  }
  #doubanResource ul{
    padding: 0;
    margin: 10px;
  }
  #doubanResource ul>li{
    list-style-type: none;
    background-color: #ddd;
    margin-top: 10px;
    cursor: default;
    padding: 5px;
  }
  #doubanResource ul>li:hover{
    background-color: #eee;
  }
  #doubanResource h1{
    color: #ccc;
  }
  .movieMessage {
    color: black;
    background-color: #666;
    text-align: left;
  }
  .movieMessage h3{
    padding: 5px 10px;
  }
  .movieMessage li{
    list-style: none;
    margin-left: 20px;
  }
  .movieMessage * {
    /* display: inline-block; */
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  /* .bounce-leave-active {
    animation: bounce-in .5s reverse;
  } */
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
