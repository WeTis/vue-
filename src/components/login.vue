<template>
  <div class="login">
    <el-input class="login-input" v-model="name" placeholder="请输入登录账号"></el-input>
    <el-input class="login-input" v-model="password" type="password" placeholder="请输入密码"></el-input>
    <div class="login-input VerifyBox">
       <el-input class="login-input" v-model="Verifyinput" placeholder="请输入验证码">
     <img slot="suffix" :src="verifysrc">
    </el-input>
      <el-button id="clickVerify" type="text" v-on:click="verifysrcFn">刷新验证码</el-button>
    </div>
   
    <!-- <div class="login-input login-box">
       <el-input class="VerifyinputCell" v-model="VerifyinputCell" placeholder="请输入验证码">
         <el-button slot="append" >获取验证码</el-button>
       </el-input>
    </div> -->
   
    <el-button class="login-input" type="primary" :disabled="isLogin == 1" v-on:click="login">登录</el-button>

  </div>
  
</template>

<script>

import {Base} from './../api/base.js'
const base = new Base();
export default{
  name: 'login',
  props: {
    msg: String
  },
  data(){
    return {
      name: '',
      password: '',
      Verifyinput: '',
      VerifyinputCell: '',
      verifysrc: "http://192.168.0.179:8080/imooc/",
      isLogin: 1
    }
  },
  created(){
    // this.$http({
    //     method: 'GET',
    //     url: 'api',
        
    //   }).then((res) => {
        
    //   })
  },
  methods: {
    login(){
      let param = {
         method: "POST",
         url: 'login.php',
         data: this.$qs.stringify({
          username: this.name,
          password: this.password,
          verfiy:this.Verifyinput
         })
      };
      base.request(param)
      .then((res) => {
        console.log(res);
        if(res.data.status == 90000){
          this.$router.push('/index');
        }else{
          this.$message({
              message: res.data.mes,
              type: 'error'
            });
        }
      })
    },
    verifysrcFn(){
      this.verifysrc = "http://192.168.0.179:8080/imooc/"+"?time="+Date.parse( new Date());
    },
    isComplete(){
      if(this.name.length > 0 && this.password.length > 0 && this.Verifyinput.length > 3){
        this.isLogin = 2;
      }
    }
  },
  watch: {
    name(val,oldVal){
      this.isComplete();
    },
    password(val,oldVal){
      this.isComplete();
    },
    Verifyinput(val,oldVal){
      this.isComplete();
    },
  }
}  
</script>

<style scoped lang="scss">
 .login{
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   .login-input{
    margin-bottom: 20px;
    width: 300px;
    img{
      height: 38px;
      margin-top: 1px;
      right: -4px;
      position: relative;
    }
   }
   .login-box{
    display: flex;
    flex-direction: row;
    .VerifyinputCell{
          border-bottom-right-radius: 0;
    border-top-right-radius: 0;
      
    }
    .VerifyinputBtn{
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
    .el-input-group__append {
      background-color: #409EFF;
      color: #fff;
      border-color: #409EFF;
    }
   }
   .VerifyBox{
    position:relative;
     #clickVerify{
       position: absolute;
       left: 320px;
     }
   }
 }
</style>