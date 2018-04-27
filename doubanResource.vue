<template>
  <div id="doubanResource">
    <!-- <Card> -->
    <div>
      <h1>D o u b a n M o v i e</h1>
    </div>
      <ul>
        <li v-bind:key="article.key" v-for="article in articles" v-on:click="_showMovieDetail">
          {{article.title}}
        </li>
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
  }),
  // components: {
  //   Card
  // },
  mounted() {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=100', {}, {
      headers: {

      },
      emulateJSON: true,
    }).then((response) => {
      this.articles = response.data.subjects;
      console.log(response);
    }, (response) => {
      console.log(response);
    });
  },
  methods: {
    _showMovieDetail: (e) => {
      var _self=this;
      console.log(_self.articles);
    },
  }
};
</script>

<style>
  #doubanResource{
    /* margin: 0 40px; */
    width: 400px;
    border: 1px solid #333;
    border-radius: 10px;
    background-color: #333;
    margin: 0 auto;
    font-size: 1em;
    margin-top: 10px;
  }
  #doubanResource ul>li{
    list-style-type: none;
    background-color: #ddd;
    margin-top: 10px;
    cursor: default;
  }
  #doubanResource ul>li:hover{
    background-color: #eee;
  }
  #doubanResource h1{
    padding-left: 40px;
    color: #ccc;
  }
</style>
