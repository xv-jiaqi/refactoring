<template>
  <el-container>
    <el-header :style="header">
      <img src="@/assets/images/home/logo_page.zh_CN.png" class="logo_page">
      <section class="slot">
        <svg-icon iconName="email" class="icon-email"></svg-icon>
        <el-button class="lang-btn" size="small">ENGLISH</el-button>
      </section>
      <el-dropdown class="dropdown-menu"
                   @command="handleCommand"
                   @visible-change="dropdownIconChange"
                   trigger="hover"
                   size="medium"
                   :show-timeout="100"
                   placement="bottom">
        <span class="dropdown-link">欢迎您, cgadmin_f</span>
        <i class="el-icon-arrow-down dropdown-icon" :class="{'dropdown-active': isActive}"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="dropdown-item" command="个人信息">个人信息</el-dropdown-item>
          <el-dropdown-item class="dropdown-item" command="修改密码" divided>修改密码</el-dropdown-item>
          <el-dropdown-item class="dropdown-item" command="退出账号" divided>退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container :style="mainContainer">
      <el-aside class="aside-menu" width="185px">
        <el-menu
                 :default-openeds="['1']"
                 default-active="1-1"
                 background-color="#f7f7f7"
                 text-color="#919ea8"
                 active-text-color="#2b4659"
                 :unique-opened="true">
          <el-submenu class="sub-menu" index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <el-menu-item class="menu-item" index="1-1">选项1</el-menu-item>
              <el-menu-item class="menu-item" index="1-2">选项2</el-menu-item>
              <el-menu-item class="menu-item" index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu class="sub-menu" index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <el-menu-item class="menu-item" index="2-1">选项1</el-menu-item>
              <el-menu-item class="menu-item" index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu class="sub-menu" index="3">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <el-menu-item class="menu-item" index="2-1">选项1</el-menu-item>
              <el-menu-item class="menu-item" index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu class="sub-menu" index="4">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <el-menu-item class="menu-item" index="2-1">选项1</el-menu-item>
              <el-menu-item class="menu-item" index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main-container">
        <section>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    const height = 65;
    return {
      tableData: Array(20).fill(item),

      header: {
        'height': `${height}px`,
        'backgroundColor': '#0C3569',
        'align-items': 'center',
        'display': 'flex',
        'padding': '0 15px',
      },

      mainContainer: {
        'height': `calc(100vh - ${65}px)`,
      },

      isActive: false,
    };
  },
  methods: {
    handleCommand(command) {
      this.$message(`click on item ${command}`);
    },
    dropdownIconChange(isActive) {
      this.isActive = isActive;
    },
  },
};
</script>
<style lang="less">
  .el-header {
    background-color: #B3C0D1;
  }

  .el-aside {
    background-color: #D3DCE6;
    line-height: 200px;
  }

  .main-container {
    border-bottom-left-radius: 5px;
  }

  .logo_page {
    height: 60%;
  }

  .slot {
    flex: auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
  }

  .lang-btn {
    font-weight: bold;
    background-color: #fff;
    color: #0090c8;
    width: 80px;
    height: 30px;
    margin-right: 30px;
  }

  .aside-menu {
    background-color: #f7f7f7;
    padding-top: 50px;
  }

  .dropdown-menu {
    width: 155px;
    border-left: 1px solid #4c555e;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dropdown-link {
    color: #fff;
    font-size: 12px;
  }

  .dropdown-icon {
    color: #fff;
    font-weight: bolder;
    padding: 10px;
    transition: transform .4s;
    transform: rotate(-180deg);
  }

  .dropdown-active {
    transform: rotate(0deg);
  }

  .dropdown-item {
    width: 140px;
    text-align: center;
    font-size: 14px;
  }

  .icon-email {
    margin-right: 30px;
  }

  .menu-item {
    /*min-width: 185px;*/

    &.is-active {
      font-weight: bolder;
    }
  }

  .sub-menu {
    border-bottom: 1px solid #e1e1e1;
    margin: 0 1em;
  }

  @media screen and (max-width: 720px) {
    .logo_page {
      display: none;
    }

    .slot {
      justify-content: left;
    }
  }
</style>
