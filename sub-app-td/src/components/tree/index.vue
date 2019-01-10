<template>
  <div class="label-wrapper"
       @click.stop="toggleChildren"
       :depth="depth"
       :index="index" :class="{'wrapper': depth === 1 }">
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
          :index="$index"
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
      index: {
        type: Number,
        default: 0,
      },
      resData: {
        type: Object,
        default: () => {},
      },
    },
    // model: {
    //   prop: 'checked',
    //   event: 'change'
    // },
    data() {
      return {
        checked: this.isChecked,
      }
    },
    watch: {
      isChecked: function (newVal) {
        this.checked = newVal;
      },
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
        this.resData.isChecked = checkStatus;

        this.$bus.emit('toggle-tree', this.resData);
      },
    },
  };
</script>

<style scoped>
  .label-wrapper{
    display: flex;
    align-items: center;
  }

  .wrapper:nth-of-type(odd) {
    background-color: #f6f6f6;
  }

  .trunk {
    flex: 0 0 150px;
  }

  .branch {
    flex: 0 0 150px;
    padding: 8px 0;
  }
</style>