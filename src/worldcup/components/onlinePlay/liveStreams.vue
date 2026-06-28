<template>
  <route-page-layout>
    <div class="listParent" v-if="lives.length > 0" ref="listScrollWrap">
      <div class="listScroll routeScrollEnd">
        <div
          :id="'liveMatch_' + index"
          v-for="(live, index) in lives"
          :key="live.id"
          class="listItem"
          :class="[(index == select) ? 'listItemActive' : '']"
        >
          <div class="listIconSlot">
            <img v-if="live.icon" :src="live.icon" class="channelIcon" alt="">
          </div>
          <div class="listTitle">{{ live.title }}</div>
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
} from '../../js/scrollHelper'
import { ROAST_CONFIG } from "../../js/config";
import func from "../../mixins/mixin";
import {
  buildHamsamPlayMessage,
  buildHamsamPlayPayload,
  fetchHamsamLivesList,
} from "../../js/hamsamLiveService";

export default {
  name: "liveStreams",
  mixins: [func],
  data() {
    return {
      lives: [],
      select: 0,
      myScroll: '',
      dataLoaded: false,
      emptyDataMsg: ROAST_CONFIG.EMPTY_DATA_MSG,
    }
  },
  created() {
    fetchHamsamLivesList().then((data) => {
      this.dataLoaded = true
      this.lives = data || []
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
      if (this.lives.length > 0) {
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

    focusLive(index) {
      if (index < 0 || index >= this.lives.length) return
      this.select = index
    },

    scrollToSelected() {
      if (!this.myScroll) return
      this.$nextTick(() => {
        this.myScroll.scrollToElement('#liveMatch_' + this.select, 400, false, true)
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
      if (this.select < this.lives.length - 1) {
        this.focusLive(this.select + 1)
        this.scrollToSelected()
        return true
      }
      return false
    },
    up() {
      if (this.select > 0) {
        this.focusLive(this.select - 1)
        this.scrollToSelected()
        return true
      }
      return false
    },
    enter() {
      const live = this.lives[this.select]
      if (!live) return false

      const payload = buildHamsamPlayPayload(live)
      const message = buildHamsamPlayMessage(live)
      // console.log('[liveStreams] playable:', payload.playable)
      // console.log('[liveStreams] ReactNative playVideo:', message)
      this.sendPlayVideoToReact(payload)
      return true
    },
  },
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
  justify-content: flex-start;
  display: -webkit-flex !important;
  padding: 0 14px;
  direction: rtl;
}

.listItemActive {
  border-color: #116DFF;
  box-shadow: 0 0 0 1px #116DFF;
}

.listIconSlot {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex !important;
  flex-shrink: 0;
  margin-left: 12px;
}

.channelIcon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.listTitle {
  flex: 1;
  text-align: right;
  color: #ffffff;
  font-size: 20px;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
