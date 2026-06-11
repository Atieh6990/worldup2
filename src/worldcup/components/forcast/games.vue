<template>
  <div class="gamesRoot">
  <div class="matchesParent" ref="scrollWrap" v-if="hasMatches">


    <div class="matchesScroll routeScrollEnd">
      <div :id="'match_' + m" v-for="(match,m) in matches[selectedIndex]"
           class="matches">
        <div class="backImg" :style="{ backgroundImage: 'url(' + rectangleBg + ')' }">
          <div class="backIcon" style="right: 28px;">
            <img v-if="match.teama && match.teama.pic" :src="teamImg(match.teama.pic)"  class="icon"/>
          </div>
          <div class="line"></div>
          <div class="backIcon" style="right: 135px;">
            <img v-if="match.teamb && match.teamb.pic" :src="teamImg(match.teamb.pic)"  class="icon"/>
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
                   :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==0) ?'scoreHvr':'','scoreTxt']">{{ scoreDisplay(teamA[m]) }}
              </div>
              <input :id="'teamA_'+[m]" v-model="teamA[m]" v-else
                     :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==0) ?'scoreHvr':'','scoreTxt']">

            </div>


            <div class="scoreBox">

              <div :id="'teamA_'+[m]" v-if="osType== 0"
                   :class="[(yPos==2&&yMatch==m&&yScore==0&&xScore==1) ?'scoreHvr':'','scoreTxt']">{{ scoreDisplay(teamB[m]) }}
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
    <div class="noDataMsg" v-if="!hasMatches">{{ emptyDataMsg }}</div>
  </div>
</template>

<script>
import {ROAST_CONFIG} from '../../js/config';
import { resolveAssetPath } from '../../js/wImgUrl';
import {
  createForecastScroll,
  refreshForecastScroll,
  scrollForecastToElement,
} from '../../js/forecastScroll';
import api from "../../api/api";

