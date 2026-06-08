<template>
  <route-page-layout>
    <template #poster>
      <div class="backImg" :style="{ background: 'url(' + wImg(backImage) + ')' }">
        <div class="profileParent">
          <img :src="wImg('mobImg.png')" class="imgPro"/>
          <div class="mobPro">{{ userMob }}</div>
        </div>
        <div class="scoresBox">
          <div class="scoreParent">
            <div class="numScore">{{ userScore }}</div>
            <div class="titleScore">مجموع امتیازات من:</div>
            <div class="verLine"></div>
            <div style="width: 20%; margin: auto;">
              <img style="width: 35px;height: 31.11px" :src="myScoreIcon" alt="">
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="scoresBody">
      <div class="ListChild" v-if="list.length > 0">
        <div class="scoreItem" v-for="(item , index) in list"
             :class="[(item.self == 1 ? 'self':'')]" :id="'scoreList_'+index">

          <div class="nameBox innerItem">
            <span class="nameTxt">{{ item.name }}</span>
          </div>

          <div class="rankBox innerItem">
            <div class="scoreTxt">{{ item.score }}</div>

            <img v-if="index == 0" :src="wImg('1.png')" style="padding-right: 10px">
            <img v-else-if="index == 1" :src="wImg('2.png')" style="padding-right: 10px">
            <img v-else-if="index == 2" :src="wImg('3.png')" style="padding-right: 10px">
            <img v-else :src="wImg('all.png')" style="padding-right: 10px">

          </div>

        </div>
      </div>
      <div class="noDataMsg" v-else-if="dataLoaded">{{ emptyDataMsg }}</div>
    </div>
  </route-page-layout>
</template>

<script>
import IScroll from '../js/iscroll';
import api from '../api/api'
import {ROAST_CONFIG} from "../js/config";
import { MY_SCORE_ICON } from '../js/menuIcons';

export default {
  name: "scores",
  data() {
    return {
      select: 0, myScroll: '',
      list: [],
      userMob: '',
      userScore: '',
      backImage: 'backScore.png',
      dataLoaded: false,
      emptyDataMsg: ROAST_CONFIG.EMPTY_DATA_MSG,
      myScoreIcon: MY_SCORE_ICON,
    }
  },
  created() {
    this.getScores()
  },
  methods: {

    getScores() {
      api.scores().then(data => {
        this.dataLoaded = true;
        if (data.success == 'true') {
          this.list = data.data || [];
          if (this.list.length > 0) {
            this.scrollInit();
          }
          for (let key in this.list) {
            if (this.list[key]['self'] == 1) {
              this.userMob = this.list[key]['name'];
              this.userScore = this.list[key]['score'];
            }
          }
        } else {
          this.list = [];
        }
      })
    },


    scrollInit() {
      let self = this;
      this.myScroll = '';
      if (this.myScroll == '' && this.list.length > 10) {
        setTimeout(() => {
          this.myScroll = new IScroll(".scoresBody", {
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
      }
    },
    down() {
      if (this.list.length > 10)
        this.myScroll.moveDown(80);
    },
    up() {
      if (this.list.length > 10)
        this.myScroll.moveUp(80);
    },
  }
}
</script>

<style scoped>
.scoresBody {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.backImg {
  width: 100%;
  height: 202px;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex !important;
  margin: 0;
  flex-direction: column;
}

.profileParent {
  width: 90%;
  height: 72px;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex !important;
  margin: auto;
  margin-top: 24px;
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

.scoresBox {
  box-sizing: border-box;
  width: 90%;
  height: 56px;
  line-height: 56px;
  background: #F9F9F9;
  border: 1px solid #FFFFFF;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 11px;
  margin: auto;
  margin-bottom: 15px;
}

.scoreParent {
  width: 100%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  display: -webkit-flex !important;
  -ms-flex-direction: column;
  flex-direction: row-reverse;
  text-align: center;
  margin: auto;
}

.numScore {
  width: 25%;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  color: #4A4A4B;
  font-size: 30px;
  line-height: 60px;
}

.titleScore {
  padding-right: 5px;
  width: 55%;
  text-align: center;
  font-size: 18px;
}

.verLine {
  width: 0px;
  height: 36px;
  border: 1px solid #8E8C8C;
  margin: auto;
}

.ListChild {
  width: 90%;
  margin: auto;
  margin-top: 10px;
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
