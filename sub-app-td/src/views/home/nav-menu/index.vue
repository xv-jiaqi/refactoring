<template>
  <el-header class="header">
    <img :src="logoSrc" class="logo-page" alt="logo page">
    <slot name="handle"></slot>
    <el-dropdown class="dropdown-menu"
                 @command="handleCommand"
                 @visible-change="dropdownIconChange"
                 trigger="hover"
                 size="medium"
                 :show-timeout="100"
                 placement="bottom">
      <span class="dropdown-link">{{$t('home.welcome')}}, {{username}}</span>
      <i class="el-icon-arrow-down dropdown-icon" :class="{'dropdown-active': isActive}"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in dropList" :key="item.key"
                          class="dropdown-item"
                          :command="item.callback"
                          :divided="index !== 0">
          {{item.text}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  props: {
    logoSrc: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    dropList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    handleCommand(command) {
      if (typeof command === 'function') command.bind(this)();
    },
    dropdownIconChange(isActive) {
      this.isActive = isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    background-color: #0C3569;
    height: 65px;
    align-items: center;
    display: flex;
    padding: 0 15px;
  }

  .logo-page {
    height: 60%;
    min-width: 10em;
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
    color: $white;
    font-size: 12px;
    display: inline-block;
    padding: 5px 0;
    cursor: pointer;
    text-align: center;
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

  @media screen and (max-width: $screen-xs-max) {
    .logo-page {
      display: none;
    }
  }
</style>