<template>
  <el-container class="shopCart-container">
    <el-header height="80px">
      <div class="goShop">
        <el-page-header @back="goBackShop">
          <div class="Cart-back" slot="title">返回商城</div>
          <div class="Cart-tit" slot="content">我的购物车</div>
        </el-page-header>
      </div>
      <div class="step">
        <el-steps :active="active" finish-status="success">
          <el-step title="放进购物车"></el-step>
          <el-step title="确认支付"></el-step>
          <el-step title="订单信息"></el-step>
        </el-steps>
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
          <el-menu-item index="userGoodsCollect">收藏夹</el-menu-item>
          <el-menu-item index="2" disabled>购物车</el-menu-item>
          <el-menu-item index="userOrderCenter">订单中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="user-cart" v-show="active==1">
          <el-table
            :data="tableData2"
            ref="goodsTable"
            stripe
            hightlight-current-row
            empty-text="暂无数据"
            max-height="700"
            style="width:100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :selectable="selectInit"></el-table-column>
            <el-table-column prop="goodsImg" label="商品信息" align="center" header-align="center">
              <template slot-scope="scope">
                <el-image style="width: 120px; height: 120px" :src="scope.row.goodsImg" fit="full"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" header-align="center"></el-table-column>
            <el-table-column prop="price" label="价格" width="120" align="center">
              <template slot-scope="scope">
                <span class="money">￥{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="140" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.inventory==0">亲！已卖光啦！</span>
                <el-input-number
                  size="small"
                  v-model="scope.row.num"
                  @change="ChangeNum(scope.row)"
                  :min="1"
                  :max="scope.row.inventory"
                  v-else
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              label="金额"
              width="160px"
              prop="totalprice"
              align="center"
              header-align="center"
            >
              <template slot-scope="scope">
                <span class="money2">￥{{scope.row.num*scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="info">
            <span>已选商品</span>
            <span class="price">{{multipleSelection.length}}</span>
            <span class="spanclass">件</span>
            <span>合计：</span>
            <span class="price">￥{{totalPrice}}</span>
          </div>
        </div>

        <div class="user-cart" v-show="active==2">
          <el-table
            :data="multipleSelection"
            stripe
            hightlight-current-row
            max-height="700"
            style="width:100%"
          >
            <el-table-column prop="goodsImg" label="商品信息" align="center" header-align="center">
              <template slot-scope="scope">
                <el-image style="width: 120px; height: 120px" :src="scope.row.goodsImg" fit="full"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" header-align="center"></el-table-column>
            <el-table-column prop="price" label="价格" width="120" align="center">
              <template slot-scope="scope">
                <span class="money">￥{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="140" align="center"></el-table-column>
            <el-table-column
              label="金额"
              width="160px"
              prop="totalprice"
              align="center"
              header-align="center"
            >
              <template slot-scope="scope">
                <span class="money2">￥{{scope.row.num*scope.row.price}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="info">
            <span>实付款：</span>
            <span class="price1">￥{{totalPrice}}</span>
          </div>
        </div>

        <div class="user-cart" v-show="active==3">
          <div class="showsuccess" v-if="orderResult.message=='支付成功'">
            <div class="suceessdiv">
              <span class="success-icon">
                <i class="el-icon-success"></i>
              </span>
              <p class="success-word">支付成功</p>
              <div class="orderInfo">
                <p class="orderInfo-tit">订单信息</p>
                <el-divider></el-divider>
                <p>
                  订单编号：
                  <span>{{orderResult.orderId}}</span>
                </p>
                <p>
                  支付金额：
                  <span>{{orderResult.totalPrice}}元</span>
                </p>
                <p>
                  下单时间：
                  <span>{{orderResult.tradeTime}}</span>
                </p>
                <p>
                  下单账户：
                  <span>{{userAccount}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="showfail" v-else>
            <div class="faildiv">
              <span class="fail-icon">
                <i class="el-icon-error"></i>
              </span>
              <p class="fail-word">支付失败</p>
              <div class="orderInfo">
                <p class="orderInfo-tit">详细信息</p>
                <el-divider></el-divider>
                <p>{{orderResult.message}}</p>
              </div>
            </div>
          </div>
          <el-button @click="gobackCart">返回商城</el-button>
        </div>

        <div class="info">
          <el-button
            type="primary"
            @click="next"
            :disabled="multipleSelection.length==0"
            v-if="active==1"
          >结算</el-button>
          <el-button v-if="active==2" @click="up">返回购物车</el-button>
          <el-button v-if="active==2" type="primary" @click="submitOrder">提交订单</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      active: 1,
      tableData: [
        {
          cartId: 1,
          goodsId: 20190004,
          goodsName: "泰迪幼犬狗粮",
          price: 33,
          inventory: 22,
          num: 2,
          goodsImg:
            "http://localhost:3004/petfile/imges/goodsphoto/093b462e-f711-413c-b072-8e175f6a39ff.jpg"
        },
        {
          cartId: 2,
          goodsId: 20190005,
          goodsName: "泰迪幼犬狗粮",
          price: 33,
          inventory: 22,
          num: 2,
          goodsImg:
            "http://localhost:3004/petfile/imges/goodsphoto/093b462e-f711-413c-b072-8e175f6a39ff.jpg"
        },
        {
          cartId: 3,
          goodsId: 20190006,
          goodsName: "泰迪幼犬狗粮",
          price: 33,
          inventory: 22,
          num: 2,
          goodsImg:
            "http://localhost:3004/petfile/imges/goodsphoto/093b462e-f711-413c-b072-8e175f6a39ff.jpg"
        }
      ],
      tableData2: [],
      multipleSelection: [],
      totalPrice: 0,
      orderResult:{}
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
    this.getUserGoodsCartList();
  },
  methods: {
    goBackShop() {
      this.$router.push({ path: "index" });
    },
    next() {
      this.active++;
    },
    up() {
      this.active--;
    },
    gobackCart() {
      this.$router.push({ path: "index" });
    },
    handleSelect(key) {
      //console.log(key, keyPath);
      if(this.userAccount==null){
        Message({
          type:'success',
          message:'请先登录'
        })
        return false;
      }
      this.$router.push({path:key});
    },
    ChangeNum(row) {
      //console.log("数量");
      //console.log(row);
      let cartId = row.cartId;
      let num = row.num;
      axios
        .post("http://localhost:3004/shopmall/changeUserCartNum", {
          cartId,
          num
        })
        .then(response => {
          console.log(response);
          this.$refs.goodsTable.clearSelection();
          this.totalPrice = 0;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("已选择");
      console.log(this.multipleSelection);
      let arr = this.multipleSelection;
      this.totalPrice = 0;
      for (let i = 0; i < arr.length; i++) {
        this.totalPrice = this.totalPrice + arr[i].num * arr[i].price;
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
      let cartId = row.cartId;
      axios
        .post("http://localhost:3004/shopmall/deleteUserGoodsCart", {
          cartId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "成功移除购物车"
            });
            this.getUserGoodsCartList();
          } else {
            Message({
              type: "error",
              message: "移除失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "移除服务失败"
          });
        });
    },
    getUserGoodsCartList() {
      let userId = this.userId;
      axios
        .post("http://localhost:3004/shopmall/getUserGoodsCartList", {
          userId
        })
        .then(response => {
          console.log(response);
          this.tableData2 = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitOrder() {
      let userId = this.userId;
      let totalPrice = this.totalPrice;
      let buyNum = this.multipleSelection.length;
      let goodsArray = this.multipleSelection;
      console.log("用户id>>>" + userId);
      console.log("总金额>>>>>" + totalPrice);
      console.log("商品数量>>>" + buyNum);
      console.log("商品数组>>>");
      console.log(goodsArray);
      let list = [];
      for (let i = 0; i < goodsArray.length; i++) {
        let obj = {};
        obj.cartId = goodsArray[i].cartId;
        obj.goodsId = goodsArray[i].cgoodsId;
        obj.price = goodsArray[i].price;
        obj.num = goodsArray[i].num;
        list.push(obj);
      }
      console.log(list);
      let params={
        userId,
        totalPrice,
        buyNum,
        goodsList: list
      };
      axios
        .post("http://localhost:3004/shopmall/createOrder",
          params
        )
        .then((response) => {
          console.log(response);
          if(response.status==200){
              this.orderResult=response.data;
              this.active++;
          }
          else{
            this.orderResult.message="亲！支付失败";
            this.active++;
          }

        })
        .catch(function(error) {
          console.log(error);
          this.orderResult.message="支付业务失败";
          this.active++;
        });
    },
    // eslint-disable-next-line no-unused-vars
    selectInit(row,index){
      //console.log(row,index);
      if(row.inventory==0){
        return false;//不可勾选
      }
      else{
        return true;//可勾选
      }
    }
  }
};
</script>


<style scoped>
.shopCart-container {
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

.Cart-back {
  font-size: 13px;
}
.Cart-tit {
  font-size: 22px;
  font-weight: bold;
  font-family: "微软雅黑";
  color: #303133;
}
.step {
  display: inline-block;
  width: 75%;
}

.money {
  font-size: 20px;
}
.money2 {
  font-size: 20px;
  font-weight: bold;
  color: #f40;
}

.info {
  display: block;
  text-align: right;
  margin-top: 20px;
  font-size: 17px;
}
.spanclass {
  margin-right: 20px;
}
.price {
  color: #f40;
  font-size: 18px;
  margin: 0 5px 0 5px;
}
.price1 {
  color: #f40;
  font-size: 30px;
  margin: 0 5px 0 5px;
}

/* 支付成功页面 */
.success-icon {
  font-size: 60px;
  color: #67c23a;
}
.success-word {
  margin-top: 10px;
  font-size: 32px;
  line-height: 32px;
  color: #67c23a;
}
.orderInfo {
  width: 400px;
  margin: 15px auto;
  text-align: left;
}
.orderInfo .orderInfo-tit {
  font-size: 17px;
  font-weight: bold;
  font-family: "Microsoft YaHei";
  text-align: center;
}
.orderInfo p {
  font-size: 16px;
  margin-bottom: 15px;
}
.orderInfo p span {
  font-size: 15px;
}

/* 支付失败 */
.fail-icon {
  font-size: 60px;
  color: #f56c6c;
}
.fail-word {
  margin-top: 10px;
  font-size: 32px;
  line-height: 32px;
  color: #f56c6c;
}
</style>