<template>
  <upcomingGames ref="upcomingGames"></upcomingGames>
</template>

<script>
import upcomingGames from "../../worldcup/components/forcast/upcomingGames";


export default {
  name: "forecast",
  components: {
    upcomingGames
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    up() {
      this.$refs.upcomingGames.up();
    },
    down() {
      this.$refs.upcomingGames.down();
    },
    right() {
      this.$refs.upcomingGames.right();
    }, left() {
      this.$refs.upcomingGames.left();
    },
    enter() {
      this.$refs.upcomingGames.enter();
    },
    showNumber(number) {
      this.$refs.upcomingGames.showNumber(number);
    },
  }
}
</script>

<style scoped>

</style>
