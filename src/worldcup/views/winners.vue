<template>
  <div style="direction: rtl !important;">
    <groups v-on:selectItem="selectItem" :y-pos="yPos" :groups="groups" ref="groups"></groups>
    <my-score :userMob="userMob" :userScoreNum="userScoreNum"></my-score>
    <div class="winnerParent" style="top: 90px;">
      <div style="width: 50%;float: right;">برنده مستقیم</div>
      <div style="width: 29%;float:left;">امتیاز</div>
    </div>
    <div class="scoreItem" style="top: 105px;">
      <div class="nameBox innerItem">
        <img :src="WImgUrl+'name.png'" style="padding-left: 10px">
        <div class="nameTxt">{{ scoreUserMob }}</div>
      </div>
      <div class="rankBox innerItem">
        <div class="scoreTxt">
          {{ scoreUserScore }}
        </div>
        <img :src="WImgUrl+'1.png'" style="padding-right: 10px">
      </div>
    </div>
    <div class="verLine" style="top: 125px;"></div>
    <div class="winnerParent" style="top: 140px;">
      <div style="width: 55%;float: right;">برنده قرعه کشی</div>
      <div style="width: 29%;float:left;">امتیاز</div>
    </div>
    <div class="scoreItem" style="top: 155px;">
      <div class="nameBox innerItem">
        <img :src="WImgUrl+'name.png'" style="padding-left: 10px">
        <div class="nameTxt">{{ lotteryUserMob }}</div>
      </div>
      <div class="rankBox innerItem">
        <div class="scoreTxt">{{ lotteryUserScore }}</div>
        <img :src="WImgUrl+'2.png'" style="padding-right: 10px">
      </div>
    </div>
    <div class="verLine" style="top: 175px;"></div>
    <div class="descScore">
      {{ descScore }}
    </div>
  </div>

</template>

<script>
import groups from "../components/forcast/groups";
import api from "../api/api";
import MyScore from "../components/forcast/myScore";
import {ROAST_CONFIG} from "../js/config";

export default {
  name: "winners",
  data() {
    return {
      yPos: 1,
      winnersList: [],
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
      WImgUrl: ROAST_CONFIG.WImgUrl,
    }
  },
  created() {
    this.winnersApi();

  },
  components: {MyScore, groups},
  methods: {
    selectItem(index) {
      this.selectedIndex = index
    },
    winnersApi: function () {
      api.winners().then((data) => {
        if (data.success) {
          this.winnersInfo(data.data);
          this.userScoreApi();
        } else {
        }

      });

    },
    userScoreApi: function () {
      api.userScore().then((data) => {
        if (data.success) {
          this.userScoreInfo(data.data);
          this.userMob = data.data['user']['mobile'];
        } else {
        }

      });

    },
    winnersInfo: function (data) {
      this.winnersList = data;

      for (let key in this.winnersList) {
        this.groups.push(key);
      }
      this.selectedInfo();
    },
    userScoreInfo: function (data) {
      this.userScoreList = data;
      //
      // for (let key in this.userScoreList) {
      //   this.groups.push(key);
      // }
      this.selectedScore();
    },
    selectedInfo: function () {
      this.scoreUserMob = this.winnersList[this.groups[this.selectedIndex]]['score_user']['mobile'];
      this.lotteryUserMob = this.winnersList[this.groups[this.selectedIndex]]['lottery_user']['mobile'];
      this.scoreUserScore = this.winnersList[this.groups[this.selectedIndex]]['score_user']['score'];
      this.lotteryUserScore = this.winnersList[this.groups[this.selectedIndex]]['lottery_user']['score'];
      this.descScore = this.winnersList[this.groups[this.selectedIndex]]['description'];
    },
    selectedScore: function () {
      this.userScoreNum = this.userScoreList[this.groups[this.selectedIndex]]['score'];
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
  font-size: 18px;
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
