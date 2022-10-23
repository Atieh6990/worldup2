<template>
  <div style="  direction: rtl !important;">

    <tabs :y-pos="yPos" ref="tabs"></tabs>
    <groups :y-pos="yPos" :groups="groups" ref="groups"></groups>
    <games :y-pos="yPos" :matches="matches" ref="games" v-if="type == 0"></games>
    <myforcasts ref="myforcasts" v-if="type == 1"></myforcasts>

  </div>
</template>

<script>

import api from "../../api/api";
import tabs from '../forcast/tabs'
import groups from '../forcast/groups'
import games from '../forcast/games'
import myforcasts from "../forcast/myforcasts";

export default {
  name: "UpcomingGames",
  data() {
    return {
      matches: '',
      groups: '',
      yPos: 0,
      type: 0,//0 -> bazi haye pishe roo , 1 -> pishbini haye man
    }
  },
  components: {tabs, groups, games, myforcasts},
  created() {
    this.groupTeams();
  },
  methods: {

    up() {


      if (this.yPos == 1) {
        this.yPos--;
        return false
      }

      if (this.yPos == 2) {
        if (this.type == 0) {//games
          if (!this.$refs.games.up()) {
            this.yPos = 1
          }
        } else {//myforcasts
          if (!this.$refs.myforcasts.up()) {
            this.yPos = 1
          }
        }

      }


    },
    down() {

      if (this.yPos == 0 || this.yPos == 1) {
        this.yPos++;
        return false
      }

      if (this.yPos == 2) {
        if (this.type == 0) {//games
          this.$refs.games.down()
        } else {//myforcasts
          this.$refs.myforcasts.down()
        }

      }

    },
    right() {
      if (this.yPos == 0) {
        this.$refs.tabs.right()
      }
      if (this.yPos == 1) {
        this.$refs.groups.right()
      }
      if (this.yPos == 2) {
        this.$refs.games.right()
      }
    },

    left() {
      if (this.yPos == 0) {
        this.$refs.tabs.left()
      }

      if (this.yPos == 1) {
        this.$refs.groups.left()
      }

      if (this.yPos == 2) {
        this.$refs.games.left()
      }
    },

    enter() {

      if (this.yPos == 0) {//tabs
        this.type = this.$refs.tabs.enter()
      }

      if (this.yPos == 1) {//groups
        this.$refs.groups.enter()
      }

      if (this.yPos == 2) {//games or myforcast
        if (this.type == 0) {//game
          this.$refs.games.enter() //TODO sabte pishbini
        } else {//myforcast

        }
      }

    },

    typeNumber(number) {
      if (this.yPos == 2 && this.type == 0) {
        this.$refs.games.typeNumber(number)
      }
    },


    groupTeams: function () {
      api.groupteams().then((data) => {
        if (data.success) {
          this.matches = data['data']['Matchs'];
          this.groups = data.data.Groups;
        } else {
          this.matches = {};
        }

        // if (data.success)
        //   this.scrollInit();
      });
    }
  }
}
</script>

<style scoped>


</style>
