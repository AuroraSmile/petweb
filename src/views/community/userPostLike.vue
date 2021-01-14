<template>
    <el-container>
        <el-main>
            <div class="post-list-view">
                <user-post v-for="post in postList" :key="post.post_id" :post="post" @userCommentUpdate="updatePost"></user-post>
                 <div v-if="postList.length==0" class="no-data">暂无点赞记录</div>
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
import axios from 'axios'
import UserPost from '../../components/UserPost.vue'
export default {
    components:{UserPost},
    data(){
        return {
            postList:[],
            userLikeCount:0,
            userPostCount:0,
            userCommentCount:0
        }
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
     console.log('用户userId是>>>>'+this.userId);
      this.getuserPostClickLike();
      this.getUserClickLikeCount();
      this.getUserPublishPostCount();
      this.getUserCommentCount();
  },
    methods:{
        getuserPostClickLike(){
            let userId=this.userId;
      axios.post('http://localhost:3004/community/getUserPostClickLike',{
            userId
      })
      .then((response)=>{
        console.log(response);
        this.postList=response.data;
        console.log(this.postList);
      })
      .catch(function(error){
        console.log(error);
      })
    },
     updatePost(){
       //子组件的点赞或评论行为执行的回调方法
      console.log("用户点赞页面发生评论或点赞啦！");
      //刷新用户点赞页面的文章数据
      this.getuserPostClickLike();
      //刷新用户点赞行为用户卡片点赞数
      this.getUserClickLikeCount();
      //刷新用户评论行为用户卡片评论数
      this.getUserCommentCount();
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
    },
    choose(postId){
      console.log('aaa');
      console.log(postId);
    }
    }
}
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

.no-data{
  font-size: 20px;
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