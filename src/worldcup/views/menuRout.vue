<template>
  <div class="parent">
    <div class="posterWrap">
      <home-poster />
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
import homePoster from '../components/layout/homePoster'
import myRank from '../components/score/myRank'
import { fetchMyTotalScore } from '../js/rankingService'
import {
  createVerticalScroll,
  destroyVerticalScroll,
  refreshVerticalScroll,
} from '../js/scrollHelper'

export default {
  name: "menuRout",
  components: { myRank, homePoster },
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
        fetchMyTotalScore().then(score => {
          this.myScoreNum = score
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
    this.myScroll = destroyVerticalScroll(this.myScroll)
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
      setTimeout(() => {
        const el = document.querySelector('.menuList')
        if (!el) return
        if (this.myScroll) {
          refreshVerticalScroll(this.myScroll)
          return
        }
        this.myScroll = createVerticalScroll(el, { click: true })
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
