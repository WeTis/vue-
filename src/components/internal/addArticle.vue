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
      <span class="name">头像：</span>
      <div>
        <el-upload
          class="avatar-uploader"
          action="http://192.168.0.179:8080/imooc/lib/uploadImg.php"
          :show-file-list="false"
          :on-change="handleAvatarSuccessAva"
          :auto-upload="false"
          >
          <img v-if="AVAUrl" :src="AVAUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div>
      <span class="name">类别：</span>
      <div>
        <el-select v-model="articleType" placeholder="请选择">
          <el-option
            v-for="item in allType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      <span class="name">音频：</span>
      <el-input
          placeholder="请输入音频地址"
          v-model="audioSrc">
        </el-input>
    </div>
    <div>
      <span class="name">主图：</span>
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
        <textarea :id="id">
        </textarea>
      </div>
    </div>
    <div>
      <span class="name">上传</span>
      <el-button type="primary"  @click="alertBox">确定</el-button>
    </div>
  </div>
</template>

<script>
import {Base} from './../../api/base.js';
const base = new Base();
export default{
  name: 'addArticle',
  props: {
    msg: String
  },
  data(){
    const Id = Date.now()
    return {
      imageUrl: "",
      upImgUrl: "",
      AVAUrl: "",
      upAVAUrl: "",
      title:"",
      author: "",
      abstract: "",
      audioSrc: "",
      allType: [{
        value: "1",
        label: "新闻"
      },
      {
        value: "2",
        label: "体育"
      },
      {
        value: "3",
        label: "财经"
      },
      {
        value: "4",
        label: "娱乐"
      }],
      articleType: "",
      id: Id,
      articleId: ''
    }
  },
  created(){
    if(this.$route.params.id){
      // alert(this.$route.params.id);
      this.$http({
        method: 'POST',
        url: 'api/getArticleList.php',
        data: this.$qs.stringify({
          articleId: this.$route.params.id
        })
      }).then((res) => {
        console.log(res);
        if(res.data.status == 90000){
            let params = res.data.params.res[0];
            this.title=params.title;
            this.author=params.authorName;
            this.abstract=params.abstract;
            this.audioSrc= params.audioSrc;
            this.imageUrl= params.mainImg;
            this.upImgUrl= params.mainImg;
            this.AVAUrl= params.authorImg;
            this.upAVAUrl= params.authorImg;
            this.articleType=params.articleType;
            this.articleId = params.id;
            window.tinyMCE.activeEditor.setContent(params.content);
        }
      })
    }
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
      
      let param = {
          method: 'POST',
          url: 'uploadImg.php',
          data: formData,
          processData: false,
          contentType: false
        };
      base.request(param)
      .then((res) => {
        if(res.data.status == 90000){
          this.upImgUrl = res.data.location;
        }else{

        }
      })
   },
   handleAvatarSuccessAva(file,filelist){
      this.AVAUrl = URL.createObjectURL(file.raw);
      var formData = new FormData();
      formData.append('file', file.raw);

      let param = {
          method: 'POST',
          url: 'uploadImg.php',
          data: formData,
          processData: false,
          contentType: false
        };
      base.request(param)
      .then((res) => {
        if(res.data.status == 90000){
          this.upAVAUrl = res.data.location;
        }else{
          
        }
      }) 
   },
   alertBox(){
    this.$confirm('是否要保存此内容', '确定保存', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃'
        })
          .then(() => {
            if(!this.articleId){
              this.getText();
            }else{
              this.uploadArticle();
            }
            
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
   },
   getText(){
    let content = (window.tinyMCE.activeEditor.getContent()).split(/<body>/)[1].split(/<\/body>/)[0];
    console.log(this.html);
    let param={
      url: "addArticle.php",
      method: "POST",
      data: this.$qs.stringify({
        title: this.title,
        authorName: this.author,
        authorImg: this.upAVAUrl,
        articleType: this.articleType,
        abstract: this.abstract,
        audioSrc: this.audioSrc,
        mainImg: this.upImgUrl,
        content: content
      })
    };

    base.request(param)
    .then((res) => {
       if(res.data.status == 90000){
         this.$message({
              type: 'success',
              message: "添加成功"
          });
         this.$router.push('/index/articleList');
         // this.$parent.jumpToPageFn('/index/articleList');
       }else{
          this.$message({
              type: 'error',
              message: "添加失败"
          })
       }
    });
   },
   uploadArticle(){
    let content = (window.tinyMCE.activeEditor.getContent()).split(/<body>/)[1].split(/<\/body>/)[0];
    let param={
      url: "upDateArticle.php",
      method: "POST",
      data: this.$qs.stringify({
        title: this.title,
        authorName: this.author,
        authorImg: this.upAVAUrl,
        articleType: this.articleType,
        abstract: this.abstract,
        audioSrc: this.audioSrc,
        mainImg: this.upImgUrl,
        content: content,
        unmId: this.articleId
      })
    };

    base.request(param)
    .then((res) => {
       if(res.data.status == 90000){
         this.$message({
              type: 'success',
              message: "添加成功"
          });
         this.$router.push('/index/articleList');
         // this.$parent.jumpToPageFn('/index/articleList');
       }else{
          this.$message({
              type: 'error',
              message: "添加失败"
          })
       }
    });
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