<template>
  <div class="videoList-container">
    <div class="videoCart-container" v-for="item in VideoCartList" :key="item.video_id">
      <div class="videoImg" @click="goVideoDetail(item.video_id)">
        <img :src="item.videoCover" alt="图片" />
      </div>
      <div class="videoInfo">
        <div class="video-tit" @click="goVideoDetail(item.video_id)">{{item.title}}</div>
        <div class="video-account">
          <i class="el-icon-user"></i>
          <span>{{item.account}}</span>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalSize"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      VideoCartList: [],
      pageSize: 8, //每页数量
      currentPage: 1, //当前页
      totalSize: 0 //总数量
    };
  },
  async created() {
    let pageSize = this.pageSize;
    await this.getVideoCartList(1, pageSize);
  },
  methods: {
    getVideoCartList(pageNum, pageSize) {
      axios
        .post("http://localhost:3004/videoPlay/getVideoCart", {
          pageNum,
          pageSize
        })
        .then(response => {
          console.log(response);
          this.totalSize = response.data.totalSize;
          this.VideoCartList = response.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      let pageSize = this.pageSize;
      this.currentPage = val;
      this.getVideoCartList(val, pageSize);
    },
    goVideoDetail(videoId) {
      console.log(videoId);
      this.$router.push({name:'videoDetail',params:{videoId:videoId}})
    }
  }
};
</script>


<style scoped>
.videoCart-container {
  display: inline-block;
  width: 260px;
  margin-right: 30px;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 6px rgba(0, 0, 0, 0.04);
}
.videoImg {
  margin-bottom: 10px;
  cursor: pointer;
}
.videoImg img {
  width: 260px;
  height: 160px;
  transition: all ease 0.3s;
  object-fit: cover;
}
.videoImg img:hover {
  transform: scale(1.08);
}
.videoInfo {
  padding: 0 10px 10px 10px;
}
.video-tit {
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
}
.video-tit:hover {
  color: #409eff;
}
.video-account {
  margin-top: 8px;
  font-size: 14px;
  color: #636363;
  cursor: pointer;
}
</style>