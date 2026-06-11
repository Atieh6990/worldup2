<template>
  <route-page-layout>
    <div class="scoresBody">
      <div class="ListChild routeScrollEnd" v-if="list.length > 0">
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
import {
  createVerticalScroll,
  destroyVerticalScroll,
  refreshVerticalScroll,
  scrollMoveDown,
  scrollMoveUp,
} from '../js/scrollHelper';
import {ROAST_CONFIG} from "../js/config";
import { findSelfRankingEntry, fetchRankingList } from '../js/rankingService'

export default {
  name: "scores",
  data() {
    return {
      select: 0, myScroll: '',
      list: [],
      dataLoaded: false,
      emptyDataMsg: ROAST_CONFIG.EMPTY_DATA_MSG,
    }
  },
  created() {
    this.getScores()
  },
  beforeDestroy() {
    this.myScroll = destroyVerticalScroll(this.myScroll)
  },
  methods: {

    getScores() {
      fetchRankingList().then(list => {
        this.dataLoaded = true;
        this.list = list;
        if (this.list.length > 0) {
          this.scrollInit();
        }
        findSelfRankingEntry(this.list)
      })
    },


    scrollInit() {
      if (!this.list.length) return
      setTimeout(() => {
        const el = document.querySelector('.scoresBody')
        if (!el) return
        if (this.myScroll) {
          refreshVerticalScroll(this.myScroll)
          return
        }
        this.myScroll = createVerticalScroll(el)
      }, 50);
    },
    down() {
      scrollMoveDown(this.myScroll, 80)
    },
    up() {
      scrollMoveUp(this.myScroll, 80)
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

.ListChild {
  width: 90%;
  margin: auto;
  margin-top: 0;
  box-sizing: border-box;
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
