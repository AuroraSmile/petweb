<template>
  <div class="post-container">
    <div class="list-header">
      <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
      <div class="list-header-r">
        <h3>{{post.account}}</h3>
        <p>{{post.pcreate_time|dateTimeFormat}}</p>
      </div>
    </div>
    <div class="list-content">{{post.content}}</div>
    <div class="list-footer">
      <div class="list-footer-like" @click="changeLike">
        <v-icon class="footer-icon" :type="likeStr"></v-icon>
        {{post.plike}}
      </div>
      <div class="list-footer-com" @click="openComment">
        <i class="el-icon-chat-dot-round footer-icon"></i>
        {{post.commentSize}}
      </div>
    </div>
    <div v-if="commentVisible" class="user-comment">
      <user-comment :postId="post.post_id" @userUpdate="userupdate"></user-comment>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import UserComment from "./UserComment";
import { Message } from 'element-ui';
export default {
  components: { UserComment },
  props: ["post"],
  data() {
    return {
      commentVisible: false,
      postObj: this.post,
      postId: this.post.post_id,
      likeStr: "like-o",
      likeflag: false,
      likeStatus:null
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
    this.searchIsPostLike();
  },
  methods: {
    openComment() {
      this.commentVisible = !this.commentVisible;
    },
    userupdate() {
      this.$emit("userCommentUpdate");
    },
    changeLike() {
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
     let status=this.likeStatus;
      if(status==0){
          this.likeStr='like';
          this.likeStatus=1;
          //添加点赞纪录和文章点赞数加1
          this.userClickLike();
      }
      else{
        this.likeStr='like-o';
        this.likeStatus=0;
        //删除点赞记录和文章点赞数减一
        this.userCancelLike();
      }
    },
    userClickLike(){
      axios.post('http://localhost:3004/community/userClickLike',{
          userId:this.userId,
          postId:this.postId
      })
      .then((response)=>{
        console.log(response);
        if(response.data==1){
          Message({
            type:'success',
            message:'点赞成功'
          })
          this.$emit("userCommentUpdate");
        }
        else{
          Message({
            type:'error',
            message:'点赞失败'
          })
        }
      })
      .catch(function(error){
        console.log(error);
        Message({
            type:'error',
            message:'点赞服务失败'
          })
      })
    },
    userCancelLike(){
      axios.post('http://localhost:3004/community/userCancelLike',{
          userId:this.userId,
          postId:this.postId
      })
      .then((response)=>{
        console.log(response);
        if(response.data==1){
          Message({
            type:'success',
            message:'已取消点赞'
          })
          this.$emit("userCommentUpdate");
        }
        else{
          Message({
            type:'error',
            message:'取消点赞失败'
          })
        }
      })
      .catch(function(error){
        console.log(error);
        Message({
            type:'error',
            message:'点赞服务失败'
          })
      })
    },
    searchIsPostLike(){
      axios.post('http://localhost:3004/community/searchIsPostLike',{
          userId:this.userId,
          postId:this.postId
      })
      .then((response)=>{
        //console.log(response.data);
        //console.log('=========')
        //console.log(response.data==='');
        if(response.data==1){
          this.likeStatus=1;
        }
        else{
          this.likeStatus=0;
        }
        this.initLikeIcon();
      })
      .catch(function(error){
        console.log(error);
      })
    },
    initLikeIcon(){
      let status=this.likeStatus;
      if(status==1){
        this.likeStr='like';
      }
      else{
        this.likeStr='like-o';
      }
    }
  },
  filters: {
    dateTimeFormat: function(dateTime='aa') {
      
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      //let halfamonth = day * 15
      let month = day * 30;
      let year = month * 12;
      let now = new Date().getTime();
      let diffValue = now - new Date(dateTime).getTime();
      diffValue =diffValue > 0 ? diffValue: now - new Date(Date.parse(dateTime.replace(/-/g, "/"))).getTime()
      if (diffValue < 0) {
        console.log("日期不合法");
      }
      let yearC = diffValue / year;
      let monthC = diffValue / month;
      let weekC = diffValue / (7 * day);
      let dayC = diffValue / day;
      let hourC = diffValue / hour;
      let minC = diffValue / minute;
      let result;
      if (yearC >= 1) {
        result = parseInt(yearC) + "年前";
      } else if (monthC >= 1) {
        result = parseInt(monthC) + "个月前";
      } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    }
  }
};
</script>


<style scoped>
.post-container {
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #fff;
}
.list-header {
  text-align: left;
}
.list-header .el-avatar--icon {
  font-size: 25px;
}
.list-header .list-header-r {
  margin-top: 5px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: top;
}
.list-header .list-header-r h3 {
  margin-bottom: 6px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  font-family: "PingFang SC";
}
.list-header .list-header-r p {
  color: #8a9aa9;
  cursor: default;
}
.list-content {
  margin-left: 50px;
  line-height: 1.6;
  font-size: 15px;
  color: #17181a;
  text-align: left;
}

.list-footer {
  padding: 5px 0;
  margin-top: 10px;
  border-top: 1px solid #ebebeb;
  font-size: 16px;
}

.list-footer-like {
  display: inline-block;
  width: 50%;
  height: 20px;
  cursor: pointer;
  border-right: 1px solid #ebebeb;
}
.list-footer-com {
  display: inline-block;
  width: 50%;
  height: 20px;
  cursor: pointer;
}

.list-footer-com:hover,
.list-footer-like:hover {
  color: #409eff;
}

.list-footer .footer-icon {
  margin-right: 3px;
}
</style>