<template>
  <route-page-layout>
    <div v-if="hasWinners" class="winnersPage" style="direction: rtl !important;">
      <groups v-on:selectItem="selectItem" :y-pos="yPos" :groups="groups" ref="groups"></groups>
      <div class="winnersList">
      <div class="winnerParent">
        <div style="width: 50%;float: right;">نفر اول روز</div>
        <div style="width: 29%;float:left;">امتیاز</div>
      </div>
      <div class="scoreItem">
        <div class="nameBox innerItem">
          <img :src="wImg('name.png')" style="padding-left: 10px">
          <div class="nameTxt">{{ scoreUserMob }}</div>
        </div>
        <div class="rankBox innerItem">
          <div class="scoreTxt">
            {{ scoreUserScore }}
          </div>
          <img :src="wImg('1.png')" style="padding-right: 10px">
        </div>
      </div>
      </div>
    </div>
    <div class="noDataMsg" v-else>{{ emptyDataMsg }}</div>
  </route-page-layout>
</template>

<script>
import groups from "../components/forcast/groups";
import api from "../api/api";
import {ROAST_CONFIG} from "../js/config";

export default {
  name: "winners",
  data() {
    return {
      yPos: 1,
      winnersList: {},
      userScoreList: [],
      groups: [],
      selectedIndex: 0,
      scoreUserMob: '',
      lotteryUserMob: '',
      scoreUserScore: '',
      lotteryUserScore: '',
      descScore: '',
      userScoreNum: '',
      userMob: '',
      error:false,
      emptyDataMsg: ROAST_CONFIG.EMPTY_DATA_MSG,
    }
  },
  created() {
    this.winnersApi();

  },
  computed: {
    hasWinners() {
      return this.groups.length > 0
    },
  },
  components: { groups },
  methods: {
    selectItem(index) {
      this.selectedIndex = index
    },
    winnersApi: function () {
      api.winners().then((data) => {
        if (!data || !data.success) return

        const payload = data.data || {}
        if (payload.message === 'no winners yet') {
          this.winnersList = payload
          this.groups = []
          return
        }

        this.winnersInfo(payload);
        this.userScoreApi();
      }).catch(() => {
        this.groups = []
      });

    },
    userScoreApi: function () {
      if (!this.groups.length) return

      api.userScore().then((data) => {
        if (!data || !data.success || !data.data) return

        this.userScoreInfo(data.data);
        const user = data.data.user
        this.userMob = user && user.mobile ? user.mobile : ''
      }).catch(() => {});

    },
    winnersInfo: function (data) {
      if (!data || data.message === 'no winners yet') {
        this.winnersList = data || {}
        this.groups = []
        return
      }

      this.winnersList = data;
      this.groups = []

      for (let key in this.winnersList) {
        if (!Object.prototype.hasOwnProperty.call(this.winnersList, key) || key === 'message') continue
        this.groups.push(key);
      }

      if (this.groups.length > 0) {
        this.selectedInfo();
      }
    },
    userScoreInfo: function (data) {
      this.userScoreList = data || {};
      this.selectedScore();
    },
    selectedInfo: function () {
      const dayKey = this.groups[this.selectedIndex]
      const dayData = dayKey ? this.winnersList[dayKey] : null
      if (!dayData) return

      const scoreUser = dayData.score_user || {}
      const lotteryUser = dayData.lottery_user || {}

      this.scoreUserMob = scoreUser.mobile || ''
      this.lotteryUserMob = lotteryUser.mobile || ''
      this.scoreUserScore = scoreUser.score != null ? scoreUser.score : ''
      this.lotteryUserScore = lotteryUser.score != null ? lotteryUser.score : ''
      this.descScore = dayData.description || ''
    },
    selectedScore: function () {
      const dayKey = this.groups[this.selectedIndex]
      if (!dayKey || !this.userScoreList || !this.userScoreList[dayKey]) return

      const dayScore = this.userScoreList[dayKey].score
      this.userScoreNum = dayScore != null ? dayScore : ''
    },
    enter() {
      if (this.yPos == 1) {
        this.$refs.groups.enter();
        this.selectedInfo();
        this.selectedScore();
      }

    }
    ,
    right() {
      if (this.yPos == 1)
        this.$refs.groups.right()

    }
    ,
    left() {
      if (this.yPos == 1)
        this.$refs.groups.left()

    }, up() {

    }, down() {

    }
  }
}
</script>

<style scoped>
.winnersPage >>> .groupParent {
  top: 0;
}

.winnersList {
  margin-top: 10px;
}

.verLine {
  background-color: #FFFFFF4D;
  width: 100%;
  height: 1px;
  float: right;
  position: relative;
}

.winnerParent {
  width: 100%;
  height: 33px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  color: #FFFFFF;
  position: relative;
}

.scoreItem {
  position: relative;
  width: 315px;
  height: 77px;
  border: 2px solid #FFFFFF4D;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 8px;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0px 10px 0px 10px;
  margin: auto;
}

.innerItem {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  height: 100%;
  /*border: 1px solid red;*/
}

.nameBox {
  width: 65%;
  justify-content: flex-start;
}

.rankBox {
  width: 35%;
  justify-content: flex-end;
}

.nameTxt {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 50%;
  direction: ltr;
}

.scoreTxt {
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  line-height: 50%;
}

.descScore {
  width: 90%;
  height: 33px;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 38px;
  color: #FFFFFF;
  position: relative;
  top: 200px;
  text-align: right;
  margin: auto;

}
</style>
