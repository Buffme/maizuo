<template>
  <div class="cinemas-search">
    <div class="cinemas-search-input">
      <div class="input-wrap onFocus">
        <i class="search-icon iconfont icon-sousuo"></i>
        <input type="text" placeholder="输入影城名称" class="search-input" v-model="cinemaInput" @keyup="searchCinema">
        <div class="cancleBtn" @click="cancle">取消</div>
      </div>
    </div>
    <div class="cinema-search-result" style="">
      <ul class="cinema-search-result-list">
        <li class="cinemas-list-item"
        v-for="(item, index) in cinemas"
        :key="index"
        :class="{'show-list': isShow}">
          <div class="cinema-info-lf cinema-info">
            <span class="cinema-name">{{item.name}}</span>
            <span class="cinema-address">{{item.address}}</span>
          </div>
          <div class="cinema-info-rt cinema-info">
              <span class="cinema-lowPrice price-fmt">
                <i>￥</i>
                <span class="interge">{{parseInt(item.lowPrice / 100)}}</span>
                <span style="display: none;">.</span>
                <span class="decimal"></span>
                <span class="upon">起</span>
              </span>
              <span class="cinema-gpsAddress">距离未知</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Search',

  data () {
    return {
      cinemaInput: '',

      cinemas: [],

      isShow: false
    }
  },

  methods: {
    cancle () {
      this.$router.push('/cinemas')
    },
    searchCinema () {
      axios.get('api/cinema/search', {
        params: {
          name: this.cinemaInput
        }
      }).then((response) => {
        let result = response.data;
        if (result.code === 0) {
          this.isShow = true;
          this.cinemas = result.data.data;
          console.log(this.cinemas);
        } else {
          alert(result.msg);
        }
      })
    }
  }

}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

.cinemas-search {
  width: 100%;
  height: 100%;
  color: #191a1b;
  display: flex;
  flex-direction: column;
  .cinemas-search-input {
    display: flex;
    height: px2rem(49);
    width: 100%;
    padding: px2rem(9.5) px2rem(15);
    background-color: #f4f4f4;
    .onFocus {
      width: 90%;
    }
    .input-wrap {
      background: #fff;
      position: relative;
      display: inline-block;
      border-radius: px2rem(3);
      width: 90%;
      height: px2rem(30);
      .search-icon {
        position: absolute;
        left: px2rem(7);
        top: 0;
        line-height: px2rem(30);
        font-size: px2rem(21);
        color: #797d82;
      }
      .search-input {
        position: absolute;
        left: px2rem(33.5);
        top: 0;
        height: px2rem(30);
        border: 0;
        width: 90%;
      }
      .cancleBtn {
        height: 100%;
        line-height: px2rem(30);
        position: absolute;
        right: px2rem(-40);
        top: 0;
        font-size: px2rem(14);
      }
    }
  }
  .cinema-search-result {
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f4f4f4;
    li {
      // height: px2rem(45);
      background-color: #fff;
      padding: px2rem(15);
      display: none;
      justify-content: space-between;
      align-items: center;
      border-bottom: px2rem(1) solid #ededed;
      &.show-list {
        display: flex;
      }
      .cinema-info-lf {
        max-width: 82%;
        span {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: px2rem(15);
          line-height: px2rem(26);
        }
        .cinema-address {
          color: #797d82;
          font-size: px2rem(12);
        }
      }
      .cinema-info-rt{
         line-height: px2rem(26);
        .price-fmt {
          display: block;
          font-size: px2rem(15);
          color: #ff5f16;
          .decimal {
            font-size: px2rem(10);
          }
        }
        .upon {
          color: #ff5f16;
          font-size: px2rem(10);
        }
        .cinema-gpsAddress {
          display: block;
          font-size: px2rem(12);
          color: #797d82;
          margin-top: px2rem(-4);
        }
      }
    }

  }
}
</style>
