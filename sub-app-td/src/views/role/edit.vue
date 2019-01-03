<template>
  <section class="role">
    <h6>角色管理</h6>
    <br><br>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="最多64个字符"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description" placeholder="最多128个字符"></el-input>
      </el-form-item>
      <el-form-item label="权限配置" prop="permissions">
        <Tree
            :nodes="form.permissions"
            :depth="0"
            :label="''">
        </Tree>
      </el-form-item>
    </el-form>
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
          permissions: {},
        },
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' },
            { min: 1, max: 64, message: '最多64个字符', trigger: 'change' },
          ],
          description: [
            { min: 0, max: 128, message: '最多128个字符', trigger: 'change' }
          ],
          permissions: [
            // { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
          ],
        }
      }
    },
    created() {
      roleService.getAllRole().then(({ data }) => {
        this.form.permissions = data;
      });
    }
  };
</script>

<style scoped>

</style>