<template>
  <div class="matchesParent" >
    <div class="error" v-if="mypredict[selectedIndex].length==0">بازی پیش بینی شده ی قابل نمایشی یافت نمی شود</div>
    <div class="matchesScroll">

      <div :id="'match_' + m" v-for="(match,m) in mypredict[selectedIndex]"
           class="matches"
           :class="[(status == 1 ? 'winBorder':'looseBorder')]"
           :style="[m == 0 ? {marginTop :'7px'}:'']">

        <div class="backImg">

          <div class="backIcon" style="right: 28px;">
            <img v-if="match.teama && match.teama.pic" :src="match.teama.pic" class="icon"/>
            <img v-else :src="WImgUrl+'malavan70.png'"  class="icon"/>
          </div>
          <div class="line"></div>
          <div class="backIcon" style="right: 135px;">
            <img  v-if="match.teamb && match.teamb.pic"  :src="match.teamb.pic" class="icon"/>
            <img v-else :src="WImgUrl+'malavan70.png'"  class="icon"/>
          </div>

          <div class="teamsNameParent">
            <div class="teamsName">{{ match.teama.name }}</div>
            <div class="matchTime">
              <div>{{ match.factor }}X</div>
              <div v-if="match.forecasts && match.forecasts[0] && match.forecasts[0].score && match.forecasts[0].score!==0" style="margin-top: 3px"><span>امتیاز:</span> <span>{{ match.forecasts[0].score}}</span></div>
            </div>

            <div class="teamsName">{{ match.teamb.name }}</div>
          </div>

          <div v-if="match.forecasts && match.forecasts[0] && match.forecasts[0].ball_score" class="balls">
            <div class="ball" v-for="(item,index) in match.forecasts[0].ball_score">
              <img :src="WImgUrl+'ballActive.png'" >
            </div>
            <div class="ball" v-for="(item,index) in 4 - match.forecasts[0].ball_score">
              <img :src="WImgUrl+'ballDeactive.png'" >
            </div>
          </div>
          <div v-else class="balls">
            <div class="ball" v-for="(item,index) in 4">
              <img :src="WImgUrl+'ballDeactive.png'" >
            </div>
          </div>

          <div class="goal" style="right: 35px" v-if="match.goala || match.goala===0">{{ match.goala }}</div>
          <div class="goal" style="left: 35px" v-if="match.goalb || match.goalb===0">{{ match.goalb }}</div>

          <div class="status" :class="[(status == 1 ? 'winStatus':'looseStatus')]">
<!--            <img style="padding-left: 15px" :src="[(status == 1 ? win:loose)]">-->
<!--            <div>پیش بینی شما : <span v-if="match.goala"> {{ (match.goala == match.forecasts[0].goala && match.goalb == match.forecasts[0].goalb) ? 'برد' : 'باخت' }}  </span> <span v-if="!match.goala"> بدون نتیجه </span></div>-->
          </div>

          <div class="result" :class="[(status == 1 ? 'winResult':'looseResult')]">
            <span> {{match.forecasts[0].goala}} </span>  &nbsp;  <span>  -  </span>  &nbsp; <span> {{match.forecasts[0].goalb}} </span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import IScroll from "../../js/iscroll";
import {ROAST_CONFIG} from "../../js/config";
export default {
  name: "myforcasts",
  props: ['mypredict', 'selectedIndex'],
  data() {
    return {
      balls: [1, 1, 0, 0],
      status:1,
      win: require('../../assets/images/forecast/check.png'),
      loose: require('../../assets/images/forecast/cancle.png'),
      myScroll: '',
      WImgUrl:ROAST_CONFIG.WImgUrl,
    }
  },

  created() {

    this.scrollInit()
  },
  methods:{
    scrollInit() {
      this.myScroll = '';
      if (this.myScroll == '') {
        setTimeout(() => {
          this.myScroll = new IScroll(".matchesParent", {
            scrollY: true,
            scrollbars: false,
            momentum: true,
            preventDefault: false,
            // scrollbars: false,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true
          });
        }, 10);

      }

    },

    down(){
      this.myScroll.moveDown(80);
    },
    up(){
      this.myScroll.moveUp(80);

      if (this.myScroll.y === 0) {
        return false
      }else {
        return true
      }
    }
  }
}
</script>

<style scoped>

.matchesParent {
  width: 350px;
  height: 840px;
  position: relative;
  top: 38px;
  left: 0px;
  overflow: hidden;
}

.matchesScroll {
  width: 350px;
  position: absolute;
  top: 0px;
  left: 0px;
}

.matches {
  box-sizing: border-box;
  width: 325px;
  height: 277px;
  background: rgba(31, 30, 35, 0.45);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 11px;
  position: relative;
  margin-right: 11px;
  margin-top: 20px;
}

.backImg {
  background: url('../../assets/images/forecast/Rectangle.png');
  width: 315px;
  height: 164px;
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 8px;
  display: flex;
  display: -webkit-flex !important;
}

.backIcon {
  background-color: #ffffff;
  border-radius: 100px;
  width: 75px;
  height: 75px;
  position: relative;
  top: 15px;


  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  display: -webkit-flex !important;
}

.icon {
  position: relative;
  width: 64px;
  height: 64px;
  /*top: 3px;*/
}
.line {
  border-left: 1px solid #ffffff;
  height: 62px;
  position: relative;
  top: 22px;
  right: 85px;
}
.teamsNameParent {
  position: absolute;
  top: 102px;
  left: 0px;
  width: 315px;
  height: 25px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  color: #FFFFFF;
  display: flex;
  display: -webkit-flex !important;
  text-align: center;
  justify-content: center;

}

.teamsName {
  width: 35%;
}

.matchTime {
  font-size: 20px;
  width: 40%;
  line-height: 20px;
}

.balls {
  position: absolute;
  top: 153px;
  left: 93px;
  width: 135px;
  height: 25px;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
}

.ball {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  border-radius: 50px;
  background-color: #FFFFFF;
  margin-left: 6px;
  width: 26px;
  height: 26px;
}

.goal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 130px;
  font-size: 22px;
  color: #FFFFFF;
}

.status {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  width: 190px;
  height: 34px;
  position: absolute;
  top: 180px;
  font-size: 14px;
  left: 80px;

}

.winStatus {
  /*color: #40BF21;*/
  color: white;
}

.looseStatus {
  color: #F82F43;
}

.winResult {
  /*background-color: #40BF21;*/
  /*background: rgb(74, 74, 75);*/
}

.looseResult {
  background-color: #F82F43;
}

.winBorder {
  /*border-color: #40BF21 !important;*/
  border-color:  #ffffff4d !important;
}

.looseBorder {
  border-color: #F82F43 !important;
}

.result {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  width: 255px;
  height: 45px;
  position: absolute;
  top: 214px;
  font-size: 22px;
  left: 30px;
  color: #FFFFFF;
  border-radius: 8px;
}
.error{
  color: red;
  z-index: 999;
  margin-top: 100px;
  padding-right: 10%;
  padding-left: 10%;
  opacity: 1;
  position: absolute;
;
}
</style>
