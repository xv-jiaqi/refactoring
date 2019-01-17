<template>
  <section class="tree"><Tree :nodes="treeData"></Tree></section>
</template>

<script>
import Tree from '@/components/tree/';
import Vue from 'vue';
const { treeTraversal, treeOuterTraversal } = Vue.prototype.$util;

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
    initSelected: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    changedData() {
      return new Set(this.initSelected);
    },
  },
  mounted() {
    this.$bus.on('toggle-tree', changeData => {
      // eslint-disable-next-line
      const { id, isChecked, isSelected, name, pid, sn, nodes } = changeData;

      // 当前节点下行判断
      treeTraversal(nodes, 'nodes', node => {
        changedDataRepo.bind(this)(isChecked, node.sn);
        return Object.assign(node, { isSelected: isChecked });
      });

      // 当前节点上行判断
      treeOuterTraversal(changeData, 'parentNode', node => {
        if (isChecked) {
          changedDataRepo.bind(this)(true, node.sn);

          node.isSelected = true;
        } else {
          const isEmpty = node.nodes.filter(({ isSelected }) => isSelected);

          if (isEmpty.length === 0) {
            changedDataRepo.bind(this)(false, node.sn);

            node.isSelected = false;
          }
        }
      });

      function changedDataRepo(status, sn) {
        if (status) {
          this.changedData.add(sn);
        } else {
          if (this.changedData.has(sn)) {
            this.changedData.delete(sn);
          }
        }
      }

      this.$emit('changed-data', Array.from(this.changedData));
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

<style scoped></style>
