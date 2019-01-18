<template>
  <section class="container">
    <el-aside class="aside" width="190px">
      <el-menu
        class="aside-menu"
        :default-openeds="['0']"
        default-active="0-0"
        background-color="#f7f7f7"
        text-color="#919ea8"
        active-text-color="#2b4659"
        :unique-opened="true"
        @select="handleSelect"
        :router="true"
      >
        <template v-for="(rGroup, $index) in routerGroup">
          <el-submenu
            v-if="(rGroup.children || []).length"
            class="sub-menu"
            :key="$index"
            :route="{ path: rGroup.path }"
            :to="rGroup.path || rGroup.children[0].path"
            :index="$index.toString()"
          >
            <template slot="title">
              <v-icon :name="rGroup.icon" class="icon"></v-icon><span>{{ rGroup.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="menu-item"
                v-for="(r, $i) in rGroup.children"
                :key="`${index}${i}`"
                :route="{ path: r.path }"
                :index="`${$index}-${$i}`"
              >
                {{ r.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            v-else
            class="sub-menu"
            :key="$index"
            :index="$index.toString()"
          >
            <v-icon :name="rGroup.icon" class="icon"></v-icon>
            <span slot="title">{{ rGroup.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </section>
</template>
<script>
import navMenu from './navMenu';
export default {
  data() {
    return {
      routerGroup: navMenu,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  z-index: 10;
}

.aside {
  line-height: 200px;
  padding-top: 50px;
  background-color: #f7f7f7;
  height: calc(100vh - 65px);
}

.aside-menu {
  border-right-width: 0;
}

.menu-item {
  /*min-width: 185px;*/
  &.is-active {
    font-weight: bolder;
  }
}

.sub-menu {
  border-bottom: 1px solid #e1e1e1;
  border-top: 1px solid #fff;
  margin: 0 1em;
}

.icon {
  vertical-align: text-top;
  margin-right: 5px;
}

// 等待官方扩展，直接使用其内部 class 不推荐
.el-menu-item-group__title {
  display: none;
}

// 等待官方扩展，直接使用其内部 class 不推荐
.el-submenu__icon-arrow {
  font-weight: 900;
  font-size: 16px;
}
</style>
