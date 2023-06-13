<template>
  <div class="parent">
    <img class="icon" :src="`${WImgUrl}rahnamaBack.png`">

    <div class="guidParent">
      <div class="child" ref="moving">
        <img :src="WImgUrl+'rahnama.png'" style="z-index: 10">
      </div>
    </div>


  </div>
</template>

<script>
import {ROAST_CONFIG} from "../js/config";
import IScroll from '../js/iscroll';

export default {
  name: "guide",
  data() {
    return {
      WImgUrl: ROAST_CONFIG.WImgUrl,
      myScroll: ''
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
            scrollbars: false,
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
      // this.$refs.myScroll.scrollBy(0, 100, 800, IScroll.utils.ease.back);
    },
  }
}
</script>

<style scoped>
.parent {
  width: 350px;
  height: 950px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  right: 0px;
}

.back {
  width: 100%;
}

.guidParent {
  margin-top: 0px;
  position: relative;
  width: 100%;
  /*height: 630px;*/
  height: 750px;
  /*overflow: hidden;*/
  padding-top20px: 100px;
  right: 0px !important;
  display: flex;
  justify-content: center;
  overflow: hidden;
  /*border: 1px solid red;*/
  display: -webkit-flex !important;;
}

.child {
  position: absolute;
  width: 100%;
  /*overflow: hidden;*/
  right: 0px !important;
  /*padding: 0px 17px 30px 17px !important;*/
}
</style>
