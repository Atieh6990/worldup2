<template>
  <route-page-layout>
    <div class="listParent" ref="listScrollWrap" v-if="list.length > 0">
      <div class="listScroll routeScrollEnd">
        <div
          class="scoreItem"
          v-for="(item, index) in list"
          :key="index"
          :id="'scoreList_' + index"
          :class="[item.self == 1 ? 'self' : '']"
        >
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
    </div>
    <div class="noDataMsg" v-else-if="dataLoaded">{{ emptyDataMsg }}</div>
  </route-page-layout>
</template>

<script>
import {
  createVerticalScroll,
  destroyVerticalScroll,
  refreshVerticalScroll,
  scrollStepDown,
  scrollStepUp,
} from '../js/scrollHelper';
import { ROAST_CONFIG } from "../js/config";
import { fetchRankingList } from '../js/rankingService'

export default {
  name: "scores",
  data() {
    return {
      myScroll: null,
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
          this.$nextTick(() => {
            this.scrollInit()
          })
        }
      })
    },

    scrollInit() {
      if (!this.list.length) return
      setTimeout(() => {
        const el = this.$refs.listScrollWrap
        if (!el) return
        if (this.myScroll) {
          refreshVerticalScroll(this.myScroll)
          return
        }
        this.myScroll = createVerticalScroll(el)
        setTimeout(() => {
          refreshVerticalScroll(this.myScroll)
        }, 300)
      }, 50);
    },

    down() {
      return scrollStepDown(this.myScroll, 80)
    },

    up() {
      return scrollStepUp(this.myScroll, 80)
    },
  }
}
</script>

<style scoped>
.listParent {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.listScroll {
  width: 326px;
  margin: 0 auto;
  padding-top: 0;
  box-sizing: border-box;
}

.listScroll::after {
  content: '';
  display: block;
  clear: both;
}

.scoreItem {
  position: relative;
  display: flex;
  width: 100%;
  height: 77px;
  border: 2px solid #FFFFFF4D;
  display: -webkit-flex !important;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 8px;
  margin-bottom: 13px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0px 10px 0px 10px;
  box-sizing: border-box;
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

.self {
  background: linear-gradient(0deg, #116DFF, #116DFF),
  linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
  border: 3px solid #FFFFFF4D;
}
</style>
