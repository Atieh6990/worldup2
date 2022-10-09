<template>



  <div class="chatBoxParent">
    <div class="chatBoxChild" v-on:click="clickList()">
      <div v-for="(item,index) in (messageList)"
           :id="'chatList_'+index"
           :class="[((userId == item.user_id) ? 'selfDirection':''),'chatItem']">
        <div class="userImg">
          <div class="userImgBg">
            <img src="../../assets/images/userdefaul.png">
          </div>
        </div>
        <div class="userTxt">
          <div class="nameDate">
            <div class="name">{{item.user.name}}</div>
            <div class="date">{{item.created_at}}</div>
          </div>
          <div style="  word-wrap: break-word; overflow-wrap: break-word;">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 30px"></div>
  </div>
</template>

<script>

import IScroll from '../../js/iscroll';
import Vue from 'vue'
import func from '../../mixins/mixin'
// import IScrollView from 'vue-iscroll-view'
// import IScroll from 'iscroll'
//
// Vue.use(IScrollView, IScroll)


export default {
  name: "chats",
  props: ["messageList", "userId"],
  mixins: [func],
  components: {},
  data() {
    return {
      myScroll: '',
      options: {
        scrollY: true,
        momentum: true,
        preventDefault: false,
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: "none",
        fadeScrollbars: false,
        mouseMove: true,
        bounce: true,

      }
    }
  },
  created() {
    let self = this;
    this.activeRoute = 1
    // this.refreshScroll();
    setTimeout(() => {
      self.scrollInit();
    }, 600)
  },

  methods: {
    scrollInit() {
      let self = this;
      this.myScroll = '';
      if (this.myScroll == '' && this.messageList.length > 0) {
        setTimeout(() => {
          this.myScroll = new IScroll(".chatBoxParent", {
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
        this.refreshScroll();
      }
    },
    showNewMessage(message) {
      this.messageList.push(message);
      // this.$refs.myScroll.refresh();
      this.refreshScroll()
    },
    down() {
      if (this.myScroll.y !== this.myScroll.maxScrollY) {
        this.myScroll.moveDown(80);
        return true;
      }
      return false
    },
    up() {
      this.myScroll.moveUp(80);
      // this.$refs.myScroll.scrollBy(0, 100, 800, IScroll.utils.ease.back);
    },
    clickList() {
      this.$root.$emit('remove_Hover', 0)
    },
    refreshScroll() {

      setTimeout(() => {
        this.myScroll.moveDown(-1 * this.myScroll.maxScrollY+20)
      }, 30);


      // setTimeout(() => {
        // this.myScroll.moveDown(-1 * this.myScroll.maxScrollY + 20)
      //   console.log("refreshScroll", this.$refs.myScroll.iscroll.scrollerHeight)
      //   this.$refs.myScroll.scrollBy(0, -300, 800, IScroll.utils.ease.back);
      //   // this.$refs.myScroll.refresh()
      //   // this.$refs.myScroll.scrollBy(0,this.$refs.myScroll.iscroll.maxScrollY, 800, IScroll.utils.ease.back)
      // }, 3000);
    }
  }
}
</script>

<style scoped>

.chatBoxParent {
  position: absolute;
  width: 355px;
  height:48%;
  top: 85px;
  left: 0px;
  padding: 15px;
  padding-top: 30px !important;
  padding-bottom: 30px !important;
  /*display: flex;*/
  justify-content: center;
  overflow: hidden;
}

.chatBoxChild {
  position: absolute;
  width: 85%;
  padding: 20px;
  padding-bottom: 30px !important;
}
.selfDirection {
  direction: rtl !important;
}

.chatItem {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  direction: ltr;
}

.userImg {
  float: right;
  width: 20%;
}

.userImgBg {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50px;
}

.userImgBg img {
  max-height: 100%;
}

.userTxt {
  float: left;
  width: 80%;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  color: #000;
  direction: rtl;
  padding: 10px;
  font-size: 15px;
  margin-right: 10px;
  margin-left: 10px;
  /*white-space: pre-line;*/
}

.nameDate {
  position: relative;
  width: 100%;
  height: 50px;
}

.name {
  display: flex;
  float: right;
  width: 50%;
  color: #891b56;
  font-size: 15px;
  direction: rtl;
  text-align: right;
}

.date {
  display: flex;
  float: left;
  width: 50%;
  color: #d7d7d9;
  font-size: 12px;
  direction: ltr;
  text-align: left;
}

</style>

