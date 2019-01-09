<template>
  <section class="tree">
    <Tree :nodes="treeData"></Tree>
  </section>
</template>

<script>
import Tree from '@/components/tree/';
import Vue from 'vue';
const { recursiveLoop } = Vue.prototype.$util;

export default {
  name: 'privilegeTree',
  components: {
    Tree,
  },
  props: {
    treeData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      changedData: new Set(),
    };
  },
  mounted() {
    this.$bus.on('toggle-tree', changeData => {
      const { id, isChecked, isSelected, name, order_id, pid, sn, nodes, depth, indexs } = changeData;
      console.log(isChecked);
      const isChange = isChecked !== isSelected;

      nodes.forEach(node => {
        node.isSelected = isChange;
      });

      recursiveLoop(nodes, null, 'nodes', node => {
        return Object.assign(node, { isSelected: isChange })
      });

      console.log('treedata', this.treeData);

      if (isChange) {
        this.changedData.add(sn);
      } else {
        if (this.changedData.has(sn)){
          this.changedData.delete(sn);
        }
      }

      this.$emit('changed-data', [...this.changedData]);
    });
  },
  beforeDestroy() {
    this.$bus.off('toggle-tree');
  },
  created() {
    // console.log(Array.isArray(this.treeData))
  },
};
</script>

<style scoped>

</style>