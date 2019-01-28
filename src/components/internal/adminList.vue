<!-- 管理员列表页面 -->
<template>
  <div class="adminList">
     <el-table :data="tableData"  stripe border style="width: auto;min-width: 1265px;">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="emaill" label="邮箱" width="300" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" width="300" align="center"></el-table-column>
      <el-table-column prop="freez" label="更改状态" width="150"  align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="formatRole(scope.row)" v-on:click="unfreeZUser(scope.row.id)">激活</el-button>
          <el-button type="danger" size="small" v-else  v-on:click="freeZUser(scope.row.id)">锁定</el-button>
        </template>
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
  name: 'adminList',
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
        method: 'GET',
        url: 'api/getadminlist.php',
      }).then((res) => {
        console.log(res);
        if(res.data.status == 90000){
          // this.$router.push('/index');
          this.tableData = res.data.params;
        }
      })
    },
    formatRole(data){
      return data.freez == 1 ? false:true;
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