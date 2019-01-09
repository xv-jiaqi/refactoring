<template>
  <section class="role">
    <section class="header">
      <h6>角色管理</h6>
    </section>
    <section class="content">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="最多64个字符"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" placeholder="最多128个字符"></el-input>
        </el-form-item>
        <el-form-item label="权限配置" prop="permissions">
          <privilege-tree
              @changed-data="changeData"
              :tree-data="form.privileges">
          </privilege-tree>
        </el-form-item>
      </el-form>
    </section>
    <section class="footer">
      <el-button size="small" @click="cancel"> 返 回 </el-button>
      <el-button size="small" type="primary" @click="confirm" :disabled="isConfirmValid"> 确 定 </el-button>
    </section>
  </section>
</template>

<script>
  import * as types from '@/store/types/roleTypes';
  import roleService from '@/services/role';
  import privilegeTree from '@/components/privilegeTree/';
  import Vue from 'vue';

  const { recursiveLoop } = Vue.prototype.$util;

  export default {
    name: 'item',
    components: {
      privilegeTree,
    },
    data() {
      return {
        pageType: this.$route.params.type,

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
          description: [
            { min: 0, max: 128, message: '最多128个字符', trigger: 'change' }
          ],
          privileges: [
            // { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
          ],
        }
      }
    },
    created() {
      const getAllPrivilege = roleService.getAllPrivilege();
      const getSelectedPrivilege = roleService.getSelectedPrivilege({ id: 556 });

      const requestP = [ getAllPrivilege ];

      switch (this.pageType) {
        case 'new':
          break;
        case 'edit':
          requestP.push(getSelectedPrivilege);
          break;
      }

      Promise.all(requestP).then((
        [ { data },
          { data: { sns = []} = {} } = {},
        ]) => {
          this.form.privileges = recursiveLoop(data, null, 'nodes', (node, parentNode) => {
            const { sn } = node;

            return Object.assign(node, {
              parentNode,
              isSelected: sns.includes(sn),
              isDisabled: false,
            })
          });
      });
    },
    methods: {
      confirm() {
        if (this.pageType === 'new') {
          const { name, description: desc } = this.form;
          const params = { name, desc};

          roleService.createNewRole(params).then(res => {
            debugger
          }).catch(e =>{
            debugger
          })
        }
      },
      cancel() {
        this.$router.go(-1);
      },
      changeData(changedData) {
        // console.log('changedData', changedData);
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