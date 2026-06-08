<template>
  <upcomingStreams ref="upcomingStreams"></upcomingStreams>
</template>

<script>
import upcomingStreams from "../components/onlinePlay/upcomingStreams";

export default {
  name: "onlinePlay",
  components: {
    upcomingStreams,
  },
  methods: {
    up() {
      return this.$refs.upcomingStreams.up();
    },
    down() {
      return this.$refs.upcomingStreams.down();
    },
    right() {
      return this.$refs.upcomingStreams.right();
    },
    left() {
      return this.$refs.upcomingStreams.left();
    },
    enter() {
      return this.$refs.upcomingStreams.enter();
    },
  },
}
</script>

<style scoped>

</style>
