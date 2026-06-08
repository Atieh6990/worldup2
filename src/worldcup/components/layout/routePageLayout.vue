<template>
  <div class="routePage">
    <div class="posterWrap" v-if="$slots.poster || posterSrc">
      <slot name="poster">
        <img v-if="posterSrc" class="posterImg" :src="posterSrc" alt="">
      </slot>
    </div>
    <route-menu-badge />
    <div class="routeBody">
      <slot />
    </div>
  </div>
</template>

<script>
import routeMenuBadge from './routeMenuBadge'

export default {
  name: 'routePageLayout',
  components: { routeMenuBadge },
  props: {
    posterSrc: {
      type: String,
      default: '',
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
  flex-shrink: 0;
  width: 100%;
  line-height: 0;
  font-size: 0;
  margin: 0;
  padding: 0;
}

.posterWrap ::v-deep img,
.posterWrap ::v-deep .backImg,
.posterImg {
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
  overflow: hidden;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: column;
}
</style>
