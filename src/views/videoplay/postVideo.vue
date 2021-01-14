<template>
  <div class="postVideo-container">
    <el-container>
      <el-main>
        <div class="header">发布视频</div>
        <div class="postVideo">
          <el-form ref="videoForm" :model="videoForm" label-width="80px" :rules="videorules">
            <el-form-item label="视频标题" prop="title">
              <el-input v-model="videoForm.title" maxlength="25" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="视频封面" prop="videoImg">
              <el-upload
                :http-request="uploadVideoPhoto"
                :show-file-list="false"
                class="avatar-uploader"
                action
                :on-success="uploadVideoPhotoSuccess"
                accept="image/png, image/gif, image/jpg, image/jpeg"
              >
                <img v-if="videoForm.videoImg" :src="videoForm.videoImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="视频文件" prop="videoUrl">
              <el-upload
                class="uploadVideo"
                :http-request="uploadVideoPlay"
                action
                :on-success="uploadVideoPlaySuccess"
                :before-upload="beforeAvatarUpload"
                accept="video/mp4"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传mp4文件,且不超过9M</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="视频简介" prop="brief">
              <el-input
                type="textarea"
                v-model="videoForm.brief"
                maxlength="80"
                show-word-limit
                :autosize="{ minRows: 5}"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitVideoForm('videoForm')">发布视频</el-button>
              <el-button @click="resetVideoForm('videoForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import axios from "axios";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      videoForm: {
        title: "",
        brief: "",
        videoImg: "",
        videoUrl:''
      },
      videorules:{
        title:[{ required: true, message: "请输入视频标题", trigger: "blur" }],
        videoImg:[{ required: true, message: "请上传视频封面", trigger: "blur" }],
        videoUrl:[{ required: true, message: "请上传视频文件", trigger: "blur" }],
        brief:[{ required: true, message: "请输入视频简介", trigger: "blur" }]
      }
    };
  },
  computed: {
    userAccount() {
      return this.$store.state.user.userAccount;
    },
    userId() {
      return this.$store.state.user.userId;
    },
    role() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    submitVideoForm(formName) {
      console.log("表单提交");
      if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this=this;
          console.log(this.videoForm);
          this.addVideoPlayPost(_this);
          
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    addVideoPlayPost(getThis){
      axios.post("http://localhost:3004/videoPlay/addVideo",{
          userId:this.userId,
          title:this.videoForm.title,
          brief:this.videoForm.brief,
          videoCover:this.videoForm.videoImg,
          videoUrl:this.videoForm.videoUrl
      })
      .then(response=>{
        console.log(response);
        if(response.data==1){
          Message({
            type: 'success',
            message: '发布成功!'
          });
        }
        else{
          Message({
            type: 'error',
            message: '发布失败!'
          });
        }
        getThis.$refs['videoForm'].resetFields();
      })
      .catch(function(error){
        console.log(error);
        Message({
            type: 'error',
            message: '发布服务失败!'
          });
      })
    },
    resetVideoForm(formName){
      this.$refs[formName].resetFields();
    },
    uploadVideoPhoto(file) {
      console.log(file);
      let fileObj=file.file;
      let formData=new FormData();
      formData.append("videoImg",fileObj);
      axios({
        url:"http://localhost:3004/videoPlay/uploadVideoImgFile",
        method:"post",
        data:formData,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      .then(response=>{
        console.log("视频封面上传成功");
        console.log(response);
        file.onSuccess(response);
      })
    },
    uploadVideoPhotoSuccess(res, file, fileList) {
      console.log("uploadPhotoSuccess回调");
      console.log(res, file, fileList);
      this.videoForm.videoImg = res.data.url;
    },
    uploadVideoPlay(file){
        console.log(file);
      let fileObj=file.file;
      let formData=new FormData();
      formData.append("videoPlay",fileObj);
      axios({
        url:"http://localhost:3004/videoPlay/uploadVideoPlayFile",
        method:"post",
        data:formData,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      .then(response=>{
        console.log("视频上传成功");
        console.log(response);
        file.onSuccess(response);
      })
    },
    uploadVideoPlaySuccess(res, file, fileList) {
      console.log("uploadPlaySuccess回调");
      console.log(res, file, fileList);
      this.videoForm.videoUrl= res.data.url;
    },
    beforeAvatarUpload(file) {
        const isMP4 = file.type === 'video/mp4';
        const isLt9M = file.size / 1024 / 1024 < 9;

        if (!isMP4) {
          this.$message.error('上传视频只能是 MP4 格式!');
        }
        if (!isLt9M) {
          this.$message.error('上传视频大小不能超过 9MB!');
        }
        return isMP4 && isLt9M;
      }

  }
};
</script>


<style scoped>
.el-container {
  line-height: 16px;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}
.header {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
}
.postVideo {
  width: 450px;
  margin: 0 auto;
}
</style>
<style>
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .el-upload__input {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 260px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 260px;
  height: 160px;
  display: block;
}

.uploadVideo{
    text-align: left;
}
.uploadVideo .el-upload__input{
    display: none;
}
</style>