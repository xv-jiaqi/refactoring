<template>
  <section class="container">
    <el-aside class="aside" width="190px">
      <el-menu class="aside-menu"
               :default-openeds="['0']"
               default-active="0-0"
               background-color="#f7f7f7"
               text-color="#919ea8"
               active-text-color="#2b4659"
               :unique-opened="true">
        <router-link v-for="(rGroup, $index) in routerGroup"
                     :key="'g' + $index"
                     :to="rGroup.path || rGroup.children[0].path">
          <el-submenu class="sub-menu" :index="$index.toString()">
            <template slot="title">
              <v-icon :name="rGroup.icon" class="icon"></v-icon>{{ rGroup.title }}
            </template>
            <el-menu-item-group>
              <router-link v-for="(r, $i) in rGroup.children"
                           :key="'r' + $i"
                           :to="{ path: r.path }">
                <el-menu-item class="menu-item" :index="`${$index}${$i}`">
                  {{ r.title }}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </router-link>
      </el-menu>
    </el-aside>
  </section>
</template>
<script>
export default {
  data() {
    return {
      routerGroup: [
        {
          title: 'HOME',
          icon: 'home',
          children: [
            { title: '新建角色', path: '/sub-app-td/role/new' },
            { title: '编辑角色', path: '/sub-app-td/role/edit/588' },
            { title: '角色详情', path: '/sub-app-td/role/detail/588' },
            { title: '角色列表', path: '/sub-app-td/role/list' },
            { title: 'sub-app-td.notFound', path: '/sub-app-td/abc' },
          ],
        },
        {
          title: '人群管理',
          icon: 'user',
          children: [
            { title: '自选人群包', path: '/sub-app-old/crowdManage.customCrowdPack' },
            { title: '私有人群包', path: '/sub-app-old/crowdManage.selfCrowdPack' },
            { title: 'LBS人群包', path: '/sub-app-old/crowdManage.lbsCrowdPack' },
            { title: '扩展人群包', path: '/sub-app-old/crowdManage.extendCrowdPack' },
          ],
        },
        {
          title: 'APP分析',
          icon: 'chart-area',
          path: '/sub-app-old/appAnalysis',
        },
        {
          title: 'CRM统计',
          icon: 'chart-pie',
          path: '/sub-app-old/crmCrowdManage.manage',
        },
        {
          title: '投放管理',
          icon: 'crosshairs',
          children: [
            { title: '推广计划', path: '/sub-app-old/task.campaign' },
            { title: '广告任务', path: '/sub-app-old/task.pushContent' },
            { title: '物料管理', path: '/sub-app-old/task.creative' },
            { title: '用户组管理', path: '/sub-app-old/usercrowd.list' },
          ],
        },
        {
          title: '数据统计',
          icon: 'chart-bar',
          children: [
            { title: '投放统计', path: '/sub-app-old/statisticsManage.campaignList' },
            { title: 'Admaster统计', path: '/sub-app-old/statisticsManage.admaster' },
          ],
        },
        {
          title: '人群包应用',
          icon: 'cubes',
          children: [
            { title: '审核列表', path: '/sub-app-old/crowd.list' },
            { title: '项目报表', path: '/sub-app-old/crowd.items' },
          ],
        },
        {
          title: '权限管理',
          icon: 'user-lock',
          children: [
            { title: '账号管理', path: '/sub-app-old/accountManage.account' },
            { title: '角色管理', path: '/sub-app-old/accountManage.usergroup' },
          ],
        },
        {
          title: '业务审核',
          icon: 'list-alt',
          children: [
            { title: '账号审核', path: '/sub-app-old/verify.account' },
            { title: '任务审核', path: '/sub-app-old/verify.task' },
            { title: '人群包操作审核', path: '/sub-app-old/verify.crowd' },
          ],
        },
        {
          title: '全部人群',
          icon: 'users',
          children: [
            { title: 'APP人群包管理', path: '/sub-app-old/allCrowdManage.appAnalysisManage' },
            { title: '自选人群包管理', path: '/sub-app-old/allCrowdManage.customCrowdManage' },
            { title: '私有人群包管理', path: '/sub-app-old/allCrowdManage.selfCrowdManage' },
            { title: 'LBS人群包管理', path: '/sub-app-old/allCrowdManage.lbsCrowdManage' },
            { title: '扩展人群包管理', path: '/sub-app-old/allCrowdManage.extendCrowdManage' },
            { title: 'allCrowdManage.recycle', path: '/sub-app-old/allCrowdManage.recycle' },
          ],
        },
        {
          title: '人群数据报表',
          icon: 'table',
          path: '/sub-app-old/crowdReport',
        },
      ],
    };
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
