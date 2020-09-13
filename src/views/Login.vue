<template>
  <div class="login">
    <!-- 账号 -->
    <el-form :model="user" label-width="80px" :rules="rules" ref="form">

      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input v-model="user.password" placeholder="请输入密码" type='password' show-password @keyup.enter.native="login"></el-input>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="reset">重置</el-button>
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
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { pattern: /^\d{5,11}$/, message: '5到11位数字', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { pattern: /^[a-z0-9A-Z]{3,12}$/, message: '密码是3-12位', trigger: 'change' }
        ]
      }
    }
  },
  created () {},
  methods: {
    // 表单校验
    async login () {
      try {
        // validate 对整个表单进行校验
        await this.$refs.form.validate()
      } catch {
        return console.log('校验失败')
      }
      // 发送请求
      const res = await this.$axios.post('login', this.user)
      const { statusCode, message, data } = res
      if (statusCode === 200) {
        this.$message.success(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$router.push('/')
      } else {
        this.$messsage.error(message)
      }
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
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
