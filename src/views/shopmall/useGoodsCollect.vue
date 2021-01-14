<template>
  <el-container class="userCollect-container">
    <el-header height="90px">
      <div class="goShop">
        <el-page-header @back="goBackShop">
          <div class="userCollect-back" slot="title">返回商城</div>
          <div class="userCollect-tit" slot="content">我的收藏夹</div>
        </el-page-header>
      </div>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-menu
          class="el-menu-demo"
          @select="handleSelect"
          background-color="#f4f5f5"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" disabled>收藏夹</el-menu-item>
          <el-menu-item index="shopCart">购物车</el-menu-item>
          <el-menu-item index="userOrderCenter">订单中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="userOrder-container">
          <good-card v-for="goods in goodsList" :key="goods.goodsId" :goods="goods"></good-card>
          <div v-if="goodsList.length==0" class="no-data">暂无收藏的商品</div>
          <div v-show="goodsList.length!=0" class="page">
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
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import axios from "axios";
import { Message } from "element-ui";
import GoodCard from '../../components/GoodCard.vue'
export default {
    components:{GoodCard},
  data() {
    return {
        goodsList:[],
        pageSize: 8, //每页数量
      currentPage: 1, //当前页
      totalSize: 0 //总数量
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
  async created(){
      let pageSize = this.pageSize;
      await this.searchUserCollectGoods(1,pageSize);
  },
  methods: {
    goBackShop() {
      this.$router.push({ path: "index" });
    },
    handleSelect(key) {
      //console.log(key, keyPath);
      if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      this.$router.push({ path: key });
    },
    handleCurrentChange(val){
        let pageSize = this.pageSize;
      this.currentPage=val;
      this.searchUserCollectGoods(val, pageSize);
    },
   async searchUserCollectGoods(pageNum,pageSize){
        let userId=this.userId;
      await axios.post("http://localhost:3004/shopmall/searchUserCollectGoods",{
            pageNum,
            pageSize,
            userId
        })
        .then(response=>{
            console.log(response);
            this.totalSize=response.data.totalSize;
            this.goodsList=response.data.content;
        })
        .catch(function(error){
            console.log(error);
        })
    }
   
  }
};
</script>


<style scoped>
.userCollect-container {
  line-height: 16px;
}
.el-header {
  color: #333;
  text-align: left;
}

.el-aside {
  color: #333;
  text-align: center;
}

.el-main {
  margin: 0px 15px 15px 15px;
  background-color: #fff;
  color: #333;
  text-align: center;
}
.goShop {
  display: inline-block;
  width: 25%;
  vertical-align: top;
}

.userCollect-back {
  font-size: 13px;
}
.userCollect-tit {
  font-size: 22px;
  font-weight: bold;
  font-family: "微软雅黑";
  color: #303133;
}


</style>