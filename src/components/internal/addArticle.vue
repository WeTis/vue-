<!-- 添加文章页面 -->
<template>
  <div class="addArticle">
    <div>
      <span class="name">标题：</span>
      <div>
        <el-input v-model="title" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div>
      <span class="name">作者：</span>
      <div>
        <el-input v-model="author" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div>
      <span class="name">摘要：</span>
      <div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="abstract">
        </el-input>
      </div>
    </div>
    <div>
      <span class="name">缩略图：</span>
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-change="handleAvatarSuccess"
          :auto-upload="false"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div>
      <span class="name">内容：</span>
      <div>
        <textarea :id="id"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'addArticle',
  props: {
    msg: String
  },
  data(){
    const Id = Date.now()
    return {
      imageUrl: "",
      title:"",
      author: "",
      abstract: "",
      id: Id
    }
  },
  created(){
    
  },
  beforeMount(){
    
  },
  beforeDestroy () {
      // 销毁tinymce
    this.$emit('on-destroy')
    window.tinymce.remove(`#${this.id}`)
  },
  mounted(){
    window.tinymce.init({
      selector: `#${this.id}`,
      height: 350,
      plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
      toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',

    })
  },
  methods: {
   handleAvatarSuccess(file,filelist) {
    this.imageUrl = URL.createObjectURL(file.raw);
    
   },
    
  },
  watch: {
   
  }
}  
</script>

<style scoped lang="scss">
 .addArticle{
  width: 100%;
  >div{
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 20px;
    margin: 20px auto;
    box-sizing: border-box;
    align-items: center;
    .name{
      width: 100px;
      text-align: right;
    }
    >div{
      flex:1;
    }
    input{
      width: 100%;
    }
  }
 }

 .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>