export default {
  name: "games",
  props: ['matches', 'yPos','selectedIndex','groups'],
  computed: {
    hasMatches() {
      return !!(this.matches && this.matches[this.selectedIndex] && this.matches[this.selectedIndex].length > 0)
    },
  },
  data() {
    return {
      yMatch: 0,
      xScore: 0,
      yScore: 0,
      myScroll: null,
      _scrollTimer: null,
      forecastFlag: false,
      ballActive: resolveAssetPath(
        'forecast/vectorActive.png',
        ROAST_CONFIG.DEVELOP_MODE,
        ROAST_CONFIG.WImgUrl,
        require('../../assets/images/forecast/vectorActive.png'),
      ),
      ballDeactive: resolveAssetPath(
        'forecast/vectorDeactive.png',
        ROAST_CONFIG.DEVELOP_MODE,
        ROAST_CONFIG.WImgUrl,
        require('../../assets/images/forecast/vectorDeactive.png'),
      ),
      teamA: [],
      teamB: [],
      osType: ROAST_CONFIG.OS_TYPE,
      emptyDataMsg: ROAST_CONFIG.EMPTY_DATA_MSG,
      showSuccessPopup: true , //bad az sabte pish bini bareye 3sanie true mishe
      rectangleBg: resolveAssetPath(
        'forecast/Rectangle.png',
        ROAST_CONFIG.DEVELOP_MODE,
        ROAST_CONFIG.WImgUrl,
        require('../../assets/images/forecast/Rectangle.png'),
      ),
    }
  },
  watch: {
    matches: {
      deep: true,
      handler() {
        this.initpredicted()
        this.refreshScroll()
      },
    },
    selectedIndex() {
      this.yMatch = 0
      this.yScore = 0
      this.xScore = 0
      this.initpredicted()
      this.resetScrollPosition()
      this.scheduleScrollInit()
    },
    hasMatches: {
      handler(ready) {
        if (ready) {
          this.$nextTick(() => {
            this.initpredicted()
            this.scheduleScrollInit()
          })
        } else {
          this.destroyScroll()
        }
      },
      immediate: true,
    },
  },

  beforeDestroy() {
    clearTimeout(this._scrollTimer)
    this.destroyScroll()
  },

  methods: {
    destroyScroll() {
      if (this.myScroll) {
        this.myScroll.destroy()
        this.myScroll = null
      }
    },

    scheduleScrollInit() {
      clearTimeout(this._scrollTimer)
      this._scrollTimer = setTimeout(() => this.initScroll(), 150)
    },

    initScroll() {
      if (!this.hasMatches) {
        this.destroyScroll()
        return
      }

      const el = this.$refs.scrollWrap
      if (!el) return

      if (this.myScroll) {
        refreshForecastScroll(this.myScroll)
        return
      }

      this.myScroll = createForecastScroll(el)
      refreshForecastScroll(this.myScroll)
    },

    refreshScroll() {
      if (this.myScroll) {
        this.$nextTick(() => refreshForecastScroll(this.myScroll))
      } else {
        this.scheduleScrollInit()
      }
    },

    resetScrollPosition() {
      this.yMatch = 0
      if (this.myScroll) {
        this.myScroll.scrollTo(0, 0, 0)
        refreshForecastScroll(this.myScroll)
      }
    },

    goalFieldValue(val) {
      if (val === null || val === undefined || val === '') return ''
      return String(val)
    },

    scoreDisplay(val) {
      if (val === undefined || val === null || val === '') return ''
      return String(val)
    },

    initpredicted(){
      if (!this.hasMatches) {
        this.teamA = []
        this.teamB = []
        return
      }

      const list = this.matches[this.selectedIndex]
      const teamA = []
      const teamB = []

      for (let i = 0; i < list.length; i++) {
        let goalA = ''
        let goalB = ''
        const match = list[i]
        if (match.is_forecast && match.forecasts && match.forecasts.length) {
          goalA = this.goalFieldValue(match.forecasts[0].goala)
          goalB = this.goalFieldValue(match.forecasts[0].goalb)
        }
        teamA[i] = goalA
        teamB[i] = goalB
      }

      this.teamA = teamA
      this.teamB = teamB
    },


    scrollToMatch(index) {
      if (!this.myScroll) return
      this.$nextTick(() => {
        scrollForecastToElement(this.myScroll, '#match_' + index)
      })
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
      if (this.yScore === 0) {
        this.yScore = 1
        return
      }

      if (this.yMatch < this.matches[this.selectedIndex].length - 1) {
        this.yMatch++
        this.yScore = 0
        this.xScore = 0
        this.scrollToMatch(this.yMatch)
      }
    },
    up() {
      if (this.yScore == 1) {
        this.yScore--;
        return true
      } else {
        if (this.yMatch > 0) {
          this.yMatch--;
          this.scrollToMatch(this.yMatch);
          this.xScore = 0;
          return true
        }
        return false
      }

      return false
    },

    enter() {
      if (this.yPos == 2 && this.yScore == 0) {
        const field = this.xScore === 0 ? 'teamA' : 'teamB'
        this.$set(this[field], this.yMatch, '')
        return { teamA: this.teamA, teamB: this.teamB }
      }

      const goalA = String(this.teamA[this.yMatch] ?? '')
      const goalB = String(this.teamB[this.yMatch] ?? '')
      if (this.yScore == 1 && this.yPos == 2 && goalA !== '' && goalB !== '') {
        this.predict(goalA, goalB, this.matches[this.selectedIndex][this.yMatch].id)
      }
      return { teamA: this.teamA, teamB: this.teamB }
    },

    showNumber(number) {
      if (this.yPos != 2 || this.yScore != 0) return

      const field = this.xScore === 0 ? 'teamA' : 'teamB'
      const idx = this.yMatch
      const current = String(this[field][idx] ?? '')

      if (number === -1) {
        this.$set(this[field], idx, current.slice(0, -1))
        return
      }

      if (number < 0 || number > 9) return

      if (current.length >= 2) return

      this.$set(this[field], idx, current + String(number))
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
        //  console.log("data4444444",data)
         if (data.success===true || data.success==="true" ) {

           this.$emit("dopredict",true,data.data.msg);
           // console.log("data",data.data)
           // this.data =data.data
           // this.groups = Object.keys(this.matches);
           // this.matches=this.data[this.groups[this.selectedIndex]]
           // // console.log("this.groups",this.groups)
           // console.log("this.selectedIndex",this.selectedIndex)
           // console.log("this.groups[this.selectedIndex]",this.groups[this.selectedIndex])
           // console.log("this.matches",this.matches);

         } else {
           this.$emit("dopredict",false,data.data.msg);
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

.gamesRoot {
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: column;
  overflow: hidden;
}

.matchesParent {
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.matchesScroll {
  width: 350px;
  box-sizing: border-box;
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

.matches:first-child {
  margin-top: 0;
}

.backImg {
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
