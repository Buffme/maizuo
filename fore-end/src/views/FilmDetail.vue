<template>
  <div class="film-content">
    <div class="film-con">
      <!-- header -->
      <div class="film-header" :class="{showFilmHeader: isShow}">
        <div class="goBack" @click="goBack">
          <img src="../images/back.jpg" alt="">
        </div>
        <div class="title">{{film.name}}</div>
      </div>
      <!-- header -->

      <!-- film-detail -->
      <div class="film-poster-wrap">
        <div class="film-poster">
          <img :src= "film.poster" alt="">
        </div>
      </div>
      <div class="film-details">
        <div class="col">
          <div class="film-name">
            <span class="name">{{film.name}}</span>
            <span class="item">{{film.filmType && film.filmType.name}}</span>
          </div>
          <div class="film-grade">
            <span class="grade">{{film.grade}}</span>
            <!-- <span class="grade-text">分</span> -->
          </div>
        </div>
        <div class="film-category grey-text">{{film.category}}</div>
        <div class="film-premiere-time grey-text">
          {{JSON.stringify(new Date(film.premiereAt * 1000)).substr(1,10)}} 上映
        </div>
        <div class="film-nation-runtime grey-text">
          {{film.nation}}  | {{film.runtime}}分钟
        </div>
        <div class="film-synopsis grey-text" :class="{hide: isHide}">
          {{film.synopsis}}
        </div>
        <div class="toggle" @click="toggleDown" :class="{ upper: !isHide }">
          <img src="../images/xiala.jpg" alt="">
        </div>
      </div>

      <div class="actors">
        <div class="actors-title-bar">
          <span>演职人员</span>
        </div>
        <div class="actors-list-bar">
          <ul class="actors-list">
            <li class="actors-item"
              v-for="(item, index) in actors"
              :key="index">
              <img class="actors-img" :src="item.avatarAddress" alt="">
              <span class="actors-msg actors-name">{{item.name}}</span>
              <span class="actors-msg actors-role">{{item.role}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="photos">
        <div class="photos-title-bar">
          <span class="photos-title-text">剧照</span>
          <span class="photos-to-all">全部(6)
            <i class="iconfont icon-you1"></i>
          </span>
        </div>
        <div class="row-scroll-wrapper photos-list">
          <ul class="row-scroll-items-nav">
            <li class="row-scroll-item photos-item-wrap">
              <img :src= "film.poster" alt="">
            </li>
            <li class="row-scroll-item photos-item-wrap">
              <img :src= "film.poster" alt="">
            </li>
            <li class="row-scroll-item photos-item-wrap">
              <img :src= "film.poster" alt="">
            </li>
            <li class="row-scroll-item photos-item-wrap">
              <img :src= "film.poster" alt="">
            </li>
            <li class="row-scroll-item photos-item-wrap">
              <img :src= "film.poster" alt="">
            </li>
            <li class="row-scroll-item photos-item-wrap">
              <img :src= "film.poster" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button class="buy-btn" type="default" @click="goCart(film.filmId)">购票</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FilmDetail',

  data () {
    return {
      isShow: false,
      film: [],
      actors: [],
      isHide: true
    }
  },

  created () {
    this.getFilmDetail();
  },

  mounted () {
    document.querySelector('.film-con').addEventListener('scroll', this.scrollToTop, true)
  },

  beforeDestroyed () {
    document.querySelector('.film-con').removeEventListener('scroll', this.scrollToTop, false)
  },

  methods: {
    /**
     * 监听滚轮事件，决定header的显示与否
     */
    scrollToTop () {
      var top = document.querySelector('.film-con').scrollTop;
      console.log(top);
      if (top > 10) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    /**
     * 获取影片详情
     */
    getFilmDetail () {
      console.log(1);
      axios.get('api/film/detail', {
        params: {
          filmId: this.$route.params.filmId
        }
      }).then((response) => {
        let result = response.data;
        if (result.code === 0) {
          this.film = result.data.film[0];
          this.actors = result.data.film[0].actors;
          console.log(this.film);
          console.log(this.actors);
        } else {
          alert(result.msg);
        }
      })
    },
    /**
     *点击下拉，显示全部影片描述
     */
    toggleDown () {
      if (this.isHide) {
        this.isHide = false
      } else {
        this.isHide = true
      }
    },
    /**
     * 跳转到购物车页面
     */
    goCart (filmId) {
      this.$router.push({
        name: 'Cart',
        params: {
          filmId: filmId
        }
      })
    },
    goBack () {
      this.$router.go(-1);
    }
  },

  beforeRouteEnter (to, from, next) {
    console.log('进入到详情');
    next();
  },

  beforeRouteUpdate (to, from, next) {
    console.log('详情页组件路由有更新的情况, 会进来');
    // 上面 watch $route 的代码可以在这里写
    this.getFilmDetail();
    next();
  },

  beforeRouteLeave (to, from, next) {
    console.log('详情页离开之前，会调用');
    next();
  }
}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';
.film-content{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(249, 249, 249);
  .film-con{
    flex: 1;
    overflow-y: auto;
    .film-header{
      position: fixed;
      background-color: hsla(0,0%,100%,0);
      transition: all .3s ease;
      width: 100%;
      height: px2rem(44);
      z-index: 1;
      color: transparent;
      border-bottom: px2rem(1) solid transparent;
      .goBack {
          height: px2rem(30);
          position: absolute;
          top: px2rem(5);
          left: px2rem(5);
          img {
            width: px2rem(30);
        }
      }
      .title {
        font-size: px2rem(17);
        line-height: px2rem(44);
        width: 100%;
        text-align: center;
      }
    }
    .showFilmHeader{
      color: #191a1b;
      background: #fff;
      border-color: #ededed;
    }
    .film-poster-wrap {
      height: px2rem(210);
      .film-poster {
        width: 100%;
        top: 0;
        overflow: hidden;
        position: relative;
        height: px2rem(210);
        img {
          width: 100%;
          /* height: 100%; */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .film-details {
      padding: px2rem(15);
      padding-top: px2rem(12);
      background-color: #fff;
      font-size:px2rem(13);
      .col {
        display: flex;
        align-items: center;
        .film-name {
          flex: 1;
          display: flex;
          align-items: center;
          .name {
            color: #191a1b;
            font-size: px2rem(18);
            height: px2rem(24);
            line-height: px2rem(24);
            margin-right: px2rem(8);
          }
          .item {
            font-size: px2rem(12);
            color: #fff;
            background-color: #d2d6dc;
            height: px2rem(14);
            line-height: px2rem(14);
            padding: 0 px2rem(2);
            border-radius: px2rem(2);
            display: inline-block;
          }
        }
        .film-grade {
          flex-shrink: 0;
          width: px2rem(100);
          text-align: right;
          color: #ffb232;
          font-size: px2rem(12);
          .grade {
            font-size: px2rem(18);
            font-style: italic;
          }
        }
      }
      .grey-text {
        // font-size: px2rem(13);
        line-height: px2rem(20);
        color: #797d82;
        margin-top: px2rem(4);
      }
      .film-synopsis {
        font-size: px2rem(13);
        margin-top: px2rem(8);
        overflow: hidden;
        height: px2rem(76);
        transition: height .5s ease;
        &.hide {
          height: px2rem(38)!important;
          overflow: hidden;
        }
      }
      .toggle {
        text-align: center;
        display: block;
        height: auto;
        width: px2rem(20);
        margin: auto;
        &.upper {
          img{
            transform: rotate(180deg);
          }
        }
      }
    }
    .actors{
      margin-top:px2rem(10);
      background-color: #fff;
      .actors-title-bar{
        width: 100%;
        padding: px2rem(15);
        span{
          display: inline-block;
          height:  px2rem(22.5);
          line-height: px2rem(22);
          font-size:px2rem(16);
          text-align: left;
          color: #191a1b;
        }
      }
      .actors-list-bar{
        height: px2rem(140);
        overflow-x: auto;
        overflow-y: hidden;
        .actors-list{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: px2rem(15)

        }
      }
    }
    .actors-item{
      display: flex;
      flex-direction: column;
      width: px2rem(85);
      min-width:px2rem(85);
      margin-right: px2rem(10)
    }
    .actors-img{
      // display: inline-block;
      width:px2rem(85);
      height:px2rem(85)
    }
    .actors-msg  {
      padding: px2rem(3) 0;
      font-size: px2rem(12);
      text-align: center;
      color: #191a1b;
      width: px2rem(85);
      height: px2rem(18);
      line-height: px2rem(18);
      display: block;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .actors-name{
      margin-top:10px;
    }
    .actors-role{
      font-size: px2rem(10);
      color: #797d82;
    }
    .photos{
      margin-top: px2rem(10);
      background-color: #fff;
      margin-bottom: px2rem(10);
      .photos-title-bar {
        height: px2rem(62);
        width: 100%;
        padding: px2rem(15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .photos-title-text {
          font-size: px2rem(16);
        }
        .photos-to-all {
          font-size: px2rem(13);
          color: #797d82;
          line-height: px2rem(22);
        }
      }
      .row-scroll-wrapper {
        overflow-x: auto;
        overflow-y: hidden;
        height: px2rem(115);
        background: rgb(255, 255, 255);
        .row-scroll-items-nav {
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
          padding-left: px2rem(15);
          .row-scroll-item {
            position: relative;
            margin-right: 10px;
            min-width: px2rem(150);
            img{
              width:100%;
              transform: translateY(-25%);
            }
          }
        }
      }
    }
  }

  .buy-btn{
    // position: fixed;
    // bottom: 0;
    // left: 0;
    flex-shrink: 0;
    height: px2rem(49);
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: px2rem(16);
    line-height:px2rem(49);
  }
}

</style>
