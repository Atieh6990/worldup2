<template>
  <route-page-layout>
    <template #poster>
      <div
        v-if="matches.length > 0 && activeMatch && posterImage"
        class="posterSection"
        :style="posterHeight ? {height: posterHeight + 'px'} : {}"
      >
        <div class="posterBox" :style="posterHeight ? {height: posterHeight + 'px'} : {}">
          <img class="posterImg" :src="posterImage" alt="" @load="setPosterHeight">
        </div>
      </div>
    </template>

    <div class="listParent" v-if="matches.length > 0" ref="listScrollWrap">
      <div class="listScroll routeScrollEnd">
        <div :id="'match_' + index"
             v-for="(match, index) in matches"
             :key="match.uuid"
             class="listItem"
             :class="[(index == select) ? 'listItemActive' : '']">
          <div class="listFlag listFlagRight">
            <img v-if="match.other_info && match.other_info.away_team_logo" :src="match.other_info.away_team_logo" class="flagImg" alt="">
          </div>
          <div class="listTitle">{{ match.team2_name }} - {{ match.team1_name }}</div>
          <div class="listFlag listFlagLeft">
            <img v-if="match.other_info && match.other_info.home_team_logo" :src="match.other_info.home_team_logo" class="flagImg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="noDataMsg" v-else>{{ emptyDataMsg }}</div>
  </route-page-layout>
</template>

<script>
import {
  createVerticalScroll,
  destroyVerticalScroll,
  refreshVerticalScroll,
} from '../../js/scrollHelper'
import {ROAST_CONFIG} from "../../js/config";
import func from "../../mixins/mixin";
import { fetchUpcomingMatches } from "../../js/aparatMatchService";

export default {
  name: "upcomingStreams",
  mixins: [func],
  data() {
    return {
      matches: [],
      select: 0,
      posterSelect: -1,
      posterHeight: 0,
      myScroll: '',
      emptyDataMsg: ROAST_CONFIG.EMPTY_DATA_MSG,
    }
  },
  watch: {
    posterSelect() {
      this.posterHeight = 0
    },
  },
  computed: {
    activeMatch() {
      if (this.posterSelect < 0) return null
      return this.matches[this.posterSelect] || null
    },
    posterImage() {
      if (!this.activeMatch) return ''
      return this.activeMatch.thumb_website || this.activeMatch.thumb_mobile || ''
    },
  },
  created() {
    fetchUpcomingMatches().then((data) => {
      this.matches = data || []
      if (this.matches.length > 0) {
        this.posterSelect = 0
      }
      this.$nextTick(() => {
        this.scrollInit()
      })
    })
  },
  beforeDestroy() {
    this.myScroll = destroyVerticalScroll(this.myScroll)
  },
  methods: {
    scrollInit() {
      if (this.matches.length > 0) {
        setTimeout(() => {
          const el = this.$refs.listScrollWrap
          if (!el) return
          if (this.myScroll) {
            refreshVerticalScroll(this.myScroll)
            return
          }
          this.myScroll = createVerticalScroll(el)
        }, 50)
      }
    },
    focusMatch(index) {
      if (index < 0 || index >= this.matches.length) return
      this.select = index
    },
    setPosterHeight(e) {
      if (!this.posterHeight && e.target.offsetHeight) {
        this.posterHeight = e.target.offsetHeight
      }
    },
    scrollToSelected() {
      if (!this.myScroll) return
      this.$nextTick(() => {
        this.myScroll.scrollToElement('#match_' + this.select, 400, false, true)
        this.myScroll.refresh()
      })
    },
    left() {
      return false
    },
    right() {
      return false
    },
    down() {
      if (this.select < this.matches.length - 1) {
        this.focusMatch(this.select + 1)
        this.scrollToSelected()
        return true
      }
      return false
    },
    up() {
      if (this.select > 0) {
        this.focusMatch(this.select - 1)
        this.scrollToSelected()
        return true
      }
      return false
    },
    enter() {
      if (!this.matches[this.select]) return false
      this.posterSelect = this.select
      return true
    },
  },
}
</script>

<style scoped>

.posterSection {
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
}

.posterBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex !important;
  overflow: hidden;
}

.posterImg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
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

.listItem {
  box-sizing: border-box;
  width: 100%;
  height: 72px;
  margin-bottom: 12px;
  background: rgba(31, 30, 35, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: -webkit-flex !important;
  padding: 0 14px;
}

.listItemActive {
  border-color: #116DFF;
  box-shadow: 0 0 0 1px #116DFF;
}

.listFlag {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex !important;
  flex-shrink: 0;
}

.listFlag .flagImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.listTitle {
  flex: 1;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
