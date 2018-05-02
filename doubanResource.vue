<template>
  <div id="doubanResource">
    <!-- <Card> -->
    <div v-on:click="isShow =! isShow">
      <h2>DoubanMovie Top {{topx}}
        <!-- <input style="width:50px"/>
        <button>search</button> -->
      </h2>
    </div>
    <div class="movieList" v-show="isShow">
      <ul v-for="movie in movies">
        <li class="collapse-wrap" v-bind:key="movie.key" v-on:click="_showMovieDetail">
          {{movie.title}}
        </li>
        <transition name="bounce">
          <div v-show="movie.title === selectedMovie.title" class="movieMessage">
            <h4>上映</h4>
            <li>{{selectedMovie.year}}</li>
            <h4>导演</h4>
            <div v-for="director in selectedMovie.directors">
              <li>{{director.name}}</li>
              <!-- <img v-bind:src="director.avatars.small" v-bind:alt="director.alt"> -->
            </div>
            <h4>主演</h4>
            <div v-for="cast in selectedMovie.casts">
              <li>{{cast.name}}</li>
            </div>
          </div>
        </transition>
      </ul>
    </div>
    <!-- </Card> -->
  </div>
</template>

<script>
// import { Card } from 'vux';

export default {
  name: 'doubanResource',
  data: () => ({
    topx: 10,
    movies: [],
    selectedMovie: {},
    isShow: false,
  }),
  // components: {
  //   Card
  // },
  mounted() {
    // let movietop10 = JSON.parse(window.localStorage.getItem('movietopx'));
    // if (movietop10) {
    //   // console.log(movietop10);
    //   this.movies = movietop10;
    // }
    // else {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=' + this.topx, {}, {
        headers: {

        },
        emulateJSON: true,
        cache: true,
      }).then((response) => {
        this.movies = response.data.subjects;
        // window.localStorage.setItem('movietopx', JSON.stringify(response.data.subjects));
        // console.log(response.data.subjects);
      }, (response) => {
        console.log(response);
      });
    // }
  },
  methods: {
    _showMovieDetail: function (e) {
      console.log(this.movies);
      let _selectedMovie = {};
      this.movies.forEach(function (item, index) {
        // console.log(item);
        if (item.title === e.target.innerText) {
          _selectedMovie = item;
        }
      });
      if (this.selectedMovie && this.selectedMovie === _selectedMovie) {
        this.selectedMovie = {};
        return;
      }
      this.selectedMovie = _selectedMovie;
      // console.log(this.selectedMovie);
    },
  }
};
</script>

<style>
  *{
    cursor: default;
  }
  #doubanResource{
    /* margin: 0 40px; */
    width: 400px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #333;
    margin: 0 auto;
    font-size: 1em;
    margin-top: 10px;
    user-select: none;
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
    border-radius: 2px;
  }
  #doubanResource ul>li:hover{
    background-color: #eee;
    box-shadow: 2px 2px 12px white;
  }
  #doubanResource h2{
    color: #ccc;
  }
  #doubanResource h2:hover{
    color: #eee;
  }
  .movieMessage {
    color: black;
    background-color: #666;
    text-align: left;
    box-shadow: -1px -1px 16px black inset;
    padding: 15px;
  }
  .movieMessage h4{
    padding: 5px 10px;
    margin-top: 10px;
    margin-bottom: 0px;
  }
  .movieMessage li{
    list-style: none;
    padding: 2px;
    margin-left: 20px;
    display: inline-block;
  }
  .movieMessage li:hover{
    color: #ccc;
    background-color: #333;
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
