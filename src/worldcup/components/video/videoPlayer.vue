<template>
  <div class="videoParent">

    <object v-if="url != '' && osType == 1" id="av-player" type="application/avplayer" class="playBox"></object>

  </div>
</template>

<script>

import Player from "../../js/player"
import {ROAST_CONFIG} from "../../js/config";
import func from "../../mixins/mixin";

export default {
  name: "player",
  mixins: [func],
  props: {
    uuid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      url: '',
      poster: '',
      matchUuid: '',
      playerObj: "",
      osType: ROAST_CONFIG.OS_TYPE
    }
  },
  created() {
    this.$root.$on('liveStreamPayload', this.onLiveStreamPayload);
    if (this.uuid) {
      this.loadAndPlay(this.uuid);
    }
  },
  beforeDestroy() {
    this.$root.$off('liveStreamPayload', this.onLiveStreamPayload);
  },
  methods: {
    onLiveStreamPayload(payload) {
      this.applyStream(payload);
    },

    loadAndPlay(uuid) {
      this.loadInitialLiveStream(uuid);
    },

    playByUuid(uuid) {
      return this.loadInitialLiveStream(uuid);
    },

    applyStream(payload) {
      if (!payload || !payload.video) return;
      this.url = payload.video;
      this.poster = payload.poster || '';
      this.matchUuid = payload.uuid || '';
      this.playVideo();
    },

    playVideo() {
      if (!this.url) return;
      if (this.osType == 1) {
        this.playerObj = new Player.VideoPlayer();
        this.playerObj.open(this.url);
        this.playerObj.play();
      }
    },

    stop() {
      if (this.playerObj) {
        this.playerObj.stop();
      }
    }
  }
}
</script>

<style scoped>
.videoParent {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
  z-index: 10;
  border: 1px solid transparent;
}

.playBox {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
}
</style>
