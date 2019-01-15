<template>
  <div>
    <button @click="goNew">NEW</button>
    <button @click="goEdit">DETAIL</button>
  </div>

</template>

<script>
  export default {
    name: 'list',
    methods: {
      goNew() {
        this.$router.push({name: 'sub-app-td.role', params: {type: 'new'}})
      },
      goEdit() {
        this.$router.push({name: 'sub-app-td.role', params: {type: 'detail', id: 588}})
      }
    }
  };
</script>

<style scoped>

</style>