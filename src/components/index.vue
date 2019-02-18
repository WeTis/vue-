<template>
  <div class="index">
    <el-container>

      <el-header class='el-header'>
        <div class="header">
          <div class="logo">后台管理</div>
          <div class="userInfo">
            <div class="info">
              <img src=""  />
              <span>魏桐</span>
            </div>
            <div class="btn" v-on:click="exit">
              <el-button type="text"  icon="el-icon-ali-ai240">退出</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="main-contioner">
        <el-aside width="200px" class="nav-list">
          <el-menu 
            default-active="2" 
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#56adf0" 
            router 
            @select="handleMenuSelect">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-ali-guanliyuan"></i>管理员操作</template>
              <el-menu-item index="管理员列表&/index/adminList" route="/index/adminList">管理员列表</el-menu-item>
              <el-menu-item index="添加管理员&/index/addAdmin" route="/index/addAdmin">添加管理员</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-ali-wenzhangguanli"></i>文章管理</template>
              <el-menu-item index="文章列表&/index/articleList" route="/index/articleList">文章列表</el-menu-item>
              <el-menu-item index="添加文章&/index/addArticle" route="/index/addArticle">添加文章</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
          
        <el-main class="main">
          <el-breadcrumb  style="margin-bottom: 20px;" separator="">
            <el-breadcrumb-item :to="{ path: '/index' }"><el-button class="breadcrumbBtn" type="primary" size="mini">首页<i class="el-icon-circle-close-outline el-icon--right"></i></el-button></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: item.path }" v-for="item in currentPath">
              <el-button class="breadcrumbBtn" type="primary" size="mini">{{item.name}}</el-button>
            </el-breadcrumb-item>
           
          </el-breadcrumb>
          <div class="mian-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>

    </el-container>
  </div>
  
</template>

<script>
export default{
  name: 'index',
  props: {
    msg: String
  },
  data(){
    return {
      currentPath: []
    }
  },
  methods: {
    jumpToAdminList(){
      this.$router.push('/index/adminList');
    },
    exit(){
      this.$confirm('确认退出？',"提示",{
        type: 'warning'
      })
      .then(_ => {
        this.$http({
          method: 'POST',
          url: 'api/exitlogin.php',
        }).then((res) => {
          if(res.data.status == 90000){
            this.$router.push('/login')
          }
        })
      })
      .catch(_ => {});
    },
    handleMenuSelect(index,indexPath){
      // alert(indexPath + index);
      for(let i = 0; i < this.currentPath.length; i ++){
        if(this.currentPath[i].path == index.split('&')[1]){
          this.currentPath.splice(i+1,this.currentPath.length-i-1);
          return;
        }
      }
      this.currentPath.push({
        "name": index.split('&')[0],
        "path": index.split('&')[1]
      });
    },
  }
}  
</script>

<style scoped lang="scss">
.index{
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #f5f7fa;
}
.el-header{
  padding-left: 0;
  // height: 50px;
  background-color: #fff;
}
.header{
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  // height: 50px;
  .logo{
    background-color: #56adf0;
    height: 100%;
    line-height: 60px;
    width: 200px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .userInfo{

    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
    .info{
      padding: 0 20px;
    }
    .btn button{
      color: #000;
    }
  }

}
.main-contioner{
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
  .nav-list{
    height: 100%;
    // background-color: #2C333A;
    overflow: overlay;
    >ul{
      min-height: 100%;
       // background-color: #2C333A;
    }
  }
}
.breadcrumbBtn{
  
  // background-color: yellow;
  i{
    transform: rotateZ(0deg);
    transition: all 0.5s;
  }
}
.breadcrumbBtn:hover{
  background-color: #007afb;
  i{
    transform: rotateZ(180deg);
  }
}
.breadcrumbBtn:active{
  background-color: #007afb
}
.breadcrumbBtn:focus{
  background-color: #007afb
}
.main{
  position:relative;
  top: 0;
  bottom:0;
  width: 100%;
}
.mian-content{
      position: absolute;
    top: 80px;
    bottom: 0;
    left: 0px;
    right: 0px;
    padding-left: 20px;
    padding-right: 20px;
    overflow: auto;
}
.mian-content::-webkit-scrollbar { width: 0 !important }
</style>