export default [
  {
    title: '首页',
    icon: 'home',
    path: '/sub-app-old/home.list',
  },
  {
    title: 'HOME',
    icon: 'home',
    children: [
      { title: '新建角色', path: '/sub-app-td/role/new' },
      { title: '编辑角色', path: '/sub-app-td/role/edit/588' },
      { title: '角色详情', path: '/sub-app-td/role/detail/588' },
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
];
