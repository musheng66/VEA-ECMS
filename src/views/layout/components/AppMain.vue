<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../../styles/variables";

  section.app-main {
    padding: $appmain-padding;
    height: calc(100vh - #{$navbar-height});
    overflow: auto;
    overflow-x: hidden;
    width: 100%;
  }
</style>
