<template>
  <section class="role">
    <section class="header"><h6>角色管理</h6></section>
    <section class="content">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="最多64个字符" :disabled="isPreview"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="form.description"
            placeholder="最多128个字符"
            :disabled="isPreview"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限配置" prop="permissions">
          <privilege-tree
            @changed-data="changeData"
            :init-selected="sns"
            :tree-data="form.privileges"
          >
          </privilege-tree>
        </el-form-item>
      </el-form>
    </section>
    <section class="footer">
      <el-button size="small" @click="cancel"> 返 回 </el-button>
      <el-button
        size="small"
        type="primary"
        @click="confirm"
        :disabled="isConfirmValid"
        v-if="!isPreview"
      >
        确 定
      </el-button>
    </section>
  </section>
</template>

<script>
// import * as types from '@/store/types/roleTypes';
import roleService from '@/services/role';
import privilegeTree from '@/components/privilegeTree';
import pageTypeMap from './pageMap';
import Vue from 'vue';
const { treeTraversal } = Vue.prototype.$util;

export default {
  name: 'item',
  components: {
    privilegeTree,
  },
  data() {
    return {
      pageType: this.$route.params.type,
      id: this.$route.params.id,
      pageTypeMap: new Map(Object.entries(pageTypeMap)),
      sns: [],

      form: {
        name: '',
        description: '',
        privileges: [],
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 64, message: '最多64个字符', trigger: 'change' },
        ],
        description: [{ min: 0, max: 128, message: '最多128个字符', trigger: 'change' }],
      },
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        const { type: pageType, id } = newVal.params;
        this.pageType = pageType;
        this.id = id;

        this.isPreview = this.pageType === this.pageTypeMap.get('DETAIL');
        this.init();
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      const requestQuery = [roleService.getAllPrivilege()];

      switch (this.pageType) {
        case this.pageTypeMap.get('NEW'):
          break;
        case this.pageTypeMap.get('EDIT'):
        case this.pageTypeMap.get('DETAIL'):
        default:
          requestQuery.push(roleService.getSelectedPrivilege({ id: this.id }));
      }

      Promise.all(requestQuery).then(([{ data }, { data: { sns = [], name, desc } = {} } = {}]) => {
        this.form.name = name;
        this.form.description = desc;
        this.sns = sns;

        this.form.privileges = treeTraversal(data, 'nodes', (node, parentNode) => {
          const { sn } = node;

          return Object.assign(node, {
            parentNode,
            isSelected: sns.includes(sn),
            isDisabled: this.isPreview,
          });
        });
      });
    },
    confirm() {
      const { name, description: desc } = this.form;
      const { id, sns } = this;

      let params = { name, desc, sns };

      switch (this.pageType) {
        case this.pageTypeMap.get('EDIT'):
          params = { ...params, id };

          roleService.editRole(params).then(({ result, error_info: errorInfo }) => {
            if (result === 0) {
              this.$message({
                message: this.$t('roleManage.editSuccessInfo'),
                type: 'success',
              });
            }
          });
          break;
        case this.pageTypeMap.get('NEW'):
          roleService
            .createRole(params)
            .then(({ result, error_info: errorInfo }) => {
              if (result === 0) {
                this.$message({
                  message: this.$t('roleManage.createSuccessInfo'),
                  type: 'success',
                });
              } else {
                this.$message({
                  message: errorInfo,
                  type: 'error',
                });
              }
            })
            .catch(e => {
              debugger;
            });
          break;
        case this.pageTypeMap.get('DETAIL'):
        default:
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    changeData(changedData) {
      this.sns = changedData;
      console.log('changedData', changedData);
    },
  },
  computed: {
    isConfirmValid() {
      switch (this.pageType) {
        case 'new':
          return !this.form.name;
      }
    },
  },
};
</script>

<style scoped>
.role {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.header,
.footer {
  flex: none;
}

.content {
  flex: auto;
}

.header,
.footer {
  padding: 1em;
  margin-left: 1em;
  margin-right: 1em;
}

.header {
  box-shadow: #9c9a9a 0 4px 7px -6px;
  margin-top: 0;
  margin-bottom: 2em;
}

.footer {
  box-shadow: #9c9a9a 0 -3px 7px -5px;
  margin-top: 2em;
  margin-bottom: 1em;

  bottom: 0;
}
</style>
