<script>
import SidebarNav from './components/sidebar/SidebarNav.vue';
import { SidebarWidth } from './components/sidebar/state';

export default {
  components: { SidebarNav },
  setup() {
    return { SidebarWidth }
  }
}


</script>

<template>
  <sidebarNav />
<div :style="{ 'margin-left': SidebarWidth}">
  <router-view />
</div>
</template>

<style scoped></style>
