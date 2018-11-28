<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in" />
  </div>
</template>

<script>
import loaderMixin from '@/loader-mixin';

export default {
  name: 'EntryApp',

  mixins: [loaderMixin],
};
</script>

<style lang="scss">
</style>
