<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 列表 -->
    <el-card>
      <el-table :data="list" style="width: 100%" stripe border>
        <el-table-column align="center" type="index" :index='indexMethod' label="序号" width="100"></el-table-column>
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="user.nickname" label="作者"></el-table-column>
        <!-- <el-table-column prop="create_date" label="创建时间"></el-table-column> -->
        <el-table-column label="创建时间">
          <template v-slot="scope">
            {{scope.row.create_date | time}}
          </template>
        </el-table-column>

        <!-- <el-table-column prop="cover[0].url" label="封面"> -->
        <el-table-column label="封面" align="center">
          <!-- 使用作用域插槽 -->
          <template v-slot="scope">
            <!-- <el-button>{{scope.row}}</el-button> -->
            <img :src="$url(scope.row.cover[0].url)" alt="">
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <el-button type="primary">编辑</el-button>
          <el-button>删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
        <el-pagination
        layout="total,sizes,prev, pager, next,jumper"
        :total="total"
        :page-size="pageSize"
        :page-sizes="[5,10,15]"
        :current-page="pageIndex"
        background
        @current-change='currentChange'
        @size-change='sizeChange'
        ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      // 总文章数量
      total: 0
    }
  },
  created () {
    this.getPostList()
  },
  methods: {
    async getPostList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data, total } = res
      if (statusCode === 200) {
        this.list = data
        this.total = total
        console.log(this.list)
      }
    },
    currentChange (value) {
      this.pageIndex = value
      this.getPostList()
    },
    sizeChange (value) {
      // console.log(value)
      this.pageSize = value
      this.getPostList()
    },
    indexMethod (index) {
      // 前面的总条数
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-card {
    margin-top: 20px;
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
