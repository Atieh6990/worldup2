<template>
  <route-page-layout>
    <div v-if="list.length > 0" class="scoresPage">
      <div class="listParent" ref="listScrollWrap">
        <div class="listScroll routeScrollEnd" :class="{ listScrollWithSelf: !!selfEntry }">
          <div
            class="scoreItem"
            v-for="(item, index) in displayList"
            :key="index"
            :id="'scoreList_' + index"
            :class="rowRankClass(item)"
          >
            <div class="rankSide">
              <span v-if="isTopThree(item)" class="rankLabel">{{ topRankLabel(item) }}</span>
              <span v-else class="rankNum">{{ displayRanking(item) }}</span>
            </div>

            <div class="phoneCenter">
              <span class="phoneTxt">{{ item.name }}</span>
            </div>

            <div class="scoreSide">

              <img v-if="getRanking(item) === 1" :src="wImg('1.png')" style="padding-right: 10px">
              <img v-else-if="getRanking(item) === 2" :src="wImg('2.png')" style="padding-right: 10px">
              <img v-else-if="getRanking(item) === 3" :src="wImg('3.png')" style="padding-right: 10px">
              <img v-else :src="wImg('all.png')" style="padding-right: 10px">
              <span class="scoreTxt">{{ toPersianDigits(item.score) }}</span>

            </div>
          </div>
        </div>
      </div>

      <div v-if="selfEntry" class="selfBar">
        <div class="selfMainRight">
          <div class="selfPhoneBlock">
            <span class="selfPhone">{{ selfEntry.name }}</span>
            <div class="selfRankInfo">
              <span class="selfRankNum">{{ displayRanking(selfEntry) }}</span>
              <span class="selfRankSep">|</span>
              <span class="selfRankLabel">جایگاه در رتبه بندی</span>
            </div>
          </div>
          <img class="selfBannerGif" :src="wImg('banner.gif')" alt="">

        </div>

        <div class="selfScoreSide">
          <img :src="wImg('all.png')" style="padding-right: 10px">
          <span class="selfScore">{{ toPersianDigits(selfEntry.score) }}</span>
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
import { fetchRankingList, findSelfRankingEntry, buildRankingDisplayList } from '../js/rankingService'

const TOP_RANK_LABELS = ['نفر اول', 'نفر دوم', 'نفر سوم']

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
  computed: {
    displayList() {
      return buildRankingDisplayList(this.list)
    },
    selfEntry() {
      return findSelfRankingEntry(this.list)
    },
  },
  created() {
    this.getScores()
  },
  beforeDestroy() {
    this.myScroll = destroyVerticalScroll(this.myScroll)
  },
  methods: {
    getRanking(item) {
      const rank = parseInt(item && item.ranking, 10)
      return isNaN(rank) ? 0 : rank
    },

    displayRanking(item) {
      if (!item || item.ranking == null || item.ranking === '') return ''
      return item.ranking
    },

    isTopThree(item) {
      const rank = this.getRanking(item)
      return rank >= 1 && rank <= 3
    },

    topRankLabel(item) {
      const rank = this.getRanking(item)
      return TOP_RANK_LABELS[rank - 1] || ''
    },

    rowRankClass(item) {
      const rank = this.getRanking(item)
      if (rank === 1) return 'rankFirst'
      if (rank === 2) return 'rankSecond'
      if (rank === 3) return 'rankThird'
      return 'rankDefault'
    },

    toPersianDigits(value) {
      if (value == null || value === '') return ''
      return String(value).replace(/\d/g, function (digit) {
        return '۰۱۲۳۴۵۶۷۸۹'[digit]
      })
    },

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
.scoresPage {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
}

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

.listScrollWithSelf {
  padding-bottom: 95px;
}

.listScroll::after {
  content: '';
  display: block;
  clear: both;
}

.scoreItem {
  position: relative;
  width: 100%;
  height: 77px;
  border-radius: 8px;
  margin-bottom: 13px;
  box-sizing: border-box;
}

.rankFirst {
  background: linear-gradient(-270deg, #CDA72F 0%,  #675418 100%);
}

.rankSecond {
  background: linear-gradient(-270deg, #8181A9 0%,  #333343 100%);
}

.rankThird {
  background: linear-gradient(-270deg, #C44715 0%,  #5E220A 100%);
}

.rankDefault {
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.rankSide {
  position: absolute;
  right: 14px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 2;
  white-space: nowrap;
}

.phoneCenter {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 52%;
  text-align: center;
}

.phoneTxt {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 1;
  direction: ltr !important;
  display: inline-block;
}

.scoreSide {
  position: absolute;
  left: 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  align-items: center;
  direction: ltr;
}

.rankLabel {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 1;
  white-space: nowrap;
}

.rankNum {
  color: #3CC781;
  font-size: 25px;
  font-weight: 800;
  line-height: 1;
}

.scoreTxt {
  color: #FFFFFF;
  font-size: 20px;
  line-height: 50%;
}

.selfBar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  width: 100%;
  height: 95px;
  background: #116DFF;
  border-top: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0px -2px 12px rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
  padding: 0 20px;
}

.selfMainRight {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  align-items: center;
  direction: rtl;
  min-width: 0;
}

.selfBannerGif {
  width: 52px;
  height: 52px;
  display: block;
  object-fit: contain;
  flex-shrink: 0;
  margin-right: 20px;
}

.selfRankInfo {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  direction: rtl;
  white-space: nowrap;
  margin-top: 8px;
}

.selfRankNum {
  color: #FFFFFF;
  font-size: 20px;
  line-height: 1;
}

.selfRankSep {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  margin: 0 8px;
}

.selfRankLabel {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 1;
}

.selfPhoneBlock {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: column;
  align-items: flex-start;
  text-align: right;
  min-width: 0;
}

.selfPhone {
  color: #FFFFFF;
  font-size: 22px;
  line-height: 1.2;
  direction: ltr !important;
  white-space: nowrap;
  text-align: right;
}

.selfScoreSide {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  align-items: center;
  direction: ltr;
  flex-shrink: 0;
}

.selfScore {
  color: #FFFFFF;
  font-size: 22px;
  line-height: 50%;
}
</style>
