
<template>
  <div class="articleList">
     <el-table :data="tableData"  stripe border style="width: auto;min-width: 1265px;">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="200" align="center"></el-table-column>
      <el-table-column prop="authorName" label="作者" width="150" align="center"></el-table-column>
      <el-table-column prop="abstract" label="摘要" width="300" align="center"></el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" width="200"  align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200" width="auto" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>

<script>
export default{
  name: 'articleList',
  props: {
    msg: String
  },
  data(){
    return {
      tableData: []
    }
  },
  created(){
    this.getAdminList()
  },
  methods: {
    getAdminList(){
      this.$http({
        method: 'POST',
        url: 'api/getArticleList.php',
        data: this.$qs.stringify({
          page: 2
        })
      }).then((res) => {
        console.log(res);
        if(res.data.status == 90000){
          // this.$router.push('/index');
          this.tableData = res.data.params;
        }
      })
    },
    dateFormat(row, column) {
        var date = row.createTime;
        console.log(date);
        if (date == undefined) {
            return "";
        }
        return this.changeTime(date*1000);
    },
    changeTime(time) {
            let date = new Date(time);
            console.log(time);
            let Y = date.getFullYear() + '.';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            let D = date.getDate() + ' ';
            let h = (date.getHours() > 9 ? date.getHours() : "0"+ date.getHours() )+ ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D+h+m+s;
        },
    handleClick(data){
      console.log(data)
    },
    freeZUser(id){
      this.$confirm('确认锁定？',"提示",{
        type: 'warning'
      })
      .then(_ => {
        this.$http({
          method: 'POST',
          url: 'api/freezAdminUser.php',
          data: this.$qs.stringify({
           id: id
          })
        }).then((res) => {
          if(res.data.status == 90000){
             this.getAdminList();
             this.$message({
              message: '锁定成功',
              type: 'success'
             });
          }
        })
      })
      .catch(_ => {});
    },
    unfreeZUser(id){
      this.$confirm('确认激活？',"提示",{
        type: 'warning'
      })
      .then(_ => {
        this.$http({
          method: 'POST',
          url: 'api/unFreezAdminUser.php',
          data: this.$qs.stringify({
           id: id
          })
        }).then((res) => {
          if(res.data.status == 90000){
            this.getAdminList();
            this.$message({
              message: '激活成功',
              type: 'success'
            });
          }
        })
      })
      .catch(_ => {});
     
    }
  }
}  
</script>

<style scoped lang="scss">
 
</style>