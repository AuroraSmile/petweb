<template>
  <el-container class="shop-box">
      <el-header class="clearfix">
        <div class="searchgood">
          <el-input
            class="search-input"
            placeholder="请输入要搜索的商品"
            prefix-icon="el-icon-search"
            v-model="searchText"
          ></el-input>
          <el-select class="search-select" v-model="selectValue" placeholder="请选择商品种类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="searchgood(1,pageSize)">搜索</el-button>
        </div>
        <div class="userbox">
            <span class="user-account"><i class="el-icon-user"></i>
            <span v-if="userAccount">{{userAccount}}</span>
            <span v-else>你好！请先登录</span>
            </span>
            <div class="user-default" @click="goUserCollect"><span ><i class="el-icon-star-off"></i> 收藏夹</span></div>
            <div class="user-default" @click="goShopCart"> <span><i class="el-icon-shopping-cart-1"></i> 购物车</span></div>
            <div class="user-default" @click="goUserOrder"><span><i class="el-icon-s-order"></i> 订单中心</span></div>
        </div>
      </el-header>
      <el-main>
        <good-card v-for="goods in goodsList" :key="goods.goodsId" :goods="goods"></good-card>
        <div v-if="goodsList.length==0" class="no-data">暂无数据</div>
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
      </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
import GoodCard from '../../components/GoodCard.vue'
export default {
    components:{GoodCard},
  data() {
    return {
      searchText: "",
      selectValue: "",
      currentDate: new Date(),
      goodsList:[],
      options: [],
      pageSize: 10, //每页数量
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
    await this.searchgood(1, pageSize);
    this.getGoodsType();
  },
  methods: {
   async searchgood(pageNum,pageSize) {
      console.log(this.searchText);
      console.log(this.selectValue);
      let goodsName = this.searchText;
      let goodsType = this.selectValue;
     await axios
        .post("http://localhost:3004/shopmall/searchGoods", {
          pageNum,
          pageSize,
          goodsName,
          goodsType
        })
        .then(response => {
          console.log(response);
          this.totalSize = response.data.totalSize;
          this.goodsList = response.data.content;
          console.log("商品列表");
          console.log(this.goodsList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGoodsType() {
      axios
        .get("http://localhost:3004/shopmall/getGoodsType")
        .then(response => {
          console.log(response);
          let list = [];
          let obj = {
            label: "所有类型",
            value: ""
          };
          list.push(obj);
          let result = response.data;
          for (let i = 0; i < result.length; i++) {
            let newobj = {};
            newobj.label = result[i].typeName;
            newobj.value = result[i].typeName;
            list.push(newobj);
          }
          this.options = list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      let pageSize = this.pageSize;
      this.currentPage=val;
      this.searchgood(val, pageSize);
    },
    goShopCart(){
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({name:'shopCart'});
    },
    goUserOrder(){
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({name:'userOrderCenter'});
    },
    goUserCollect(){
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({name:'userGoodsCollect'});
    }
  }
};
</script>


<style scoped>
.shop-box {
  width: 100%;
  margin: 0 auto;
  line-height: 16px;
}

.el-header {
  padding: 10px 0px;
  color: #333;
  text-align: left;
}
.el-aside {
  height: 200px;
  padding: 15px;
  border: 1px solid black;
  color: #333;
  text-align: center;
}

.el-main {
padding: 0px;
  /* border: 1px solid black; */
  color: #333;
  text-align: left;
}

.searchgood{
    display: inline-block;
}
.search-input {
  width: 200px;
}
.search-select {
  margin-left: 5px;
  margin-right: 5px;
}
.userbox{
    height: 50px;
    padding: 15px;
    background-color: #fff;
    float: right;
    margin-right: 10px;
    text-align: right;
    font-size: 15px;
}

.user-account{
    cursor: pointer;
}
.user-default{
    display: inline-block;
    width: 80px;
    height: 20px;
    text-align: center;
    cursor: pointer;
}
.user-default:hover{
    color: #409EFF
}
.no-data{
  height: 200px;
    line-height: 200px;
    text-align: center;
    font-weight: bold;
    color: #606266;
    font-size: 16px;
}
.page{
  margin-top: 20px;
    margin-bottom: 10px;
    text-align: right;
}
</style>