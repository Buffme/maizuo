<template>
  <div class="cinema-list">
    <header class="header">
      <div class="left">
        <div class="city" @click="goBack">
          <span >深圳</span>
          <img src="../images/xia.png">
        </div>
      </div>
      <div class="title">
        <div>影院</div>
      </div>
      <div class="right">
        <div class="toCinemaSearch">
          <img src="../images/search.png" alt="">
        </div>
      </div>
    </header>
    <div class="cinema-list-tag">
      <label class="cinema-list-tag-name">全城
        <img src="../images/shang.png" style="display: none">
        <img src="../images/xia.png">
      </label>
      <label class="cinema-list-tag-name">最近去过
        <img src="../images/shang.png" style="display: none">
        <img src="../images/xia.png">
      </label>
    </div>
    <div class="cinema-list-wrap">
      <ul class="cinemas-list">
        <li class="cinemas-list-item"
        v-for="(item, index) in cinemaList"
        :key="index">
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
    <div class="mint-popup" style="z-index: 2013; display: none;">
      <div class="filter-wrap">
        <ul class="district-list">
          <li data="district">
            <div class="selected">全城</div>
          </li>
          <li data="district">
            <div class="">福田区</div>
          </li>
          <li data="district">
            <div class="">南山区</div>
          </li>
          <li data="district">
            <div class="">龙华区</div>
          </li>
          <li data="district">
            <div class="">龙岗区</div>
          </li>
          <li data="district">
            <div class="">宝安区</div>
          </li>
          <li data="district">
            <div class="">罗湖区</div>
          </li>
          <li data="district">
            <div class="">盐田区</div>
          </li>
          <li data="district">
            <div class="">坪山区</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cinemas',

  data () {
    return {
      cinemaList: []
    }
  },

  methods: {
    /**
     * 获取所有影院信息
     */
    getAllCinemas () {
      axios.get('api/cinema/list').then((response) => {
        let result = response.data;
        if (result.code === 0) {
          this.cinemaList = result.data.data;
          console.log(this.cinemaList);
        } else {
          alert(result.msg);
        }
      })
    },

    goBack () {
      this.$router.push('/city');
    }
  },

  created () {
    this.getAllCinemas();
  }

}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';
.cinema-list {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    height: px2rem(44);
    border-bottom: px2rem(1) solid #ededed;
    line-height: px2rem(44);
    overflow: hidden;
    z-index: 3000;
    color: #2c3e50;
    img {
      vertical-align: middle;
    }
    .left {
      min-width: 15%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: px2rem(15);
      .city {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          font-size: px2rem(13);
          max-width: px2rem(58);
          height: px2rem(16);
          line-height: px2rem(16);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: px2rem(5);
          color: #191a1b;
        }
        img {
          width: px2rem(6);
          height: px2rem(3);
        }
      }
    }
    .title {
      text-align: center;
      font-size: px2rem(17);
      color: #191a1b;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right {
      width: 15%;
      display: flex;
      justify-content: flex-end;
      margin-right: px2rem(15);
      img {
        width: px2rem(18);
        height: px2rem(18);
      }
    }
  }
  .cinema-list-tag {
    display: flex;
    height: px2rem(49);
    border-bottom: px2rem(1) solid #ededed;
    width: 100%;
    // position: fixed;
    // top: 44px;
    // right: 0;
    text-align: center;
    background-color: #fff;
    z-index: 2000;
    .cinema-list-tag-name {
      flex: 1;
      line-height: px2rem(49);
      font-size: px2rem(14);
      color: #191a1b;
      img {
        vertical-align: middle;
        padding-left: px2rem(2);
        width: px2rem(8);
        height: px2rem(3);
      }
    }
  }
  .cinema-list-wrap {
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f4f4f4;
    li {
      // height: px2rem(45);
      background-color: #fff;
      padding: px2rem(15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: px2rem(1) solid #ededed;
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
  .mint-popup {
    width: 100%;
    position: fixed;
    background: #fff;
    top: px2rem(94);
    left: 0;
    transition: .2s ease-out;
    .filter-wrap {
      width: 100%;
      .district-list {
        width: 100%;
        padding: px2rem(10) 0 0;
        margin: 0 0 0 px2rem(10);
        display: flex;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: wrap;
        li {
          font-size: px2rem(12);
          display: inline-block;
          width: 24.5%;
          padding-bottom: px2rem(15);
          padding-right: px2rem(10);
          // height: px2rem(30);
          flex-shrink: 1;
          .selected {
            color: #ff5f16;
            border-color: #ff5f16;
          }
          div {
            position: relative;
            color: #797d82;
            border-radius: px2rem(3);
            text-align: center;
            height: px2rem(30);
            line-height: px2rem(27);
            border: 1px solid rgba(210,214,220,.5);
          }
        }
      }
    }
  }
}

</style>
