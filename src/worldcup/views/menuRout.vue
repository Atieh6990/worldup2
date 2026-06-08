<template>
  <div class="parent">
    <div class="posterWrap">
      <img class="posterImg" :src="wImg('menuSlide.png')">
      <div class="brandGroup">
        <img class="goalGif" :src="wImg('goal.gif')" alt="">
        <img class="samLogo" :src="samLogo" alt="">
      </div>
    </div>

    <div class="menuList">
      <div class="menuScroll">
        <div
          class="menuItem"
          v-for="(item, index) in menuItem"
          :key="item.id"
          :id="'menuItem_' + index"
          :class="[(index == select) ? 'active' : '']"
        >
          <img
            v-if="index == select"
            class="iconHover menuHoverSlide"
            :src="hoverIcon"
            alt=""
          >
          <div class="menuIconSlot">
            <img
              class="menuIcon"
              :src="getMenuIcon(item.id)"
              alt=""
            >
          </div>
          <div class="menuLabel">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <div class="showScore" v-if="hasLoggedIn">
      <myRank :user-score="myScoreNum"></myRank>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import func from "../mixins/mixin";
import { ROAST_CONFIG } from "../js/config";
import { MENU_HOVER_ICON, getMenuIconPath } from "../js/menuIcons";
import myRank from '../components/score/myRank'
import api from '../api/api'
import IScroll from '../js/iscroll'

export default {
  name: "menuRout",
  components: { myRank },
  mixins: [func],
  data() {
    return {
      osType: ROAST_CONFIG.OS_TYPE,
      select: 0,
      menuItem: [],
      myScroll: '',
      loginItem: { id: 0, name: 'ثبت نام', des: 'ثبت نام', rout: '/worldCupHome/login/' },
      hasLoggedIn: false,
      myScoreNum: '',
      samLogo: require('../assets/images/menu/sam.png'),
      hoverIcon: MENU_HOVER_ICON,
    }
  },
  created() {
    this.$root.$on("doFullScreenVideo", () => {
      this.enter()
    });

    this.menuItem = ROAST_CONFIG.menuItems

    if (this.getParam("Tokenw")) {
      let json = JSON.parse(this.getParam("Tokenw"));
      if (json && json.access_token) {
        this.hasLoggedIn = true
        api.scores().then(data => {
          if (data.success == 'true') {
            let find = data.data.find(element => element.self == 1).ranking;
            this.myScoreNum = find
          }
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollInit();
    });
  },
  beforeDestroy() {
    if (this.myScroll) {
      this.myScroll.destroy();
      this.myScroll = '';
    }
  },
  methods: {
    ...mapMutations(['setMenu', 'setOnlinePlay']),
    ...mapGetters(['getMenu', 'getOnlinePlay']),

    getMenuIcon(id) {
      return getMenuIconPath(id);
    },

    isPublicRoute(id) {
      return id === 0 || id === 1;
    },

    scrollInit() {
      this.myScroll = '';
      setTimeout(() => {
        this.myScroll = new IScroll(".menuList", {
          scrollY: true,
          scrollbars: false,
          momentum: true,
          preventDefault: false,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: "none",
          fadeScrollbars: false,
          mouseMove: true,
          bounce: false,
          click: true,
        });
        this.myScroll.refresh();
      }, 50);
    },

    scrollToSelected() {
      if (!this.myScroll) return
      this.$nextTick(() => {
        this.myScroll.scrollToElement('#menuItem_' + this.select, 300, false, true);
        this.myScroll.refresh();
      })
    },

    down() {
      if (this.select < this.menuItem.length - 1) {
        this.select++
        this.scrollToSelected();
      }
    },

    up() {
      if (this.select > 0) {
        this.select--
        this.scrollToSelected();
      }
    },

    enter() {
      let item = this.menuItem[this.select];
      if (this.isPublicRoute(item.id)) {
        this.setMenu(item);
        this.$router.push(item.rout);
      } else if (this.checkToken()) {
        this.setMenu(item);
        this.$router.push(item.rout)
      } else {
        this.setMenu(this.loginItem);
        this.$router.push({ path: this.loginItem.rout, query: { path: this.select } })
      }
    },

    checkToken() {
      let key = this.getParam("Tokenw")
      if (key == null || key == 'null' || key == '' || typeof key == "undefined") {
        return false
      }
      let keyJson = (key);
      if ((new Date).getTime() >= keyJson.expires_in) {
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<style scoped>
.parent {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 1080px;
  background: transparent;
  z-index: 100;
  direction: rtl;
  overflow: hidden;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: column;
}

.posterWrap {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  line-height: 0;
  font-size: 0;
  margin: 0;
  padding: 0;
}

.posterImg {
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}

.brandGroup {
  position: absolute;
  top: 190px;
  right: 50px;
  width: 125px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  direction: ltr;
  display: -webkit-flex !important;
}

.goalGif {
  position: absolute;
  top: 10px;
  left: 0;
  width: 60px;
  height: auto;
  flex-shrink: 0;
}

.samLogo {
  position: absolute;
  top: 10px;
  right: 0;
  width: 95px;
  height: auto;
  margin-top: 1px;
  flex-shrink: 0;
}

.menuList {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
}

.menuScroll {
  width: 100%;
}

.menuItem {
  position: relative;
  height: 89px;
  flex-shrink: 0;
  overflow: hidden;
}

.iconHover {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
  display: block;
}

.menuIconSlot {
  position: absolute;
  right: 38px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  line-height: 0;
}

.menuIcon {
  display: block;
}

.menuLabel {
  position: absolute;
  right: 122px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #FFFFFF;
  text-align: right;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.showScore {
  flex-shrink: 0;
  width: 100%;
}
</style>
