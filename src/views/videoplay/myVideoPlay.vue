<template>
  <el-container class="myVideoPlay-container">
    <el-main>
      <div class="myVideoCard-container">
          <div class="header-tit">我的视频</div>
        <div class="card" v-for="videoObj in userVideoList" :key="videoObj.video_id">
          <div class="card-img" @click="goVideoDetail(videoObj.video_id)">
            <img :src="videoObj.videoCover" alt="图片" />
          </div>
          <div class="card-info">
            <div class="card-tit" @click="goVideoDetail(videoObj.video_id)">{{videoObj.title}}</div>
            <div class="card-detail">
              <span class="data-box">
                <v-icon type="like-o"></v-icon>{{videoObj.vlike}}
              </span>
              <span class="data-box">
                <v-icon type="message"></v-icon>{{videoObj.commentCount}}
              </span>
              <span>
                <v-icon type="user"></v-icon>{{videoObj.account}}
              </span>
            </div>
          </div>
          <div class="card-dot">
            <template>
              <v-popconfirm title="要删除这视频吗?" @confirm="deleteVideo(videoObj.video_id)" @cancel="cancel">
                <v-icon type="ellipsis"></v-icon>
              </v-popconfirm>
            </template>
          </div>
        </div>

        <div v-if="userVideoList.length==0" class="no-data">暂无视频,赶紧发一个视频啦！</div>
      </div>
    </el-main>
  </el-container>
</template>



<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
  data() {
    return {
        userVideoList:[]
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
  created(){
      this.getUserVideoList();
  },
  methods: {
      getUserVideoList(){
        axios.post("http://localhost:3004/videoPlay/getUserVideoList",{
            userId:this.userId
        })
        .then(response=>{
            console.log(response);
            this.userVideoList=response.data;
        })
        .catch(function(error){
            console.log(error);
        })
      },
      goVideoDetail(videoId){
          this.$router.push({name:'videoDetail',params:{videoId:videoId}});
      },
    deleteVideo(videoId) {
      console.log("删除视频>>>"+videoId);
      axios.post("http://localhost:3004/videoPlay/deleteUserVideo",{
          videoId
      })
      .then(response=>{
          console.log(response);
          if(response.data==1){
              Message({
                  type:'success',
                  message:'删除成功'
              })
              this.getUserVideoList();
          }
          else{
              Message({
                  type:'error',
                  message:'删除失败'
              })
          }
      })
      .catch(function(error){
          console.log(error);
          Message({
                  type:'error',
                  message:'删除服务失败'
              })
      })
      },
    cancel() {
      console.log("已取消");
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
.myVideoCard-container {
  width: 780px;
  margin: 0 auto;
}
.header-tit{
    margin-bottom: 44px;
    font-size: 18px;
    font-weight: bold;
}

/* 卡片 */
.card {
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #e5e9ef;
  text-align: left;
  transition: 0.2s;
}
.card:hover {
  box-shadow: 0 2px 5px #ccc;
}
.card-img {
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
}
.card-img img {
  width: 114px;
  height: 73px;
}
.card-info {
  display: inline-block;
  vertical-align: top;
}
.card-tit {
  height: 20px;
  line-height: 20px;
  font-weight: 700;
  font-size: 14px;
  color: #222;
  cursor: pointer;
}
.card-tit:hover {
  color: #409eff;
}
.card-detail {
  margin-top: 27px;
  color: #99a2aa;
  font-size: 13px;
  cursor: pointer;
}
.data-box {
  width: 80px;
  margin-right: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.card-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;
  z-index: 9999;
}
.no-data{
    font-size: 16px;
}
</style>
<style>
.ant-popover-inner-content{
    width: 144px;
}
</style>