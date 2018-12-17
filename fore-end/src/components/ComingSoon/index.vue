<template>
  <!-- list -->
  <div class="film-list-content">
    <ul>
      <li>
        <div class="img">
          <img src="../../images/film-1.jpg" alt="">
        </div>
        <div class="info">
          <div>
            <span class="name">海王</span>
            <span class="type">3D </span>
          </div>
          <div>
            <span class="label">观众评分</span>
            <span class="grade">7.2 </span>
          </div>
          <div>
            <span class="label">主演：</span>
          </div>
          <div>
            <span class="label">分钟</span>
          </div>
        </div>
        <div class="buy">预约</div>
      </li>
    </ul>
  </div>
  <!-- /list -->
</template>

<script>

export default {
  name: 'ComingSoon'
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
