<template>
  <div class="city-list">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="iconfont icon-guanbi1"></i>
      </div>
      <div class="title">当前城市 - </div>
    </div>

    <div class="search-city-input">
      <div class="input-wrap" :class="{'showCancle': isCancle}">
        <i class="iconfont icon-sousuo search-icon"></i>
        <input class="search-input" type="text" placeholder="输入城市名称或拼音" style="font-size: 0.4547rem; color: #797d82;" v-model="cityInput" @input="searchCity" @focus="showCancleBtn"/>
        <span class="cancleBtn" :class="{'cancle': isCancle}" @click="recover">取消</span>
      </div>
    </div>

    <div class="cityInfo" :class="{'hide': !getNoResult}">
      <div class="mainCity">
        <div class="recommed-city">
          <div class="gprsCity">
            <p>GPS定位你所在城市</p>
            <div>定位失败</div>
          </div>

          <div class="hostCity">
            <p>热门城市</p>
            <ul>
              <li
              v-for="(item, index) in hotCities"
              :key="index"
              @click="chooseCity(item)">{{item}}</li>
              <!-- <li>上海</li>
              <li>广州</li>
              <li>深圳</li> -->
            </ul>
          </div>
          <ul class="moreCityInfo">
            <li class="moreInfoLi"
            v-for="(item, index) in cityList"
            :key="index">
              <p>{{item.pinyin}}</p>
              <ul>
                <li
                v-for="(val, i) in item.list"
                :key="i">{{val.name}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <ul>
        <li>&nbsp;&nbsp;&nbsp;</li>
      </ul>

      <ul class="searchInfo">
        <li
        v-for="(item, index) in firstLetter"
        :key="index">{{item}}</li>
      </ul>
    </div>

    <div class="city-search-result" :class="{'no-result': getNoResult}">
      <div class="empty-result" style="">
        <img src="../images/noresult.png" alt="">
        <p>没有找到匹配的城市</p>
      </div>
    </div>

    <div class="city-search-result" :class="{'get-result': getResult}">
      <div class="city-search-result-list">
        <ul>
          <li
          v-for="(item, index) in citySearched"
          :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'City',

  data () {
    return {
      // 热门城市
      hotCities: [],
      // 顺序排列的所有城市
      cityList: [],
      // // 首字母
      firstLetter: [],

      cityInput: '',

      isCancle: false,

      getNoResult: false,

      getResult: false,

      citySearched: []
    }
  },

  methods: {
    /**
     * 获取所有城市
     */
    getAllCities () {
      axios.get('api/city/list').then((response) => {
        let result = response.data;
        if (result.code === 0) {
          // console.log(result.data.data);
          let i = 0;
          let hash = {};
          let res = [];
          let letter = [];
          let hots = [];
          result.data.data.forEach(item => {
            let pinyin = item.pinyin.substring(0, 1).toUpperCase();
            if (hash[pinyin]) {
              res[hash[pinyin] - 1].list.push(item);
            } else {
              letter.push(pinyin);
              hash[pinyin] = ++i;
              res.push({
                pinyin: pinyin,
                list: [item]
              })
            }
            let isHot = item.isHot;
            if (isHot === 1) {
              hots.push(item.name);
            }
          });
          // console.log(res);
          // 顺序排列
          this.cityList = res.sort(function (a, b) {
            return (a.pinyin).localeCompare((b.pinyin))
          });
          this.firstLetter = letter.sort();
          // console.log(this.cityList);
          // console.log(this.firstLetter);
          // console.log(hots);
          this.hotCities = hots;
        } else {
          alert(result.msg);
        }
      })
    },
    /**
     * input框获取焦点时，显示取消按钮
     */
    showCancleBtn () {
      this.isCancle = true;
    },
    /**
     * 点击取消按钮，回复原来展示的数据
     */
    recover () {
      this.isCancle = false;
      this.getNoResult = false;
      this.getResult = false;
    },
    /**
     * input框输入时，向后台请求数据，并渲染到页面
     */
    searchCity () {
      if (this.cityInput === '') {
        this.getResult = false;
        this.getNoResult = true;
      } else {
        axios.get('api/city/search', {
          params: {
            name: this.cityInput
          }
        }).then((response) => {
          let result = response.data;
          if (result.code === -1) {
            this.getResult = false;
            this.getNoResult = true;
            // alert(result.msg);
          } else if (result.code === 0) {
            this.getNoResult = false;
            this.getResult = true;
            // 搜索结果赋值
            this.citySearched = result.data.data;
          } else {
            alert(result.msg);
          }
        })
      }
    },

    chooseCity (city) {
      console.log(city);
      this.$store.commit({
        type: 'getSelectedCity',
        city: city
      })
      this.$router.go(-1);
    },

    goBack () {
      this.$router.go(-1);
    }
  },

  created () {
    this.getAllCities();
  }

}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

