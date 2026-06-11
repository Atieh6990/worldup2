<template>
  <route-page-layout>
    <div class="listParent" ref="listScrollWrap">
      <div class="listScroll routeScrollEnd">
        <img
          ref="guideImg"
          class="guideContentImg"
          :src="guideContentImg"
          alt=""
          @load="onGuideImgLoad"
        >
      </div>
    </div>
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
import { GUIDE_CONTENT_IMG } from '../js/guideImages';

export default {
  name: "guide",
  data() {
    return {
      myScroll: null,
      guideContentImg: GUIDE_CONTENT_IMG,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const img = this.$refs.guideImg
      if (img && img.complete && img.naturalHeight > 0) {
        this.scrollInit()
      }
    })
  },
  beforeDestroy() {
    this.myScroll = destroyVerticalScroll(this.myScroll)
  },
  methods: {
    scrollInit() {
      setTimeout(() => {
        const el = this.$refs.listScrollWrap
        if (!el) return
        if (this.myScroll) {
          refreshVerticalScroll(this.myScroll)
          return
        }
        this.myScroll = createVerticalScroll(el)
      }, 50)
    },

    down() {
      return scrollStepDown(this.myScroll, 80)
    },

    up() {
      return scrollStepUp(this.myScroll, 80)
    },

    onGuideImgLoad() {
      this.$nextTick(() => {
        this.scrollInit()
      })
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

.guideContentImg {
  width: 100%;
  display: block;
  height: auto;
}
</style>
