<template>
  <liveStreams ref="liveStreams"></liveStreams>
</template>

<script>
import liveStreams from "../components/onlinePlay/liveStreams";

export default {
  name: "worldCupLive",
  components: {
    liveStreams,
  },
  methods: {
    up() {
      return this.$refs.liveStreams.up();
    },
    down() {
      return this.$refs.liveStreams.down();
    },
    right() {
      return this.$refs.liveStreams.right();
    },
    left() {
      return this.$refs.liveStreams.left();
    },
    enter() {
      return this.$refs.liveStreams.enter();
    },
  },
}
</script>

<style scoped>

</style>
