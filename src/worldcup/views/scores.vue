<template>
  <div class="parent">
    <div class="ListChild">
      <!--      (select == index ? 'over':'')-->
      <div class="scoreItem" v-for="(item , index) in list"
           :class="[(item.self == 1 ? 'self':'')]" :id="'scoreList_'+index">

        <div class="nameBox innerItem">

          <div class="nameTxt">{{ item.name }}</div>
        </div>

        <div class="rankBox innerItem">
          <div class="scoreTxt">{{ item.rank }}</div>

          <img v-if="index == 0" src="../assets/images/scores/1.png" style="padding-right: 10px">
          <img v-else-if="index == 1" src="../assets/images/scores/2.png" style="padding-right: 10px">
          <img v-else-if="index == 2" src="../assets/images/scores/3.png" style="padding-right: 10px">
          <img v-else src="../assets/images/scores/all.png" style="padding-right: 10px">

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import IScroll from '../js/iscroll';

export default {
  name: "scores",
  data() {
    return {
      select: 0, myScroll: '',
      list: [
        {id: 0, name: 'مهرداد احمدی', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 1, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 2, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 3, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 4, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 5, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 6, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 1},
        {id: 7, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 8, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
        {id: 9, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      ]
    }
  },
  created() {
    let self = this;
    setTimeout(() => {
      self.scrollInit();
    }, 600)
  },
  methods: {
    scrollInit() {
      let self = this;
      this.myScroll = '';
      if (this.myScroll == '' && this.list.length > 10) {
        setTimeout(() => {
          this.myScroll = new IScroll(".parent", {
            scrollY: true,
            momentum: true,
            preventDefault: false,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true,
            bounce: false,
          });

        }, 10);
        // this.refreshScroll();
      }
    },
    // refreshScroll() {
    //
    //   setTimeout(() => {
    //     this.myScroll.moveDown(-1 * this.myScroll.maxScrollY + 20)
    //   }, 30);
    // },
    down() {
      if (this.list.length > 10)
        this.myScroll.moveDown(80);

      // if (this.select < this.list.length - 1) {
      //   this.select++;
      //   this.myScroll.scrollToElement('#scoreList_' + this.select, 1000, false, true);
      //   return true;
      // }
      // return false;
    },
    up() {
      if (this.list.length > 10)
        this.myScroll.moveUp(80);

      // if (this.myScroll.y === 0) {
      //   return false
      // } else {
      //   return true
      // }
      // if (this.select > 0) {
      //   this.select--;
      //   this.myScroll.scrollToElement('#scoreList_' + this.select, 1000, false, true);
      //   return true;
      // }
      // return false;
    },
  }
}
</script>

<style scoped>
.parent {
  width: 350px;
  height: 950px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  right: 0px;
  /*border: 1px solid red;*/
  padding: 15px;
  /*padding-top: 30px !important;*/
}

.ListChild {
  position: absolute;
  width: 90%;
  /*padding: 17px;*/
  padding-bottom: 30px !important;
}

.scoreItem {
  position: relative;
  float: right;
  width: 315px;
  height: 77px;
  border: 2px solid #FFFFFF4D;

  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 8px;
  margin-top: 13px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0px 10px 0px 10px;
}

.innerItem {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  height: 100%;
  /*border: 1px solid red;*/
}

.nameBox {
  width: 65%;
  justify-content: flex-start;
}

.rankBox {
  width: 35%;
  justify-content: flex-end;
}

.nameTxt {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 50%;
}

.scoreTxt {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 50%;
}

.over {
  border: 3px solid #116DFF
}

.self {
  background: linear-gradient(0deg, #116DFF, #116DFF),
  linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
  border: 3px solid #FFFFFF4D
}
</style>
