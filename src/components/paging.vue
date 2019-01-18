<template>
  <div class="paging">
    <el-pagination class="pageNav"
      background
      layout="prev, pager, next"
      :total="pageNum"
      @current-change="changeCurrent">
    </el-pagination>
  </div>
</template>

<script>
export default{
  name: 'index',
  props: {
    num: String
  },
  data(){
    return {
      pageNum: this.num*1
    }
  },
   created(){
    // alert(this.num);
  },
  methods: {
    changeCurrent(res){
      // alert(res);
      this.$emit('jumpToPage',res);
    }
  }
}  
</script>

<style scoped lang="scss">
.pageNav{
  width: 100%;
  margin: 30px auto;
  text-align: center;
}
</style>