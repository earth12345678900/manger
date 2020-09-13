<template>
  <div class="publish">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-form :model="post" label-width="80px">
        <!-- 文章标题 -->
        <el-form-item label="文章标题">
          <el-input placeholder="请输入文章标题" v-model="post.title"></el-input>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="文章内容">
          <quill-editor v-model="post.content"></quill-editor>
        </el-form-item>
        <!-- 栏目 -->
        <el-form-item label="栏目">
          <el-checkbox-group v-model="post.categories">
            <el-checkbox :label="item.id" name="type" v-for="item in tabList" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 封面 -->
        <!-- 这个借口自动发请求所以配请求头 -->
        <el-form-item label="封面">
          <el-upload
            action="/api/upload"
            list-type="picture-card"
            :headers="headers"
            :on-success='success'
            :on-remove='remove'
            multiple
            >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="publish">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      post: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      // 栏目数据
      tabList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res
      if (statusCode === 200) {
        // this.tabList = data
        this.tabList = data.filter(item => item.name !== '关注' && item.name !== '头条')
        console.log(this.tabList)
      }
    },
    success (res) {
      // function(response, file, fileList)
      const { statusCode, data } = res
      if (statusCode === 200) {
        // this.post.cover.push(data.url)
        this.post.cover.push(data)
      }
    },
    // 把数组转为对象的形式
    parseCategories (arr) {
      return arr.map(item => {
        return {
          id: item
        }
      })
    },
    async publish () {
      const res = await this.$axios.post('/post', {
        // 讲[4,5,6]转为[{id: 4},{id:5},{id:6}]
        // categories: this.parseCategories(this.poat.categories),
        // title: this.post.title
        ...this.post, // 五个属性展开 后讲原来的categories覆盖
        categories: this.parseCategories(this.post.categories)
      })
      console.log(res)
    },
    remove (file) {
      console.log(file)
      this.post.cover = this.post.cover.filter(item => item.id !== file.response.data.id)
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-card {
    margin-top: 20px;
    ::v-deep .ql-editor {
      height: 200px;
    }
    img {
      width: 200px;
      height: 120px;
      object-fit: cover;
    }
    .el-table {
      margin-bottom: 10px;
    }
  }
</style>
