<!-- 文章展示组件 -->
<template>
  <div class="article" v-if="hideBox" v-on:click="hide">
    <div class="content" v-on:click.stop="un">
       <img src="../../assets/top.jpg"  />
       <div class="title">
         {{title}}
       </div>
       <div class="main" v-html="msg">
       </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'article',
  props: {
    msg: String,
    title: String
  },
  data(){
    return {
      hideBox: false
    }
  },
   created(){
    
  },
  methods: {
    hide(){
      this.hideBox = false;
    },
    show(){
      this.hideBox = true;
    },
    un(){

    }
  }
}  
</script>

<style scoped lang="scss">
.article{
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2222;
  // text-align: center;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .content{
    position: relative;
    display: inline-block;
    width: 375px;
    height: 667px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    >img{
      position: absolute;
      width: 100%;
      top: -20px;
    }
    >.title{
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }
    >.main{
      width: 100%;
      padding: 10px 20px;
      box-sizing: border-box;
      height: 616px;
      overflow: auto;
    }
    >.main::-webkit-scrollbar { width: 0 !important }
  }
}
</style>