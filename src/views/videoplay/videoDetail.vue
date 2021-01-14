<template>
  <el-container class="videoDetail-container">
    <el-main>
      <div class="videobox">
        <div class="video-tit">{{videoObj.title}}</div>
        <div class="video-time">{{videoObj.create_time}}</div>
        <div class="copyright">
          <i class="el-icon-info"></i> 未经作者授权，禁止转载
        </div>
        <div class="videoplay">
          <video width="638" ref="videoplay" :src="videoObj.videoUrl" controls></video>
        </div>
        <div class="video-toolbar">
          <span class="video-like" @click="changeLike">
            <v-icon :type="likeStr"></v-icon>
            {{videoObj.vlike}}
          </span>
          <span class="video-commentCount">
            <v-icon type="message"></v-icon>
            {{videoObj.commentCount}}
          </span>
        </div>
        <div class="video-brief">{{videoObj.brief}}</div>
      </div>
      <div class="comment-container">
        <div class="com-tit">评论</div>
        <div class="userComment">
          <el-avatar :size="35" icon="el-icon-user-solid"></el-avatar>
          <div class="comment-from-input">
            <el-input
              v-model="commentarea"
              type="textarea"
              :autosize="{minRows:1}"
              placeholder="输入评论"
              maxlength="100"
              show-word-limit
            ></el-input>
          </div>
          <div class="comment-btn">
            <el-button size="small" type="primary" @click="publishComment">评论</el-button>
          </div>
        </div>

        <div class="userCommentList-container">
          <video-user-comment
            v-for="comment in videoCommentList"
            :key="comment.vcom_id"
            :comment="comment"
          ></video-user-comment>
          <div v-if="videoCommentList.length==0" class="no-data">暂无评论</div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>


<script>
import axios from "axios";
import { Message } from "element-ui";
import VideoUserComment from "../../components/VideoUserComment.vue";
export default {
  components: { VideoUserComment },
  data() {
    return {
      videoId: this.$route.params.videoId,
      videoObj: {},
      commentarea: "",
      videoCommentList: [],
      likeStr: "like-o",
      likeflag: false,
      likeStatus: null
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
  async created() {
    console.log(this.videoId);
    await this.getVideoDetail();
    this.getVideoCommentList();
    this.searchIsVideoLike();
  },
  methods: {
    async getVideoDetail() {
      let videoId = this.videoId;
      await axios
        .post("http://localhost:3004/videoPlay/getVideoDetail", {
          videoId
        })
        .then(response => {
          console.log(response);
          this.videoObj = response.data;
          //this.$refs['videoplay'].src=response.data.videoUrl;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getVideoCommentList() {
      let videoId = this.videoId;
      axios
        .post("http://localhost:3004/videoPlay/getVideoCommentList", {
          videoId
        })
        .then(response => {
          console.log(response);
          this.videoCommentList = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    publishComment() {
      console.log("用户评论");
      if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      if (this.commentarea == "") {
        Message({
          type: "warning",
          message: "内容不能为空"
        });
        return false;
      }
      let content = this.commentarea;
      let userId = this.userId;
      let videoId = this.videoId;
      axios
        .post("http://localhost:3004/videoPlay/userVideoCommentPost", {
          content,
          userId,
          videoId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "评论成功"
            });
            this.commentarea = "";
            this.getVideoCommentList();
            this.getVideoDetail();
          } else {
            Message({
              type: "error",
              message: "评论失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "评论服务失败"
          });
        });
    },
    searchIsVideoLike() {
      axios
        .post("http://localhost:3004/videoPlay/searchIsVideoLike", {
          userId: this.userId,
          videoId: this.videoId
        })
        .then(response => {
          console.log(response);
          if (response.data === 1) {
            this.likeStatus = 1;
          } else {
            this.likeStatus = 0;
          }
          this.initLikeIcon();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initLikeIcon() {
      let status = this.likeStatus;
      if (status == 1) {
        this.likeStr = "like";
      } else {
        this.likeStr = "like-o";
      }
    },
    changeLike() {
      if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      let status = this.likeStatus;
      if (status == 0) {
        this.likeStr = "like";
        this.likeStatus = 1;
        //添加点赞纪录和视频点赞数加1
        this.userClickLike();
      } else {
        this.likeStr = "like-o";
        this.likeStatus = 0;
        //删除点赞记录和视频点赞数减一
        this.userCancelLike();
      }
    },
    userClickLike() {
      console.log("用户点赞");
      axios
        .post("http://localhost:3004/videoPlay/userClickLike", {
          userId: this.userId,
          videoId: this.videoId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "点赞成功"
            });
            this.getVideoDetail();
          } else {
            Message({
              type: "error",
              message: "点赞失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "点赞服务失败"
          });
        });
    },
    userCancelLike() {
      console.log("用户取消点赞");
      axios
        .post("http://localhost:3004/videoPlay/userCancelLike", {
          userId: this.userId,
          videoId: this.videoId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "已取消点赞"
            });
            this.getVideoDetail();
          } else {
            Message({
              type: "error",
              message: "取消点赞失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "点赞服务失败"
          });
        });
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
.videobox {
  width: 650px;
  margin: 0 auto;
}
.video-tit {
  margin-bottom: 10px;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Arial, PingFang SC;
  font-weight: 500;
  color: #212121;
  text-align: left;
  padding: 0 10px;
}
.video-time {
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 12px;
  color: #999;
  text-align: left;
}
.copyright {
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 12px;
  color: #999;
  text-align: left;
}
.copyright .el-icon-info {
  color: #f56c6c;
}
.video-toolbar {
  margin-top: 10px;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px 10px;
  font-size: 18px;
  text-align: left;
}
.video-like {
  margin-right: 10px;
  cursor: pointer;
}
.video-brief {
  padding: 10px 10px;
  font-size: 13px;
  color: #212121;
  text-align: left;
  line-height: 18px;
}

/* 评论 */
.comment-container {
  width: 650px;
  margin: 35px auto;
  text-align: left;
}
.com-tit {
  margin-bottom: 10px;
  font-size: 18px;
  color: #222;
}
.userComment {
  padding: 10px;
  background-color: #fafbfc;
}
.comment-from-input {
  width: 90%;
  margin-left: 5px;
  display: inline-block;
  vertical-align: top;
}
.comment-btn {
  margin-top: 5px;
  margin-right: 15px;
  text-align: right;
}
.no-data {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
</style>