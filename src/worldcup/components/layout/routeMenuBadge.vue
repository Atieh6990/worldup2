<template>
  <div class="routeMenuBadge">
    <img class="iconHover menuHoverSlide" :src="hoverIcon" alt="">
    <div class="menuIconSlot">
      <img class="menuIcon" :src="iconSrc" alt="">
    </div>
    <div class="menuLabel">{{ menuItem.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MENU_HOVER_ICON, getMenuIconPath } from '../../js/menuIcons'
import { ROAST_CONFIG } from '../../js/config'

export default {
  name: 'routeMenuBadge',
  data() {
    return {
      hoverIcon: MENU_HOVER_ICON,
    }
  },
  computed: {
    ...mapGetters(['getMenu']),
    menuItem() {
      const stored = this.getMenu || {}
      if (stored.name) return stored
      return this.menuItemFromRoute() || stored
    },
    iconSrc() {
      const id = this.menuItem.id
      return id !== '' && id !== undefined
        ? getMenuIconPath(id)
        : getMenuIconPath(0)
    },
  },
  methods: {
    menuItemFromRoute() {
      const path = this.$route.path.replace(/\/$/, '')
      return ROAST_CONFIG.menuItems.find((item) => {
        const rout = item.rout.replace(/\/$/, '')
        return path === rout || path.endsWith('/' + rout.split('/').filter(Boolean).pop())
      })
    },
  },
}
</script>

<style scoped>
.routeMenuBadge {
  position: relative;
  height: 89px;
  flex-shrink: 0;
  width: 100%;
  direction: rtl;
  pointer-events: none;
  overflow: hidden;
}

.iconHover {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
  display: block;
}

.menuIconSlot {
  position: absolute;
  right: 38px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  line-height: 0;
}

.menuIcon {
  display: block;
}

.menuLabel {
  position: absolute;
  right: 122px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #FFFFFF;
  text-align: right;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
