<template>
  <!-- list -->
  <div class="film-list-content">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li
        v-for="(item, index) in films"
        :key="index"
        @click="goDetail(item.filmId)">
        <div class="img">
          <img :src="item.poster" alt="">
        </div>
        <div class="info">
          <div>
            <span class="name">{{ item.name }}</span>
            <span class="type">{{ item.filmType && item.filmType.name }}</span>
          </div>
          <div>
            <span class="label">观众评分</span>
            <span class="grade">{{ item.grade }}</span>
          </div>
          <div>
            <span class="label">主演： {{ actorsList(item.actors) }}</span>
          </div>
          <div>
            <span class="label">{{ item.nation }} | {{ item.runtime }}分钟</span>
          </div>
        </div>
        <div class="buy" @click.stop="addToCart(item.filmId)">购票</div>
        <!-- <button @click.stop="reduceFilm(item)">-</button>
        <input type="text" disabled :value="findNum(item)">
        <button @click.stop="addFilm(item)">+</button> -->
      </li>
    </ul>
  </div>
  <!-- /list -->
</template>

<script>
import axios from 'axios';
import { InfiniteScroll } from 'mint-ui';

export default {
  name: 'NowPlaying',

  // InfiniteScroll 需要使用 directives 来加载
  directives: { InfiniteScroll },

  data () {
    return {
      films: [],
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      totalPage: 0 // 总页数
    }
  },

  created () {
    this.getFilms();
  },

  methods: {
    /**
     * 获取影片
     */
    getFilms () {
      this.$load.open();
      axios.get('api/film/list', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then((response) => {
        let result = response.data;
        console.log(result);

        this.totalPage = Math.ceil(result.data.total / this.pageSize);

        if (result.code === 0) {
          // 追加
          // this.films = this.films.push(...result.data.films);  √

          // for (var i = 0; i < result.data.films.length; i++) {
          //   result.data.films[i].num = 0;
          // }
          this.films = this.films.concat(result.data.films);
        } else {
          alert(result.msg);
        }
        this.$load.close();
      })
    },
    /**
     * 跳转到详情页
     * @param {String} filmId 当前影片Id
     */
    goDetail (filmId) {
      this.$router.push({
        name: 'filmDetail',
        params: {
          filmId: filmId
        }
      })
    },
    /**
     * 获取所有主演
     * @param {Array} actors 数据中的主演列表
     */
    actorsList (actorsList) {
      let arr = [];
      if (actorsList) {
        arr = actorsList.map(item => {
          return item.name
        })
      }
      return arr.join(' ');
    },
    /**
     * 跳转到详情页
     * @param {String} filmId 当前影片Id
     */
    addToCart (filmId) {
      this.$router.push({
        name: 'cart',
        params: {
          filmId: filmId
        }
      })
    },
    /**
     * 加载更多
     */
    loadMore () {
      if (this.pageNum < this.totalPage) {
        this.loading = true;
        this.pageNum++;
        this.getFilms();
      }
      this.loading = false;
    }
  }

}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

.film-list-content {
  li {
    display: flex;
    margin: 0 px2rem(15);
    padding: px2rem(15) 0;
    border-bottom: px2rem(1) solid #ededed;
  }

  .img {
    flex-shrink: 0;
    width: px2rem(66);
    height: px2rem(94);
    img {
      width: 100%;
    }
  }

  .info {
    flex: 1;
    min-width: 100px;
    padding: 0 px2rem(10);
    font-size: px2rem(14);
    &>div {
      width: 100%;
      height: px2rem(22);
      line-height: px2rem(22);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      color: #797d82;
      margin-right: px2rem(2);
    }
    .name {
      font-size: px2rem(16);
      color: #191a1b;
    }
    .type {
      font-size: px2rem(12);
      color: #fff;
      background: #d2d6dc;
      padding: 0 px2rem(2);
    }
    .grade {
      color: #ffb232;
    }
  }

  .buy {
    flex-shrink: 0;
    align-self: center;
    width: px2rem(50);
    height: px2rem(26);
    line-height: px2rem(26);
    font-size: px2rem(14);
    color: #ff5f16;
    border: px2rem(1) solid #ff5f16;
    text-align: center;
    border-radius: px2rem(4);
  }
}

</style>
