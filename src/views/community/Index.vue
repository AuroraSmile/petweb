<template>
  <el-container>
    <el-main>
      <div class="editPost">
        <el-input
          v-model="textarea"
          type="textarea"
          :autosize="{minRows:4}"
          placeholder="哈喽！想说什么呢?"
          maxlength="300"
          show-word-limit
        ></el-input>
        <el-button type="primary" class="edit-btn" @click="publishPost">发布</el-button>
      </div>
      <div class="post-list-view">
          <!-- 每个帖子开始 -->
            <user-post v-for="post in postList" :key="post.post_id" :post="post" @userCommentUpdate="updatePost"></user-post>
          <!-- 帖子结束 -->
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
          <div class="user-item" @click="goUserPostLike">
            <div class="title">点赞数</div>
            <div class="count">{{userLikeCount}}</div>
          </div>
          <div class="user-item" @click="goUserPostPage">
            <div class="title">发帖数</div>
            <div class="count">{{userPostCount}}</div>
          </div>
          <div class="user-item" @click="goUserPostComment">
            <div class="title">评论数</div>
            <div class="count">{{userCommentCount}}</div>
          </div>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>


<script>
import axios from 'axios'
import { Message } from 'element-ui';
import UserPost from '../../components/UserPost.vue'
export default {
  components:{UserPost},
  data() {
    return {
      textarea: '',
      postList:[],
      userLikeCount:0,
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
  created(){
    this.getAllUserPost();
    this.getUserClickLikeCount();
    this.getUserPublishPostCount();
    this.getUserCommentCount();
  },
  methods: {
    getAllUserPost(){
      axios.get('http://localhost:3004/community/getAllUserPost')
      .then((response)=>{
        console.log(response);
        this.postList=response.data;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    publishPost(){
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      let userid=this.userId;
      let usercontent=this.textarea;
      axios.post('http://localhost:3004/community/userPublishPost',{
        userId:userid,
        content:usercontent
      })
      .then((response)=>{
        console.log(response);
        if(response.data==1){
          Message({
            type:'success',
            message:'发布成功'
          })
          this.getAllUserPost();
          this.getUserPublishPostCount();
        }
        else{
          Message({
            type:'error',
            message:'发布失败'
          })
        }
        
      })
      .catch(function(error){
        console.log(error);
         Message({
            type:'error',
            message:'发布服务失败'
          })
      })
    },
    updatePost(){
      //子组件的点赞或评论行为执行的回调方法
      console.log("有用户评论或点赞啦！！要更新评论数");
      //刷新文章数据
      this.getAllUserPost();
      //刷新用户点赞行为用户卡片点赞数
     this.getUserClickLikeCount();
     //刷新用户评论行为用户卡牌评论数
     this.getUserCommentCount();
    },
    goUserPostLike(){
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({name:'userPostLike'});
    },
    goUserPostPage(){
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({name:'userPostPage'});
    },
    goUserPostComment(){
       if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({name:'userPostComment'});
    },
    getUserClickLikeCount(){
      let userId=this.userId;
      axios.post('http://localhost:3004/community/getUserClickLikeCount',{
          userId
      })
      .then((response)=>{
        console.log("用户点赞数");
        //console.log(response);
        this.userLikeCount=response.data;
      })
      .catch(function(error){
        console.log(error);
      })
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
  /* border: 1px solid black; */
  color: #333;
  text-align: center;
}

.editPost {
  margin: 0 auto;
  padding: 20px 10px 10px 10px;
  text-align: right;
  background-color: #fff;
}
.edit-btn {
  margin-top: 9px;
}

.post-list-view {
  margin-top: 15px;
}

/* 用户卡片 */
.user-card{
  background-color: #fff;
}
.user-card .user-header{
  height: 100px;
  padding: 20px 0 0 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
  text-align: left;
}
.user-card .user-header .user-logined .el-avatar--icon{
  font-size: 28px;
}
.user-card .user-header .user-logined h3,
.user-card .user-header .user-notLogin h3{
  display: inline-block;
  margin-top: 8px;
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
  vertical-align: top;
}
.user-footer{
  padding: 10px 0;
}
.user-footer .user-item{
  width: 80px;
  border-right: 1px solid #ebebeb;
  display: inline-block;
  cursor: pointer;
}
.user-footer .user-item:nth-child(3){
  border: none;
}

.user-footer .user-item .title{
  font-size: 13px;
  color: #8a9aa9;
  margin-bottom: 5px;
}
.user-footer .user-item .count{
  font-size: 15px;
    font-weight: 600;
    color: #2e3135;
}
</style>