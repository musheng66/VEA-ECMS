<template>
	<div id="app">
    <transition name="fade" mode="out-in">
		  <router-view></router-view>
    </transition>
	</div>
</template>

<script>
  export default{
    name: 'App',

    created () {
    },

    mounted () {
      document.getElementById('loading-area').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "styles/variables";

  @media (max-width: #{$responsive-width-xs}) {

    #app {
      min-width: $responsive-width-xs;
    }
  }
</style>
