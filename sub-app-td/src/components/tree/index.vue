<template>
  <div class="label-wrapper" @click="toggleChildren">
    <el-checkbox
        v-if="nodes && label"
        :style="indent"
        :class="labelClasses"
        class="trunk"
        v-model="checked"
        :disabled="disabled"
        :label="$t(`authRole.${label}`)" name="">
    </el-checkbox>
    <section class="branch">
      <tree
          v-if="showChildren"
          v-for="node in nodes"
          :nodes="node.nodes"
          :label="node.name"
          :is-checked="node.isSelected"
          :is-disabled="node.isDisabled"
          :depth="depth + 1"
          :key="node.id">
      </tree>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'tree',
    props: [ 'nodes', 'label', 'isChecked', 'isDisabled', 'depth' ],
    data() {
      return {
        checked: this.isChecked,
        disabled: this.isDisabled,
        showChildren: true,
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
        return { 'has-children': this.nodes && this.nodes.length }
      },
      indent() {
        // return { transform: `translate(${this.depth * 90}px)` }
      },
    },
    methods: {
      toggleChildren() {
        // this.showChildren = !this.showChildren;
      }
    },
  };
</script>

<style scoped>
  .label-wrapper{
    display: flex;
    align-items: center;
  }

  .trunk {
    flex: 0 0 150px;
  }

  .branch {
    flex: 0 0 150px;
    padding: 8px 0;
  }
</style>