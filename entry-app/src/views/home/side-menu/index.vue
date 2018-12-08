<template>
  <section class="container">
    <el-aside class="aside" width="185px">
      <el-menu class="aside-menu"
               :default-openeds="['1']"
               default-active="1-1"
               background-color="#f7f7f7"
               text-color="#919ea8"
               active-text-color="#2b4659"
               :unique-opened="true">
        <el-submenu class="sub-menu" index="2">
          <template slot="title"><i class="el-icon-menu"></i>menu</template>
          <el-menu-item-group>
            <router-link v-for="r in routes"
                         :key="r.name"
                         :to="r.name"
                         class="link">
              <el-menu-item class="menu-item" index="1-1">
                {{ r.title }}
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </section>
</template>
<script>
export default {
  data() {
    return {
      routes: [
        { name: '/sub-app-td', title: 'sub-app-td.test' },
        { name: '/sub-app-old', title: 'sub-app-old' },
        { name: '/notFound', title: 'notFound' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .aside {
    line-height: 200px;
    padding-top: 50px;
    background-color: #f7f7f7;
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
