<template>
  <div>LIST</div>
</template>

<script>
export default {
  name: 'list',
  methods: {
    goNew() {
      this.$router.push({ name: 'sub-app-td.role', params: { type: 'new' } });
    },
    goEdit() {
      this.$router.push({ name: 'sub-app-td.role', params: { type: 'detail', id: 588 } });
    },
  },
};
</script>

<style scoped></style>
