<template>
  <div id="app">
    <router-view class="page"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
html,body,div,p,ul,li{
  padding: 0;
  margin: 0;
}
 .el-message-box__content{
   max-height: 500px;
   overflow: auto;
 }
 .el-message-box__content::-webkit-scrollbar { width: 0 !important }
</style>
