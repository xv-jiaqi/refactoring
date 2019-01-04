<template>
  <section class="role">
    <section class="header">
      <h6>角色管理</h6>
    </section>
    <!--<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">-->
      <!--<el-form-item label="角色名称" prop="name">-->
        <!--<el-input v-model="form.name" placeholder="最多64个字符"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="角色描述" prop="description">-->
        <!--<el-input v-model="form.description" placeholder="最多128个字符"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="权限配置" prop="permissions">-->
        <!--<Tree-->
            <!--:nodes="form.privileges"-->
            <!--:depth="0"-->
            <!--:checked="true"-->
            <!--:label="''">-->
        <!--</Tree>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <section class="footer">
      <el-button size="small"> 返 回 </el-button>
      <el-button size="small" type="primary"> 确 定 </el-button>
    </section>
  </section>
</template>

<script>
  import * as types from '@/store/types/roleTypes';
  import roleService from '@/services/role';
  import Tree from '@/components/tree/';

  export default {
    name: 'edit',
    components: {
      Tree,
    },
    data() {
      return {
        form: {
          name: '',
          description: '',
          privileges: {},
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
      console.log(this.$route.params)
      const getAllPrivilege = roleService.getAllPrivilege();
      const getSelectedPrivilege = roleService.getSelectedPrivilege({ id: 556 });

      Promise.all([getAllPrivilege, getSelectedPrivilege]).then(([{ data }, { data: { sns = []}}]) => {
          this.form.privileges = recursive(data, 'nodes', item => {
            const { sn } = item;

            return {
              ...item,
              isSelected: sns.includes(sn),
              isDisabled: false,
            }
          });
      });

      function recursive(srcData, loopLey, f = f => f) {
        return srcData.map(item => {

          if (loopLey in item) {
            item[loopLey] = recursive(item[loopLey], loopLey, f);
          }

          return f(item);
        });
      }
    }
  };
</script>

<style scoped>
  .header {
    padding: 1em;
    box-shadow: #9c9a9a 0 4px 7px -6px;
    margin: 0 1em 2em;
  }

  .footer {
    padding: 1em;
    box-shadow: #9c9a9a 0 -3px 7px -5px;
    margin: 2em 1em 1em;

    position: absolute;
    /* width: 100%; */
    bottom: 0;
  }
</style>