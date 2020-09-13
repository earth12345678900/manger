<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <!-- 导航菜单 -->
            <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
            <!-- $route.path 对应的页面高亮 -->
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :router="true"
            >
              <!-- <el-submenu index="1">
                <template #title>
                    <i class="el-icon-menu"></i>
                    <span>导航二</span>
                </template> -->
                <el-menu-item index="/">
                  <template #title>
                    <i class="el-icon-message-solid"></i>
                    <span>文章列表</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/publish">
                  <i class="el-icon-menu"></i>
                  <span slot="title">发布文章</span>
                </el-menu-item>
              <!-- </el-submenu> -->
            </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          <div class="info">
            <img v-if="user.head_img" :src="$axios.defaults.baseURL + user.head_img" alt="">
            <span>{{user.nickname}}</span>
          </div>
          <div class="logout">
            <a href="#" @click.prevent="logout">退出</a>
          </div>
        </el-header>
        <el-main>
          <!-- 嵌套路由路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.user = data
        console.log(this.user)
        console.log(this.$route)
      }
    },
    async logout () {
      try {
        await this.$confirm('你确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch {
        return this.$message('操作取消')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$message.success('成功退出')
    }
  }
}
</script>

<style lang='scss' scoped>
.el-aside {
  background-color: #545c64;
  .logo {
    width: 200px;
    height: 60px;
    background-color: #333333;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
  }
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.el-main {
  background-color: #e9eef3;
}
.index {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
