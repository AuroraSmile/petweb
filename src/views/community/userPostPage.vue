<template>
  <el-container>
    <el-main>
      <div class="post-list-view">
        <div v-for="post in postList" :key="post.post_id">
          <div class="posttop cleafix">
              <div class="dot">
            <template>
              <v-popconfirm title="要删除这帖子吗?" @confirm="deletePost(post.post_id)" @cancel="cancel">
                  <v-icon type="ellipsis"></v-icon>
              </v-popconfirm>
            </template>
            </div>
          </div>
          <user-post :post="post" @userCommentUpdate="updatePost"></user-post>
        </div>
        <div v-if="postList.length==0" class="no-data">暂无发帖记录</div>
      </div>
    </el-main>
    <el-aside>
      <div class="user-card">
        <div class="user-header">
          <div v-if="userAccount" class="user-logined">
            <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
            <h3>{{userAccount}}</h3>
          </div>
          <div v-else class="user-notLogin">
            <h3>你好！请先登录</h3>
          </div>
        </div>
        <div class="user-footer">
          <div class="user-item">
            <div class="title">点赞数</div>
            <div class="count">{{userLikeCount}}</div>
          </div>
          <div class="user-item">
            <div class="title">发帖数</div>
            <div class="count">{{userPostCount}}</div>
          </div>
          <div class="user-item">
            <div class="title">评论数</div>
            <div class="count">{{userCommentCount}}</div>
          </div>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>


<script>
import axios from "axios";
import { Message } from 'element-ui';
import UserPost from "../../components/UserPost.vue";
export default {
  components: { UserPost },
  data() {
    return {
      postList: [],
      userLikeCount: 0,
      userPostCount:0,
      userCommentCount:0
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
  created() {
    console.log("用户userId是>>>>" + this.userId);
    this.getUserPublishPost();
    this.getUserClickLikeCount();
    this.getUserPublishPostCount();
    this.getUserCommentCount();
  },
  methods: {
    getUserPublishPost() {
      let userId = this.userId;
      axios
        .post("http://localhost:3004/community/getUserPublishPost", {
          userId
        })
        .then(response => {
          console.log(response);
          this.postList = response.data;
          console.log(this.postList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deletePost(postId) {
      console.log("要删除的帖子>>>>>" + postId);
      axios.post('http://localhost:3004/community/deleteUserPost',{
          postId
      })
      .then((response)=>{
          console.log(response);
          if(response.data==1){
              Message({
                  type:'success',
                  message:'删除成功'
              })
              //删帖后从新获取已发帖数据
              this.getUserPublishPost();
              //更新用户卡片的发帖数
              this.getUserPublishPostCount();
              //有可能用户自己也给删除的帖子也点了赞，所以也要更新用户卡片的点赞数
              this.getUserClickLikeCount();
              //有可能用户自己也给删除的帖子也评论，所以也要更新用户卡片的评论数
              this.getUserCommentCount();
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
    cancel(){
        console.log('已取消');
    },
    updatePost() {
      //子组件的点赞或评论行为执行的回调方法
      console.log("用户点赞页面发生评论或点赞啦！");
      //因用户评论或点赞刷新用户发帖页面的文章数据
      this.getUserPublishPost();
      //刷新用户点赞行为用户卡片点赞数
      this.getUserClickLikeCount();
      //刷新用户评论自己后，用户卡片评论数
      this.getUserCommentCount();
    },
    getUserClickLikeCount() {
      let userId = this.userId;
      axios
        .post("http://localhost:3004/community/getUserClickLikeCount", {
          userId
        })
        .then(response => {
          //console.log("用户点赞数");
          //console.log(response);
          this.userLikeCount = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUserPublishPostCount(){
      let userId=this.userId;
      axios.post('http://localhost:3004/community/getUserPublishPostCount',{
          userId
      })
      .then((response)=>{
        console.log("用户发帖数");
        //console.log(response);
        this.userPostCount=response.data;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    getUserCommentCount(){
        let userId=this.userId;
      axios.post('http://localhost:3004/community/getUserCommentCount',{
          userId
      })
      .then((response)=>{
        console.log("用户评论数");
        //console.log(response);
        this.userCommentCount=response.data;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    choose(postId) {
      console.log("aaa");
      console.log(postId);
    }
  }
};
</script>



<style scoped>
.el-container {
  width: 80%;
  margin: 0 auto;
  line-height: 16px;
}
.el-aside {
  height: 200px;
  padding: 15px;
  /* border: 1px solid black; */
  color: #333;
  text-align: center;
}

.el-main {
  padding: 15px 15px;
  margin-right: 15px;
  /*  border: 1px solid black; */
  color: #333;
  text-align: center;
}

.post-list-view {
  margin-top: 15px;
}

.no-data {
  font-size: 20px;
}
.posttop {
  background-color: #fff;
}

.posttop .dot {
  float: right;
  margin-right: 10px;
  font-size: 23px;
  cursor: pointer;
}

/* 用户卡片 */
.user-card {
  background-color: #fff;
}
.user-card .user-header {
  height: 100px;
  padding: 20px 0 0 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
  text-align: left;
}
.user-card .user-header .user-logined .el-avatar--icon {
  font-size: 28px;
}
.user-card .user-header .user-logined h3,
.user-card .user-header .user-notLogin h3 {
  display: inline-block;
  margin-top: 8px;
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
  vertical-align: top;
}
.user-footer {
  padding: 10px 0;
}
.user-footer .user-item {
  width: 80px;
  border-right: 1px solid #ebebeb;
  display: inline-block;
}
.user-footer .user-item:nth-child(3) {
  border: none;
}

.user-footer .user-item .title {
  font-size: 13px;
  color: #8a9aa9;
  margin-bottom: 5px;
}
.user-footer .user-item .count {
  font-size: 15px;
  font-weight: 600;
  color: #2e3135;
}
</style>