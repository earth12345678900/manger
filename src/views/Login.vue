<template>
  <div class="login">
    <!-- 账号 -->
    <el-form :model="user" label-width="80px">

      <el-form-item label="账号">
        <el-input v-model="user.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码">
      <el-input v-model="user.password" placeholder="请输入密码" type='password' show-password></el-input>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
  .login {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .form {
      width: 400px;
      height: 240px;
      border: 1px solid #000;
      padding: 20px;
    }
  }
</style>
