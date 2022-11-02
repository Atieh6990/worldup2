<template>
  <div class="matchesParent" v-if="matches[selectedIndex].length>0">


    <div class="matchesScroll">
      <div :id="'match_' + m" v-for="(match,m) in matches[selectedIndex]"
           class="matches"
           :style="[m == 0 ? {marginTop :'7px'}:'']">
        <div class="backImg">
          <div class="backIcon" style="right: 28px;">
            <img src="../../assets/images/forecast/malavan70.png" class="icon"/>
          </div>
          <div class="line"></div>
          <div class="backIcon" style="right: 135px;">
            <img src="../../assets/images/forecast/malavan70.png" class="icon"/>
          </div>
          <div class="teamsNameParent">
            <div class="teamsName">{{ match.teama.name }}</div>
            <div class="matchTime">
              <div>{{ groups[selectedIndex] }}</div>
              <div v-if="match.starttime.split(' ').length">{{ match.starttime.split(" ")[1] }}</div>
            </div>
            <div class="teamsName">{{ match.teamb.name }}</div>
          </div>
          <div class="scoreParent">

            <div class="scoreBox">

              <div :id="'teamA_'+[m]" v-if="osType== 0"
                   :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==0) ?'scoreHvr':'','scoreTxt']">{{ teamA[m] }}
              </div>
              <input :id="'teamA_'+[m]" v-model="teamA[m]" v-else
                     :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==0) ?'scoreHvr':'','scoreTxt']">

            </div>


            <div class="scoreBox">

              <div :id="'teamA_'+[m]" v-if="osType== 0"
                   :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==1) ?'scoreHvr':'','scoreTxt']">{{ teamB[m] }}
              </div>
              <input :id="'teamB_'+[m]" v-model="teamB[m]" v-else
                     :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==1) ?'scoreHvr':'','scoreTxt']">

            </div>
          </div>
        </div>
        <div
            :style="[(yPos==2&&yMatch==m&&yScore==1) ? {backgroundColor :'#116DFF',color :'#FFFFFF'}:{backgroundColor :'#4A4A4B',color: 'rgba(142, 140, 140, 0.85)'}]"
            class="forecastButton">
          <img :src="[(yPos==2&&yMatch==m&&yScore==1) ? ballActive:ballDeactive]" style="padding: 10px"/>
          <div>ثبت پیش بینی</div>
        </div>
      </div>
    </div>



  </div>

</template>

<script>
import IScroll from "../../js/iscroll";
import {ROAST_CONFIG} from '../../js/config';
import api from "../../api/api";

