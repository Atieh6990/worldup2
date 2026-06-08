<template>
  <route-page-layout>
    <template #poster>
      <img class="icon" :src="guidePosterImg" alt="">
    </template>
    <div class="guidParent">
      <div class="child" ref="moving">
        <img class="guideContentImg" :src="guideContentImg" alt="">
      </div>
    </div>
  </route-page-layout>
</template>

<script>
import IScroll from '../js/iscroll';
import { GUIDE_POSTER_IMG, GUIDE_CONTENT_IMG } from '../js/guideImages';

export default {
  name: "guide",
  data() {
    return {
      myScroll: '',
      guidePosterImg: GUIDE_POSTER_IMG,
      guideContentImg: GUIDE_CONTENT_IMG,
    }

  },
  created() {
    let self = this;
    setTimeout(() => {
      self.scrollInit();
    }, 600)
  },
  methods: {
    scrollInit() {
      let self = this;
      this.myScroll = '';

      if (this.myScroll == '') {
        setTimeout(() => {
          this.myScroll = new IScroll(".guidParent", {
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
      this.myScroll.moveDown(80);
    },
    up() {
      this.myScroll.moveUp(80);
    },
  }
}
</script>

<style scoped>
.icon,
.guideContentImg {
  width: 100%;
  display: block;
}

.guidParent {
  margin-top: 10px;
  position: relative;
  width: 100%;
  height: 100%;
  right: 0px !important;
  display: flex;
  justify-content: center;
  overflow: hidden;
  display: -webkit-flex !important;;
}

.child {
  position: absolute;
  width: 100%;
  right: 0px !important;
}
</style>
