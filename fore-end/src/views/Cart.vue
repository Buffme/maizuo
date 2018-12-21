<template>
  <div class="buy-view">
    <header class="buy-header">
      <div>确认订单</div>
    </header>

    <div class="decorate"><img src="../images/cartbg.png" alt=""></div>
    <!-- 商品信息 -->
    <div class="product"
    v-for="(item, i) in films"
    :key="i">
        <div class="product-phone">
          <img :src="item.poster" alt="">
        </div>

        <div class="product-info">
          <div class="product-name">{{item.name}}({{item.filmType.name}}订座票)</div>
          <div class="film-time">{{premiereAt}} 10:30</div>
          <div class="film-cinema">{{cinemaName}}</div>
          <div class="film-seat">
            <span>1号激光厅</span>
                    4排5座
          </div>
          <div class="product-price">
            <small class="icon-yen">
              ¥
            </small>
              {{lowPrice}}
            <span class="film-tip">
              （含服务费4.00元/人）
            </span>
          </div>
        </div>
    </div>
    <!-- 总数总金额 -->
    <div class="products-price">
      <div class="price-item">
        商品数量 :
        <button type="button" @click="lessFilms">-</button>
        <input type="text" :value="filmsNum" class="products-num" @input="inputNum($event)">
        <button type="button" @click="addFilms">+</button>
      </div>

      <div class="price-red-font">
        <span class="all-price">商品总额 :</span>
        <span class="price-fmt">
          <i>￥</i>
          <span class="interge">{{(lowPrice*filmsNum).toFixed(2)}}</span>
          <span class="min-price">.</span>
          <span class="decimal"></span>
        </span>
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="submit">
      <div class="show-detail">
        <span>抵扣明细</span>
        <i>¥</i>
        <span class="promotion-price">0</span>
      </div>
      <span>实付</span>
      <div class="need-pay">
        <span>
          <small class="icon-yen">¥</small>
          {{(lowPrice*filmsNum).toFixed(2)}}
        </span>
      </div>
      <router-link class="to-pay" tag="div" to="/films" @click.native="pay">提交订单</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cart',

  data () {
    return {
      filmId: '',
      films: [],
      premiereAt: '',
      cinemaId: '',
      lowPrice: '',
      cinemaName: '',
      filmsNum: 1 // 电影票数量
    }
  },

  methods: {
    // 获取到查询串中的ID
    getId () {
      this.filmId = this.$route.params.filmId;
    },

    // 获取电影信息
    getFilm () {
      if (this.filmId) {
        axios.get('api/film/detail', {
          params: {
            filmId: this.filmId
          }
        }).then((response) => {
          let result = response.data;
          if (result.code === 0) {
            console.log(result.data.film);
            let film = result.data.film.map(function (item, index) {
              return item
            });
            this.films.push(film[0]);
            let filmdate = new Date();
            let year = filmdate.getFullYear();
            let month = filmdate.getMonth();
            let date = filmdate.getDate();
            this.premiereAt = (result.data.premiereAt = [year, month, date].join('-'));
          } else {
            alert(result.msg);
          }
        })
      }
    },

    addFilms () {
      this.filmsNum++;
    },

    reduceFilms () {
      if (this.filmsNum > 1) {
        this.filmsNum--;
      }
    },

    // 显示输入的数量
    inputNum (event) {
      this.filmsNum = event.data;
    },

  },

  created () {
    this.getId();
    this.getFilm();
  }
}
</script>

<style lang='scss'>
@import '../styles/common/px2rem.scss';

.buy-view {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .buy-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    z-index: 3000;
    background-color: #fff;

    div {
      width: 100%;
      text-align: center;
      font-size: px2rem(17);
      color: #191a1b;
      line-height: px2rem(44);
    }
  }

  .decorate {
    width: 100%;
    height: px2rem(10);
    margin-top: px2rem(30);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .product {
    margin-top: px2rem(66);
    border-top: px2rem(10) solid #f4f4f4;
    padding: px2rem(15) 0 px2rem(15) px2rem(15);
    display: flex;

    .product-phone {
      margin-right: px2rem(15);
      background-color: #f8f8f8;
      height: px2rem(117);
      width: px2rem(85);
      img {
        width: 100%;
        height: 100%;
      }
    }

    .product-info {
      height: px2rem(117);
      flex: 1;
      position: relative;
      .product-name {
        font-size: px2rem(15);
        line-height: px2rem(20);
      }
      .film-time {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: px2rem(13);
        color: #797d82;
        line-height: px2rem(20);
      }
      .film-cinema {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: px2rem(13);
        color: #797d82;
        line-height: px2rem(20);
      }
      .film-seat {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: px2rem(13);
        color: #797d82;
        line-height: px2rem(20);
      }
      .product-price {
        font-size: px2rem(15);
        color: #ff5f16;
        line-height: px2rem(20);
        position: absolute;
        bottom: 0;
        .icon-yen {
          font-size: px2rem(10);
          margin-right: px2rem(2);
        }
        .film-tip {
          font-size: px2rem(11);
          color: #bdc0c5;
        }
      }
    }
  }

  .products-price {
    display: flex;
    padding: px2rem(12) px2rem(15);
    border-bottom: px2rem(10) solid #f4f4f4;
    .price-item {
      line-height: px2rem(25);
      color: #797d82;
      text-align: left;
      font-size: px2rem(16);
      flex: 0.5;
      input {
        width: 15%;
        height: 90%;
        outline: none;
        font-size: px2rem(20);
        border: 1px solid #ccc;
        text-align: center;
      }
      button {
        width: 15%;
        height: 90%;
        font-size: px2rem(20);
        outline: none;
        border: 1px solid #ccc;
        text-align: center;
      }
    }
    .price-red-font {
      line-height: px2rem(30);
      color: #ff5f16;
      text-align: right;
      font-size: px2rem(15);
      flex: 0.5;
      .all-price {
        color: #797d82;
      }
      i {
        font-size: px2rem(11);
      }
      .min-price {
        display: none;
      }
    }
  }
  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: px2rem(50);
    z-index: 3000;
    display: flex;
    text-align: center;
    justify-content: space-between;
    background-color: #f4f4f4;
    span {
      color: #191a1b;
      font-size: px2rem(15);
    }
    .show-detail {
      i {
        color: #ff5f16;
        font-size: px2rem(11);
      }
      .promotion-price {
        color: #ff5f16;
        font-size: px2rem(15);
      }
    }
    .need-pay {
      span {
        color: #ff5f16;
      }
    }
    .to-pay {
      width: px2rem(95);
      background-color: #ff5f16;
      font-size: px2rem(15);
      color: #fff;
      text-align: center;
    }
  }
}
</style>
