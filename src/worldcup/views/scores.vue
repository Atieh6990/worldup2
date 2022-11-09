<template>
  <div class="parent">
    <div class="backImg">
      <div class="profileParent">
        <img :src="WImgUrl+'profile.png'" class="imgPro"/>
        <div class="mobPro">{{ userMob }}</div>
      </div>
      <my-score :user-score="userScore"></my-score>
    </div>


    <div class="listParent">

      <div class="ListChild">
        <!--      (select == index ? 'over':'')-->
        <div class="scoreItem" v-for="(item , index) in list"
             :class="[(item.self == 1 ? 'self':'')]" :id="'scoreList_'+index">

          <div class="nameBox innerItem">
            <span class="nameTxt">{{ item.name }}</span>
          </div>

          <div class="rankBox innerItem">
            <div class="scoreTxt">{{ item.score }}</div>

            <img v-if="index == 0" :src="WImgUrl+'1.png'" style="padding-right: 10px">
            <img v-else-if="index == 1" :src="WImgUrl+'2.png'" style="padding-right: 10px">
            <img v-else-if="index == 2" :src="WImgUrl+'3.png'" style="padding-right: 10px">
            <img v-else :src="WImgUrl+'all.png'" style="padding-right: 10px">

          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import IScroll from '../js/iscroll';
import api from '../api/api'
import {ROAST_CONFIG} from "../js/config";
import myScore from '../components/score/myScore'
export default {
  name: "scores",
  components:{myScore},
  data() {
    return {
      select: 0, myScroll: '',
       list: [],
      WImgUrl: ROAST_CONFIG.WImgUrl,
      userMob: '',
      userScore: '',
      // list: [
      //   {id: 0, name: 'مهرداد احمدی', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 1, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 2, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 3, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 4, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 5, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 6, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 1},
      //   {id: 7, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 8, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 9, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 9, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 9, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      //   {id: 9, name: 'مهرداد پگاه وند', rank: 1580, rankTxt: 'نفر اول', self: 0},
      // ]
    }
  },
  created() {
    this.getScores()
    let self = this;
    setTimeout(() => {
      self.scrollInit();
    }, 600)
  },
  methods: {

    getScores() {
      api.scores().then(data => {
        // console.log(data.success, data.data)
        if (data.success == 'true') {
          this.list = data.data;
          this.scrollInit();
          for (let key in this.list) {
            if (this.list[key]['self'] == 1) {
              this.userMob = this.list[key]['name'];
              this.userScore = this.list[key]['score'];
            }
          }
        }

      })
    },


    scrollInit() {
      let self = this;
      this.myScroll = '';
      if (this.myScroll == '' && this.list.length > 8) {
        setTimeout(() => {
          this.myScroll = new IScroll(".listParent", {
            scrollY: true,
            momentum: true,
            preventDefault: false,
            scrollbars: false,
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
      if (this.list.length > 8)
        this.myScroll.moveDown(80);

      // if (this.select < this.list.length - 1) {
      //   this.select++;
      //   this.myScroll.scrollToElement('#scoreList_' + this.select, 1000, false, true);
      //   return true;
      // }
      // return false;
    },
    up() {
      if (this.list.length > 8)
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
  height: 966px;
  /*overflow: hidden;*/
  position: absolute;
  top: 100px;
  right: 0px;
  /*border: 1px solid red;*/
  /*padding: 15px;*/
  /*padding-top: 30px !important;*/
}
.listParent{
  width: 350px;
  height: 750px;
  overflow: hidden;
  position: absolute;
  top: 204px;
  right: 0px;
  /*border: 1px solid red;*/
  display: flex;
  justify-content: center;
  overflow: hidden;
  /*border: 1px solid red;*/
  display: -webkit-flex !important;;
}

.backImg {
  background: url('../assets/images/scores/backScore.png');
  width: 100%;
  height: 202px;
  position: relative;
  /*top: 60px;*/
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex !important;
  margin: auto;
  flex-direction: column;
}

.profileParent {
  width: 90%;
  height: 72px;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex !important;
  margin: auto;
  flex-direction: column;
  align-items: center;
}

.imgPro {
  width: 36px !important;
  height: 40px !important;
}

.mobPro {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  color: #FFFFFF;
  direction: ltr;
}

.ListChild {
  position: absolute;
  width: 100%;
  /*overflow: hidden;*/
  right: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-items: center;
  /*border: 1px solid red;*/
  display: -webkit-flex !important;;
  /*padding: 0px 17px 30px 17px !important;*/
}

.scoreItem {
  position: relative;
  float: right;
  width: 315px;
  height: 77px;
  border: 2px solid #FFFFFF4D;
  display: -webkit-flex !important;
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
  display: -webkit-flex !important;
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
  direction: ltr !important;
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