.city-list {
  display: flex;
  flex-direction: column;
  height: 100%;
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
    // background-color: #fff;
    .left {
      min-width: 12%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: px2rem(10);
      i {
        color: #191a1b;
        font-size: px2rem(19);
      }
    }
    .title {
      width: 72%;
      text-align: center;
      font-size: px2rem(17);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #191a1b;
    }
  }
  .search-city-input {
    z-index: 2000;
    height: px2rem(49);
    width: 100%;
    padding: px2rem(9.5) px2rem(15);
    background-color: #f4f4f4;
    // position: fixed;
    // top: px2rem(44);
    .input-wrap {
      background-color: #fff;
      position: relative;
      display: inline-block;
      border-radius: px2rem(3);
      width: 100%;
      height: px2rem(30);
      &.showCancle {
        width: 85%;
      }
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
        display: none;
        width: px2rem(60);
        height: 100%;
        line-height: px2rem(30);
        position: absolute;
        right: px2rem(-64);
        top: 0;
        text-align: center;
        font-size: px2rem(14);
        &.cancle {
          display: block;
        }
      }
    }
  }
  .cityInfo {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: flex;
    padding-top: px2rem(20);
    .hide {
      display: none;
    }
    .mainCity {
      width: 100%;
      // height: 100%;
      .recommed-city {
        width: 100%;
        .gprsCity {
          width: 100%;
          height: 100%;
          p {
            color: #797d82;
            font-size: px2rem(13);
            text-indent: px2rem(15);
          }
          div {
            height: px2rem(30);
            width: 30%;
            background-color: #f4f4f4;
            line-height: px2rem(30);
            border-radius: px2rem(3);
            margin: px2rem(15) px2rem(25);
            font-size: px2rem(15);
            color: #191a1b;
            text-align: center;
          }
        }
        .hostCity {
          width: 100%;
          height: 100%;
          color: #797d82;
          font-size: px2rem(13);
          padding-bottom: px2rem(10);
          p {
            text-indent: px2rem(15);
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            margin-left: px2rem(20);

            li {
              height: px2rem(30);
              width: 30%;
              background-color: #f4f4f4;
              line-height: px2rem(30);
              border-radius: px2rem(3);
              margin: px2rem(8) px2rem(5);
              font-size: px2rem(15);
              color: #191a1b;
              text-align: center;
            }
          }
        }
        .moreCityInfo {
          .moreInfoLi {
            p {
              background-color: #f4f4f4;
              color: #797d82;
              padding: 0 0 0 px2rem(15);
              height: px2rem(30);
              line-height: px2rem(30);
              font-size: px2rem(13);
            }
            ul {
              display: flex;
              flex-wrap: wrap;
              padding: 0 0 0 px2rem(15);
              li {
                font-size: px2rem(15);
                width: 33%;
                color: #191a1b;
                line-height: px2rem(48);
                height: px2rem(48);
                text-align: center;
                border-bottom: 1px solid #ededed;
                overflow: hidden;
              }
            }
          }
        }
      }
    }

    .searchInfo {
      //   padding-top: px2rem(90);
      position: fixed;
      top: px2rem(205);
      right: 0;
      li {
        font-size: px2rem(11);
        padding: 0 px2rem(3);
        color: #191a1b;
        margin-top: px2rem(5);
      }
    }
  }
  .city-search-result {
    z-index: 1999;
    position: fixed;
    top: px2rem(94);
    left: 0;
    background-color: #fff;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    &.no-result {
      display: block;
    }
    &.get-result {
      display: block;
    }
  }
}
.city-search-result {
  display:none;
  .empty-result {
    position: absolute;
    top: 107px;
    width: 100%;
    text-align: center;
    img {
      width: px2rem(90);
      margin: auto;
    }
    p {
      color: #bdc0c5;
      font-size: px2rem(14);
      margin: 0;
    }
  }
  ul {
    padding-left: px2rem(15);
    li {
      height: px2rem(44);
      position: relative;
      line-height: px2rem(44);
      color: #191a1b;
      font-size: px2rem(14);
      border-bottom: 1px solid #ededed;
    }
  }
}
</style>
