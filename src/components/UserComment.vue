<template>
    <div class="com-container">
        <!-- 发表评论 -->
              <div class="list-comment-from">
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
                <div class="userCommentList">
                    <user-comment-list v-for="comment in CommentList" :key="comment.com_id" :comment="comment"></user-comment-list>
                    <div v-if="CommentList.length!=0" class="CommentMore">查看更多></div> 
                </div>
              <!-- 评论列表 -->
              <!-- <div class="list-userCommentList">
                <ul>
                  <li class="comment-list">
                    <div class="list-com-header">
                      <el-avatar :size="35" icon="el-icon-user-solid"></el-avatar>
                      <div class="list-com-header-r">
                        <h3>小明</h3>
                      </div>
                    </div>
                    <div class="list-content">啊飒飒飒飒飒啊啊洒洒水发爱的隧道</div>
                    <div class="comment-reply">
                      <span>3小时前</span>
                      <span>
                        <i class="el-icon-chat-round"></i> 回复
                      </span>
                      <div v-if="replyComVisible" class="com-edit-reply">
                        <div class="list-comment-from">
                          <el-avatar :size="20" icon="el-icon-user-solid"></el-avatar>
                          <div class="comment-from-input">
                            <el-input
                              v-model="replyarea"
                              type="textarea"
                              :autosize="{minRows:1}"
                              placeholder="输入评论"
                              maxlength="100"
                              show-word-limit
                            ></el-input>
                          </div>
                          <div class="comment-btn">
                            <el-button size="small" type="primary">回复</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </li>
                  
                </ul>
              </div> -->
    </div>
</template>


<script>
import axios from 'axios'
import { Message } from 'element-ui';
import UserCommentList from './UserCommentList.vue'
export default {
    components:{UserCommentList},
    props:['postId'],
    data(){
        return {
            commentarea:'',
            CommentList:[]

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
      console.log(this.postId);
      this.getPostComment();
    },
    methods:{
      getPostComment(){
        let postId=this.postId;
        //let pageNum=1;
        //let pageSize=8;
        axios.post('http://localhost:3004/community/getPostComment',{
          postId
        })
        .then((response)=>{
          console.log(response);
          this.CommentList=response.data;
        })
        .catch(function(error){
          console.log(error);
        })
      },
      publishComment(){
        if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      console.log('可以评论啦');
      let content=this.commentarea;
      let userId=this.userId;
      let postId=this.postId;
      axios.post('http://localhost:3004/community/userCommentPost',{
          content:content,
          userId:userId,
          postId:postId
      })
      .then((response)=>{
        console.log(response);
        if(response.data==1){
          Message({
          type:'success',
          message:'评论成功'
        })
        this.commentarea='';
        this.getPostComment();
        //更新文章的评论数，回调父组件的userUpdate
        this.changePost();
        }
        else{
           Message({
          type:'error',
          message:'评论失败'
        })
        }
      })
      .catch(function(error){
        console.log(error);
        Message({
          type:'error',
          message:'评论服务失败'
        })
      })
      },
      changePost(){
        this.$emit('userUpdate');
      },
      goPostDetail(){
        let postId=this.postId;
        this.$router.push({name:'onePostDetail',params:{postId}});
      }
    }
}
</script>


<style scoped>

.comment-from-input {
  width: 90%;
  margin-left: 5px;
  display: inline-block;
  vertical-align: top;
}
.list-comment-from {
  padding: 10px;
  background-color: #fafbfc;
}

.comment-btn {
  margin-top: 5px;
  margin-right: 15px;
  text-align: right;
}
.CommentMore{
  margin-top: 8px;
  font-size: 14px;
  color: #409EFF;
  cursor: pointer;
}
</style>