<!-- 文章列表页面 -->
<template>
  <div class="articleList">
     <el-table :data="tableData" v-loading="loading"  stripe border style="width: auto;min-width: 1265px;">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="200" align="center"></el-table-column>
      <el-table-column prop="authorName" label="作者" width="150" align="center"></el-table-column>
      <el-table-column prop="abstract" label="摘要" width="300" align="center"></el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" width="200"  align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200" width="auto" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click="open5(scope.row.content,scope.row.title)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <paging v-on:jumpToPage="getdataByPage" v-bind:num="pagesNum" v-if="pagesNum > 0"/>

    <articleM  ref="articleM"   v-bind:msg="content" v-bind:title="title" />
  </div>
  
</template>

<script>
import paging from '../paging';
import article from './article';
export default{
  name: 'articleList',
  props: {
    msg: String
  },
  components: {
    paging,
    articleM: article
  },
  data(){
    return {
      tableData: [],
      loading: true,
      pagesNum: 0,
      hideBox: false,
      content: '',
      title: ''
    }
  },
  created(){
    this.getAdminList(1);
  },
  methods: {
    getAdminList(page){
      this.$http({
        method: 'POST',
        url: 'api/getArticleList.php',
        data: this.$qs.stringify({
          page: page
        })
      }).then((res) => {
        console.log(res);
        if(res.data.status == 90000){
          // this.$router.push('/index');
          this.tableData = res.data.params;
          this.pagesNum = res.data.nums
          this.loading = false;
          // alert(this.pagesNum)
        }
      })
    },
    dateFormat(row, column) {
        var date = row.createTime;
        // console.log(date);
        if (date == undefined) {
            return "";
        }
        return this.changeTime(date*1000);
    },
    changeTime(time) {
      let date = new Date(time);
      // console.log(time);
      let Y = date.getFullYear() + '.';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
      let D = date.getDate() + ' ';
      let h = (date.getHours() > 9 ? date.getHours() : "0"+ date.getHours() )+ ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y+M+D+h+m+s;
    },
    getdataByPage(res){
       console.log(res);
       this.loading = true;
       this.getAdminList(res);
    },
    open5(res,title) {
      this.content = res;
      this.title = title;
      // this.hideBox = true;
      this.$refs.articleM.show();
    },
    changeStatus(){

    }
  }
}  
</script>

<style scoped lang="scss">
.articleList{
  // position: absolute;
    // width: 100%;
    // top: 68px;
    // bottom: 0;
}
</style>