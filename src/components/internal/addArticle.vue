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
          action="http://192.168.0.179:8080/imooc/lib/uploadImg.php"
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
    <div>
      <span class="name">上传</span>
      <el-button type="primary" v-on:click="getText">确定</el-button>
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
      // we override default upload handler to simulate successful upload
      images_upload_handler: (blobInfo, success, failure) => {
          var formData = new FormData();
          formData.append('file', blobInfo.blob());
          this.$http({
              method: 'POST',
              url: 'api/uploadImg.php',
              data: formData,
              processData: false,
              contentType: false
            }).then((res) => {
              console.log(res.data.location);
               success(res.data.location);
            })
      }
    })
  },
  methods: {
   handleAvatarSuccess(file,filelist) {
    console.log(file);
    this.imageUrl = URL.createObjectURL(file.raw);
    var formData = new FormData();
    formData.append('file', file.raw);
    this.$http({
        method: 'POST',
        url: 'api/uploadImg.php',
        data: formData,
        processData: false,
        contentType: false
      }).then((res) => {
        
      })   
   },
   getText(){
    console.log(window.tinyMCE.activeEditor.getContent())
   }
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