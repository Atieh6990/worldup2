<template>


  <div class="chatBoxParent">
    <div class="chatBoxChild">
      <div v-for="(item,index) in (messageList)"
           :id="'chatList_'+index"
           :class="[((userId == item.user_id) ? 'selfDirection':''),'chatItem']">
        <div class="userImg">
          <div class="userImgBg">
            <img :src="WImgUrl+'carbon_user-avatar-filled.png'">
          </div>
        </div>
        <div class="userTxt">
          <div class="nameDate">
            <div class="name">{{ item.user.name }}</div>
          </div>
          <div style="  word-wrap: break-word; overflow-wrap: break-word;padding: 10px 0 10px 0">{{ item.text }}</div>

          <div class="nameDate">
            <div class="date">{{ item.created_at }}</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import IScroll from '../../js/iscroll';
import Vue from 'vue'
import func from '../../mixins/mixin'
import {ROAST_CONFIG} from "../../js/config";

export default {
  name: "chats",
  props: ["messageList", "userId"],
  mixins: [func],
  components: {},
  data() {
    return {
      myScroll: '',
      WImgUrl:ROAST_CONFIG.WImgUrl,
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
            scrollbars: false,
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
      console.log(this.myScroll.y, this.myScroll.maxScrollY)
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
        this.myScroll.moveDown(-1 * this.myScroll.maxScrollY + 20)
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
  position: relative;
  width: 355px;
  /*height: 630px;*/
  height: 470px;
  /*top: 100px;*/
  left: 0px;
  padding: 15px;
  /*padding-top: 30px !important;*/
  padding-bottom: 30px !important;
  display: flex;
  justify-content: center;
  overflow: hidden;
  /*border: 1px solid red;*/
  display: -webkit-flex !important;;
}

.chatBoxChild {
  position: absolute;
  width: 100%;
  overflow: hidden;
  right: 0px;
  padding: 0px 17px 30px 17px !important;
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
  display: -webkit-flex !important;
}

.userImg {
  float: right;
  width: 20%;
}

.userImgBg {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50px;
  display: -webkit-flex !important;
}

.userImgBg img {
  max-height: 100%;
}

.userTxt {
  float: left;
  width: 75%;
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
  display: -webkit-flex !important;
}

.nameDate {
  position: relative;
  width: 100%;
  height: 25px;
}

.name {
  display: flex;
  float: right;
  width: 100%;
  color: #116DFF;
  font-size: 15px;
  direction: rtl;
  text-align: right;
  display: -webkit-flex !important;
}

.date {
  display: flex;
  float: left;
  width: 100%;
  color: #d7d7d9;
  font-size: 12px;
  direction: ltr;
  text-align: left;
  display: -webkit-flex !important;
}
.hg-theme-default .hg-row {
  display: -webkit-flex !important;;
}

.hg-row {
  display: -webkit-flex !important;;
}
</style>

