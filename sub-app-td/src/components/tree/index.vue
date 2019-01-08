<template>
  <div class="label-wrapper" @click.stop="toggleChildren">
    <el-checkbox
        v-if="nodes && label"
        :style="indent"
        class="trunk"
        v-model="checked"
        :disabled="isDisabled"
        @change="handleCheckedChange"
        :label="$t(`authRole.${label}`)" name="">
    </el-checkbox>
    <section class="branch">
      <tree
          v-for="(node, $index) in nodes"
          :nodes="node.nodes"
          :label="node.name"
          :is-checked="node.isSelected"
          :is-disabled="node.isDisabled"
          :res-data="node"
          :indexs="[...indexs, $index]"
          :depth="depth + 1"
          :key="node.id">
      </tree>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'tree',
    props: {
      nodes: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        default: '',
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      depth: {
        type: [Number, String],
        default: 0,
      },
      indexs: {
        type: Array,
        default: () => ([]),
      },
      resData: {
        type: Object,
        default: () => {},
      },
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    data() {
      return {
        checked: this.isChecked,
      }
    },
    computed: {
      indent() {
        // return { transform: `translate(${this.depth * 90}px)` }
      },
    },
    methods: {
      toggleChildren() {
        // this.showChildren = !this.showChildren;
      },
      handleCheckedChange(checkStatus) {
        this.$bus.emit('toggle-tree', {
          ...this.resData,

          isChecked: checkStatus,
          depth: this.depth,
          indexs: this.indexs,
        });
      },
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