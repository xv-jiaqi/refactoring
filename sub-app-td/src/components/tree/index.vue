<template>
  <div class="label-wrapper" @click="toggleChildren">
    <div :style="indent" :class="labelClasses" class="trunk">
      <el-checkbox v-if="nodes && label" :label="$t(`authRole.${label}`)" name=""></el-checkbox>
    </div>
    <div class="branch">
      <tree
          v-if="showChildren"
          v-for="node in nodes"
          :nodes="node.nodes"
          :label="node.name"
          :depth="depth + 1"
          :key="node.id">
      </tree>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tree',
    props: [ 'nodes', 'label', 'depth' ],
    data() {
      return {
        showChildren: true
      }
    },
    computed: {
      iconClasses() {
        return {
          'fa-plus-square-o': !this.showChildren,
          'fa-minus-square-o': this.showChildren
        }
      },
      labelClasses() {
        return { 'has-children': this.nodes }
      },
      indent() {
        return { transform: `translate(${this.depth * 90}px)` }
      },
    },
    methods: {
      toggleChildren() {
        this.showChildren = !this.showChildren;
      }
    },
  };
</script>

<style scoped>
  .label-wrapper{
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
</style>