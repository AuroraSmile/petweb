<template>
  <el-container class="userOrder-container">
    <el-header height="90px">
      <div class="goShop">
        <el-page-header @back="goBackShop">
          <div class="userOrder-back" slot="title">返回商城</div>
          <div class="userOrder-tit" slot="content">我的订单</div>
        </el-page-header>
      </div>
      <div class="searchOrders">
        <el-select class="search-select" v-model="selectValue" placeholder="请选择订单状态">
          <el-option label="所有状态" value></el-option>
          <el-option label="未发货" value="未发货"></el-option>
          <el-option label="已发货" value="已发货"></el-option>
          <el-option label="已签收" value="已签收"></el-option>
        </el-select>
        <el-button type="primary" @click="searchOrder(1,pageSize)">搜索</el-button>
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
          <el-menu-item index="shopCart">购物车</el-menu-item>
          <el-menu-item index="3" disabled>订单中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="userOrder-container">
          <el-table
            :data="tableData2"
            stripe
            hightlight-current-row
            empty-text="暂无数据"
            max-height="700"
            style="width:100%"
          >
            <el-table-column prop="order_id" label="订单编号" align="center" header-align="center"></el-table-column>
            <el-table-column prop="trade_time" label="下单时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="goodsNum" label="商品数量" width="100"></el-table-column>
            <el-table-column prop="totalPrice" label="总金额" width="120" align="center">
              <template slot-scope="scope">
                <span class="money">￥{{scope.row.totalPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="order_status" label="订单状态" width="140" align="center">
              <template slot-scope="scope">
                <span :class="statusColor(scope.row)">{{scope.row.order_status}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  :disabled="scope.row.order_status=='未发货'||scope.row.order_status=='已签收'"
                  @click="changeOrderStatus(scope.$index, scope.row)"
                >签收</el-button>
                <el-button size="mini" type="info" @click="ordersDetail(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page" v-show="tableData2.length!=0">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalSize"
          ></el-pagination>
        </div>

        <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
          <el-table :data="gridData2">
            <el-table-column property="goodsImg" label="商品信息" align="center" header-align="center">
              <template slot-scope="scope">
                <el-image style="width: 80px; height: 80px" :src="scope.row.goodsImg" fit="full"></el-image>
              </template>
            </el-table-column>
            <el-table-column property="goodsName" header-align="center"></el-table-column>
            <el-table-column property="goodsPrice" label="价格" width="100" align="center">
              <template slot-scope="scope">
                <span>￥{{scope.row.goodsPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column property="goodsNum" label="数量" width="80" align="center"></el-table-column>
            <el-table-column
              label="金额"
              width="120px"
              property="totalprice"
              align="center"
              header-align="center"
            >
              <template slot-scope="scope">
                <span>￥{{scope.row.goodsNum*scope.row.goodsPrice}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
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
      selectValue: "",
      dialogTableVisible: false,
      tableData2:[],
      tableData: [
        {
          order_id: "1230751872843776000",
          trade_time: "2020-02-21 15:11:27",
          goodsNum: 3,
          totalPrice: 340,
          order_status: "未发货"
        },
        {
          order_id: "1230751872843776001",
          trade_time: "2020-02-21 15:11:27",
          goodsNum: 3,
          totalPrice: 340,
          order_status: "已发货"
        },
        {
          order_id: "1230751872843776002",
          trade_time: "2020-02-21 15:11:27",
          goodsNum: 3,
          totalPrice: 340,
          order_status: "已签收"
        },
        {
          order_id: "1230751872843776003",
          trade_time: "2020-02-21 15:11:27",
          goodsNum: 3,
          totalPrice: 340,
          order_status: "未发货"
        }
      ],
      gridData: [
        {
          ggoods_id: 2001,
          goodsImg:
            "http://localhost:3004/petfile/imges/goodsphoto/644cdeaf-6df6-4eed-ac9b-540e3abb08aa.jpg",
          goodsName: "怡亲Yoken 小型犬成犬粮 2.5kg",
          goodsPrice: 22,
          goodsNum: 3
        },
        {
          ggoods_id: 2002,
          goodsImg:
            "http://localhost:3004/petfile/imges/goodsphoto/644cdeaf-6df6-4eed-ac9b-540e3abb08aa.jpg",
          goodsName: "怡亲Yoken 小型犬成犬粮 2.5kg",
          goodsPrice: 22,
          goodsNum: 3
        }
      ],
      gridData2:[],
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
      await this.searchOrder(1,pageSize);
  },
  methods: {
   async searchOrder(pageNum, pageSize) {
        let userId=this.userId;
        let status=this.selectValue;
       await axios.post("http://localhost:3004/shopmall/searchUserOrders",{
            pageNum,
            pageSize,
            userId,
            status
        })
        .then((response)=>{
            console.log(response);
            this.totalSize=response.data.totalSize;
            this.tableData2=response.data.content;
            console.log(this.tableData2);
        })
        .catch(function(error){
            console.log(error);
        })

    },
    goBackShop() {
      this.$router.push({ path: "index" });
    },
    gobackCart() {
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
      this.searchOrder(val,pageSize);
    
    },
    changeOrderStatus(index, row) {
      console.log(index, row);
      let orderId=row.order_id;
      let status="已签收";
      axios.post("http://localhost:3004/shopmall/changeOrdersStatus",{
          orderId,
          status
      })
      .then((response)=>{
          console.log(response);
          if(response.data==1){
              Message({
                  type:'success',
                  message:'签收成功'
              })
            this.searchOrder(this.currentPage,this.pageSize);
          }
          else{
              Message({
                  type:'error',
                  message:'签收失败'
              })
          }
      })
      .catch(function(error){
          console.log(error);
          Message({
                  type:'error',
                  message:'签收服务失败'
              })
      })
    },
    ordersDetail(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
      let orderId=row.order_id;
      axios.post("http://localhost:3004/shopmall/getOrdersDetail",{
          orderId
      })
      .then((response)=>{
          console.log(response);
          this.gridData2=response.data;
      })
      .catch(function(error){
          console.log(error);
      })
    },
    statusColor(row) {
      if (row.order_status == "未发货") {
        return "meifahuo";
      } else if (row.order_status == "已发货") {
        return "fahuo";
      } else {
        return "qianshou";
      }
    }
  }
};
</script>


<style scoped>
.userOrder-container {
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
.searchOrders {
  margin-top: 16px;
  margin-left: 150px;
}

.userOrder-back {
  font-size: 13px;
}
.userOrder-tit {
  font-size: 22px;
  font-weight: bold;
  font-family: "微软雅黑";
  color: #303133;
}

.money {
  font-size: 16px;
  color: #f40;
}

.meifahuo {
  color: #909399;
}
.fahuo {
  color: #f56c6c;
}
.qianshou {
  color: #67c23a;
}
.page{
    margin-top: 10px;
}
</style>