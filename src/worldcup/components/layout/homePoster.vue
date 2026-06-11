<template>
  <div class="homePoster">
    <img class="posterImg" :src="wImg('menuSlide.png')" alt="">
    <div class="brandGroup">
      <img class="goalGif" :src="wImg('goal.gif')" alt="">
      <img class="samLogo" :src="samLogo" alt="">
    </div>
  </div>
</template>

<script>
import func from '../../mixins/mixin'
import { getSamLogoPath } from '../../js/menuIcons'

export default {
  name: 'homePoster',
  mixins: [func],
  data() {
    return {
      samLogo: getSamLogoPath(),
    }
  },
}
</script>

<style scoped>
.homePoster {
  position: relative;
  width: 100%;
  line-height: 0;
  font-size: 0;
}

.posterImg {
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}

.brandGroup {
  position: absolute;
  top: 190px;
  right: 50px;
  width: 125px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  direction: ltr;
  display: -webkit-flex !important;
}

.goalGif {
  position: absolute;
  top: 10px;
  left: 0;
  width: 60px;
  height: auto;
  flex-shrink: 0;
}

.samLogo {
  position: absolute;
  top: 10px;
  right: 0;
  width: 95px;
  height: auto;
  margin-top: 1px;
  flex-shrink: 0;
}
</style>
