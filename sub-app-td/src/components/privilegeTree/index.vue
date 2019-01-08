<template>
  <section class="tree">
    <Tree :nodes="treeData"></Tree>
  </section>
</template>

<script>
import Tree from '@/components/tree/';

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
    this.$bus.on('toggle-tree', data => {
      const { id, isChecked, isSelected, name, order_id, pid, sn, nodes, depth, indexs } = data;
      const isChange = isChecked !== isSelected;

      nodes.forEach((node, index) => {
        data.nodes[index].isSelected = isChecked;
        // this.$set(this.treeData, index, { ...node, isSelected: isChecked })
      });

      console.log(indexs, name, this.treeData);

      let node = indexs.reduce((pre, cur) => {
        return pre.nodes[cur]
      }, { nodes: this.treeData });

      console.log('res: ', node);

      this.$forceUpdate();

      this.$nextTick(() => {
        nodes.forEach((node, index) => {
          data.nodes[index].isSelected = isChecked;
        });
      });

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