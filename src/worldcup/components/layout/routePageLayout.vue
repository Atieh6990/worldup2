<template>
  <div class="routePage">
    <div class="posterWrap" v-if="!hidePoster">
      <slot name="poster">
        <home-poster />
      </slot>
    </div>
    <route-menu-badge />
    <div class="routeBody" :class="{ routeBodyStandard: contentInset }">
      <slot />
    </div>
  </div>
</template>

<script>
import routeMenuBadge from './routeMenuBadge'
import homePoster from './homePoster'

export default {
  name: 'routePageLayout',
  components: { routeMenuBadge, homePoster },
  props: {
    hidePoster: {
      type: Boolean,
      default: false,
    },
    contentInset: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>
.routePage {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 1080px;
  background: transparent;
  direction: rtl;
  overflow: hidden;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: column;
}

.posterWrap {
  position: relative;
  z-index: 3;
  flex-shrink: 0;
  width: 100%;
  line-height: 0;
  font-size: 0;
  margin: 0;
  padding: 0;
}

.posterWrap ::v-deep .homePoster > .posterImg,
.posterWrap ::v-deep .posterSection .posterImg,
.posterWrap ::v-deep .backImg {
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
  vertical-align: top;
}

.routeBody {
  flex: 1;
  min-height: 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: transparent;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: column;
}

.routeBodyStandard {
  padding-top: 8px;
  padding-bottom: 8px;
  box-sizing: border-box;
}
</style>
