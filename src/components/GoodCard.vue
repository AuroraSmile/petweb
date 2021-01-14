<template>
  <div class="good-container">
    <el-card shadow="hover" :body-style="{ padding: '0px' }">
      <img :src="goods.goodsImg" class="card-image" />
      <!-- <img
              src="../assets/images/a3.jpg"
              class="card-image"
      />-->
      <div class="card-bottom">
        <div class="good-price">¥{{goods.price}}元</div>
        <div class="good-count">剩{{goods.inventory}}件</div>
        <el-tooltip effect="dark" :content="goods.goodsName" placement="top-start">
          <div class="good-name">{{goods.goodsName}}</div>
        </el-tooltip>
      </div>
      <div class="good-bottom">
        <div>
          <el-button
            class="car-btn"
            :type="collectType"
            icon="el-icon-star-off"
            size="mini"
            @click="changeCollect"
          >收藏</el-button>
        </div>
        <div>
          <el-button
            class="car-btn"
            type="primary"
            icon="el-icon-shopping-cart-1"
            size="mini"
            plain
            @click="addUserCart"
          >加入购物车</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  props: ["goods"],
  data() {
    return {
      collectType: "",
      collectStatus: null
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
    this.searchIsGoodsCollect();
  },
  methods: {
    addUserCart() {
      if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      //console.log('可以加入购物车啦');
      let _this = this;
      this.$confirm("亲！你确定要加入购物车吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.addUserCartPost();
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addUserCartPost() {
      let goodsId = this.goods.goodsId;
      let userId = this.userId;
      axios
        .post("http://localhost:3004/shopmall/addGoodsToCart", {
          goodsId,
          userId
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (
            result.message == "添加成功" ||
            result.message == "增加数量成功"
          ) {
            Message({
              type: "success",
              message: "成功加入购物车"
            });
          } else {
            Message({
              type: "warning",
              message: "亲！购物车商品数量已达最大库存"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchIsGoodsCollect() {
      let userId = this.userId;
      let goodsId = this.goods.goodsId;
      axios
        .post("http://localhost:3004/shopmall/searchIsGoodsCollect", {
          userId,
          goodsId
        })
        .then(response => {
          if (response.data === 1) {
            this.collectStatus = 1;
          } else {
            this.collectStatus = 0;
          }
          this.initGoodsCollect();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initGoodsCollect() {
      let status = this.collectStatus;
      if (status == 1) {
        //用户已收藏
        this.collectType = "warning";
      } else {
        this.collectType = "";
      }
    },
    changeCollect() {
      if (this.userAccount == null) {
        Message({
          type: "success",
          message: "请先登录"
        });
        return false;
      }
      let status = this.collectStatus;
      if (status == 1) {
        //删除该用户商品收藏记录
        this.collectStatus = 0;
        this.collectType = "";
        this.deleteGoodsCollect();
      } else {
        //添加用户该商品收藏记录
        this.collectStatus = 1;
        this.collectType = "warning";
        this.addGoodsCollect();
      }
    },
    addGoodsCollect() {
      console.log("添加收藏记录");
      let userId = this.userId;
      let goodsId = this.goods.goodsId;
      axios
        .post("http://localhost:3004/shopmall/addUserGoodsCollectRecord", {
          userId,
          goodsId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "收藏成功"
            });
          } else {
            Message({
              type: "error",
              message: "收藏失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "收藏服务失败"
          });
        });
    },
    deleteGoodsCollect() {
      console.log("删除收藏记录");
      let userId = this.userId;
      let goodsId = this.goods.goodsId;
      axios
        .post("http://localhost:3004/shopmall/deleteUserGoodsCollectRecord", {
          userId,
          goodsId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "已取消收藏"
            });
          } else {
            Message({
              type: "error",
              message: "取消收藏失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "收藏服务失败"
          });
        });
    }
  }
};
</script>



<style scoped>
/* 商品卡片 */
.good-container {
  display: inline-block;
  width: 210px;
  margin-top: 30px;
  margin-right: 30px;
}

.card-image {
  width: 100%;
  height: 210px;
  display: block;
}
.card-bottom {
  width: 100%;
  padding: 14px 14px 0 14px;
}

.card-bottom .good-price {
  height: 22px;
  color: #ee5533;
  font-weight: bold;
  font-size: 16px;
}

.card-bottom .good-count {
  font-size: 13px;
  color: #999;
  text-align: right;
}

.card-bottom .good-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.good-bottom {
  width: 100%;
  margin-top: 8px;
  font-size: 14px;
}
.good-bottom div {
  display: inline-block;
  width: 50%;
}
.car-btn {
  width: 100%;
}
</style>