<template>
  <div class="groupParent">
    <flickity class="flickity suggestedProgram" ref="flickity" :options="flickityOptions" v-if="groups.length > 0"
      @init="onFlickityInit">

      <div v-for="(item, index) in groups" :id="'groupItem_' + index" :key="'group_' + index"
        :class="['items', isDayActive(index) ? 'selectedNav' : '']">
        {{ item }}
      </div>

    </flickity>

  </div>
</template>

<script>
import Flickity from 'vue-flickity';

export default {
  props: ['yPos', 'groups'],
  name: "groups",
  components: { Flickity },
  data() {
    return {
      xItem: 0,
      selectedTab: -1,
      _syncTimer: null,
      flickityOptions: {
        accessibility: false,
        contain: true,
        draggable: false,
        freeScroll: false,
        adaptiveHeight: false,
        prevNextButtons: false,
        pageDots: false,
        rightToLeft: true
      },
    }
  },

  beforeDestroy() {
    clearTimeout(this._syncTimer)
  },

  watch: {
    groups() {
      const safeIndex = Math.max(0, Math.min(this.xItem, this.groups.length - 1))
      if (safeIndex !== this.xItem) {
        this.setActiveIndex(safeIndex, this.selectedTab < 0)
      } else if (this.groups.length) {
        this.$nextTick(() => this.ensureScrollSync(this.xItem))
      }
    },
  },


  methods: {

    isDayActive(index) {
      if (this.yPos == 1) return this.xItem == index
      if (this.selectedTab < 0) return false
      return this.selectedTab == index
    },

    onFlickityInit() {
      this.$nextTick(() => this.ensureScrollSync(this.xItem))
    },

    clampIndex(index) {
      if (!this.groups.length) return 0
      return Math.max(0, Math.min(index, this.groups.length - 1))
    },

    scrollToItem(index) {
      const flickity = this.$refs.flickity
      const safeIndex = this.clampIndex(index)
      if (!flickity || !this.groups.length) return

      clearTimeout(this._syncTimer)
      flickity.select(safeIndex, false, true)

      this._syncTimer = setTimeout(() => {
        this.ensureScrollSync(safeIndex)
      }, 16)
    },

    ensureScrollSync(index) {
      const flickity = this.$refs.flickity
      const safeIndex = this.clampIndex(index)
      if (!flickity) return

      if (flickity.selectedIndex() !== safeIndex) {
        flickity.select(safeIndex, false, true)
      }
    },

    setActiveIndex(index, skipHighlight) {
      if (!this.groups.length) return

      const safeIndex = this.clampIndex(index)
      this.xItem = safeIndex
      if (!skipHighlight) {
        this.selectedTab = safeIndex
      }

      this.$nextTick(() => {
        this.scrollToItem(safeIndex)
      })
    },

    resetParams() {
      this.setActiveIndex(0, true)
    },

    applySelection(index) {
      const safeIndex = this.clampIndex(index)
      this.xItem = safeIndex
      this.selectedTab = safeIndex
      this.scrollToItem(safeIndex)
      this.$emit('selectItem', safeIndex)
    },

    left() {
      if (this.xItem < this.groups.length - 1) {
        this.applySelection(this.xItem + 1)
        return true
      }
    },

    right() {
      if (this.xItem > 0) {
        this.applySelection(this.xItem - 1)
        return true
      }
    },

    down() {
      return false
    },

    up() {
      return false
    },

    enter() {
      this.selectedTab = this.xItem
      this.$emit("selectItem", this.xItem);
      return this.xItem
    }
  }
}
</script>

<style scoped>
.groupParent {
  width: 332px;
  right: 7px;
  height: 48px;
  top: 0;
  margin-top: 20px;
  position: relative;
  direction: rtl;
  display: flex;
  justify-content: center;
  overflow: hidden;
  display: -webkit-flex !important;
  ;

}

.flickity {
  height: 48px;
  width: 100%;
}

.groupParent>>>.flickity-slider {
  transition: none !important;
  transition-duration: 0s !important;
}

.groupParent>>>.flickity-viewport {
  height: 48px !important;
}

.items {
  float: right;
  box-sizing: border-box;
  height: 48px;
  line-height: 45px;
  font-size: 20px;
  color: #ffffff;
  z-index: 1;
  border-radius: 36px;
  margin-left: 15px;
  padding: 0 15px;
  text-align: center;
  background-color: #FFFFFF26;
  direction: rtl !important;
  width: 140px;
  border: 3px solid transparent;
}

.selectedNav {
  background: rgba(17, 109, 255, 1);
}
</style>
