<template>
  <div class="videoplay-container">
    <el-container>
      <el-header height="65px">
        
        <div class="nav">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#ffd04b"
            background-color="#f4f5f5"
          >
          <el-menu-item index="index"><i class="el-icon-lollipop"></i>视频</el-menu-item>
            <el-menu-item index="postVideo"><i class="el-icon-video-camera"></i>发视频</el-menu-item>
            <el-menu-item index="myVideoPlay"><i class="el-icon-view"></i>我的视频</el-menu-item>
            <el-menu-item index="myCommentVideo"><i class="el-icon-s-comment"></i>我的评论</el-menu-item>
            <el-menu-item index="myLikeVideo"><i class="el-icon-star-off"></i>我的点赞</el-menu-item>
          </el-menu>
          <div class="account">
          <i class="el-icon-user"></i>
          <span v-if="userAccount!=null">{{userAccount}}</span>
          <span v-else>你好！请先登录</span>
        </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import { Message } from "element-ui";
export default {
  name: "videoplay",
  data() {
    return {};
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
    handleSelect(key) {
      console.log(key);
      if(key!='index'){
        if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      }
      this.$router.push({path:'/videoplay/'+key});

    }
  }
};
</script>

<style scoped>
.videoplay-container {
  background-color: #f4f5f5;
}
.el-container {
  line-height: 16px;
}
.el-header {
  color: #333;
  text-align: left;
  border-bottom: 1px solid #DCDFE6;
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: left;
}
.nav{
    position: relative;
}
.nav .el-menu-demo{
    border-bottom: none;
}
.account{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 17px;
}
</style>