export default {
  name: "games",
  props: ['matches', 'yPos','selectedIndex','groups'],
  data() {
    return {
      yMatch: 0,
      xScore: 0,
      yScore: 0,
      myScroll: '',
      forecastFlag: false,
      ballActive: require('../../assets/images/forecast/vectorActive.png'),
      ballDeactive: require('../../assets/images/forecast/vectorDeactive.png'),
      teamA: [],
      teamB: [],
      osType: ROAST_CONFIG.OS_TYPE,
      showSuccessPopup: true , //bad az sabte pish bini bareye 3sanie true mishe
    }
  },
  watch: {
    matches: function () {
      this.scrollInit();
    },selectedIndex: function () {
      this.scrollInit();
    }
  },

  created() {
    this.scrollInit();
  },

  methods: {
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
this.initpredicted()
    },
    initpredicted(){
      //console.log("this.matches[this.selectedIndex].length",this.matches[this.selectedIndex].length)
      if(this.matches[this.selectedIndex].length ){
        //let i = 0, len = Object.keys(arr).length;
        let i = 0, len = this.matches[this.selectedIndex].length;
        //console.log("=========",this.matches[this.selectedIndex])
        while (i < len) {
          this.teamB[i]=""
          this.teamA[i]=""
         // console.log("======2===",this.matches[this.selectedIndex][i])
          if(this.matches[this.selectedIndex][i].is_forecast && this.matches[this.selectedIndex][i].forecasts.length ){

            this.teamB[i]=this.matches[this.selectedIndex][i].forecasts[0].goalb
            this.teamA[i]=this.matches[this.selectedIndex][i].forecasts[0].goala
          }
          i++
        }
      }

    },


    left() {
      if (this.yScore == 0 && this.xScore == 0)
        this.xScore++;
    },
    right() {
      if (this.yScore == 0 && this.xScore == 1)
        this.xScore--;
    },
    down() {

      if (this.yScore == 0){

        this.yScore++;
      }

      else {
        if (this.yMatch < (this.matches[this.selectedIndex].length) - 1) {
        //  console.log("this.yScore == 0 else")
          this.yMatch++;
          this.yScore--;
          this.xScore = 0;
          this.myScroll.scrollToElement('#match_' + this.yMatch, 590, false, -180);
          this.myScroll.refresh();
        }
      }
      if (this.yPos == 0) {
    //    console.log("this.yPos == 0")
        this.yPos++;
        this.xScore = 0;
      } else if (this.yPos == 1) { console.log("this.yPos == 0 else")

        if (this.yScore == 0)
          this.yScore++;
        else {
          if (this.yMatch < (this.matches[this.selectedIndex].length) - 1) {
            this.yMatch++;
            this.yScore--;
            this.xScore = 0;
            this.myScroll.scrollToElement('#match_' + this.yMatch, 590, false, -180);
            this.myScroll.refresh();
          }
        }

      }

    },
    up() {
      if (this.yScore == 1) {
        this.yScore--;
        return true
      } else {
        if (this.yMatch > 0) {
          this.yMatch--;
          this.myScroll.scrollToElement('#match_' + this.yMatch, 590, false, true);
          this.myScroll.refresh();
          this.xScore = 0;
          return true
        }
        return false
      }

      return false
    },

    enter() {
      if(this.yScore==1 && this.yPos==2 && this.teamA[this.yMatch] && this.teamB[this.yMatch] ){
        this.predict(this.teamA[this.yMatch],this.teamB[this.yMatch],this.matches[this.selectedIndex][this.yMatch].id)
      }
      let data = {
        teamA: this.teamA, teamB: this.teamB
      }
      return data
    },

    typeNumber(number) {
    //console.log('number', number)
      if (this.yScore == 0) {
        if (number > 9) {

          if (isNaN(parseInt(this.teamA[this.yMatch]))) {

          } else {

            if (this.xScore == 0) {

              var strTeamA = "'" + this.teamA[this.yMatch] + "'";
              var resTeamA = strTeamA.substring(1, strTeamA.length - 2);
              this.teamA[this.yMatch] = resTeamA;
              this.$set(this.teamA, this.yMatch, this.teamA[this.yMatch]);

            }

          }
          if (isNaN(parseInt(this.teamB[this.yMatch]))) {

          } else {
            if (this.xScore == 1) {
              var strTeamB = "'" + this.teamB[this.yMatch] + "'";
              var resTeamB = strTeamB.substring(1, strTeamB.length - 2);
              this.teamB[this.yMatch] = resTeamB;
              this.$set(this.teamB, this.yMatch, this.teamB[this.yMatch]);
            }
          }
        } else {
          if (this.xScore == 0)
            this.$set(this.teamA, this.yMatch, number);
          else
            this.$set(this.teamB, this.yMatch, number);
        }
      }
    },
     predict(goala,goalb,match){
      console.log("------",match)
      //predict  let Orgdata = {
      let data= {
        'goala': goala,
        'goalb': goalb,
        'match': match,
      }

console.log("data",data)
       api.predict(data).then((data) => {

         if (data.success) {
           this.$emit("dopredict");
           // console.log("data",data.data)
           // this.data =data.data
           // this.groups = Object.keys(this.matches);
           // this.matches=this.data[this.groups[this.selectedIndex]]
           // // console.log("this.groups",this.groups)
           // console.log("this.selectedIndex",this.selectedIndex)
           // console.log("this.groups[this.selectedIndex]",this.groups[this.selectedIndex])
           // console.log("this.matches",this.matches);

         } else {
           //this.matches = {};
         }

         // if (data.success)
         //   this.scrollInit();
       });
      },



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
  /*border: 1px solid red;*/
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
  top: 95px;
  left: 0px;
  width: 315px;
  height: 25px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
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
  font-size: 12px;
  width: 25%;
  line-height: 20px;
}

.scoreParent {
  position: absolute;
  top: 140px;
  left: 0px;
  width: 315px;
  height: 49px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 49px;
  display: flex;
  display: -webkit-flex !important;
  text-align: center;
  justify-content: center;
}

.scoreBox {
  width: 94px;
  height: 49px;
  background: #FFFFFF;
  border-radius: 7px;
  margin: auto;
}

.scoreTxt {
  width: 94px;
  height: 49px;
  line-height: 49px;
  border: none;
  border-radius: 7px;
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  color: rgba(60, 88, 98, 1);
}

.forecastButton {
  width: 251px;
  height: 48px;
  line-height: 48px;
  border-radius: 7px;
  position: relative;
  top: 210px;
  margin: auto;
  display: flex;
  display: -webkit-flex !important;
  justify-content: center;
  align-items: center;
  font-size: 16px;

}

.scoreHvr {
  border: 3px solid rgba(77, 205, 44, 1);
}


</style>
