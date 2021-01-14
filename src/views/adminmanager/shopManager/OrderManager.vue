<template>
  <div>
    <div class="searchOrder">
      <span class="search-span">订单账户:</span>
      <el-input
        class="search-input"
        placeholder="请输入要搜索的订单账户"
        prefix-icon="el-icon-search"
        v-model="AccountText"
      ></el-input>
      <span class="search-span">订单号:</span>
      <el-input
        class="search-input"
        placeholder="请输入要搜索的订单号"
        prefix-icon="el-icon-search"
        v-model="OrderIdText"
      ></el-input>
      <el-select class="search-select" v-model="selectValue" placeholder="请选择订单状态">
        <el-option label="所有状态" value></el-option>
        <el-option label="未发货" value="未发货"></el-option>
        <el-option label="已发货" value="已发货"></el-option>
        <el-option label="已签收" value="已签收"></el-option>
      </el-select>
      <el-button type="primary" size="medium" @click="searchOrders(currentPage=1,pageSize)">搜索</el-button>
    </div>
    <div class="order-container">
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
        <el-table-column prop="goodsNum" label="商品数量" width="100" align="center"></el-table-column>
        <el-table-column prop="totalPrice" label="总金额" width="120" align="center">
          <template slot-scope="scope">
            <span class="money">￥{{scope.row.totalPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="下单账户" width="130"></el-table-column>
        <el-table-column prop="order_status" label="订单状态" width="100" align="center">
          <template slot-scope="scope">
            <span :class="statusColor(scope.row)">{{scope.row.order_status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.order_status=='已发货'||scope.row.order_status=='已签收'"
              @click="changeOrderStatus(scope.$index, scope.row)"
            >发货</el-button>
            <el-button size="mini" type="info" @click="ordersDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="deleteOrders(scope.$index, scope.row)">删除</el-button>
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
      <el-table :data="gridData">
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
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      AccountText: "",
      OrderIdText: "",
      selectValue: "",
      tableData2: [],
      tableData: [
        {
          goodsNum: 2,
          account: "zmt",
          order_id: "1231101922325299201",
          order_status: "未发货",
          ouser_id: 20200019,
          totalPrice: 252,
          trade_time: "2020-02-22 14:22:25"
        },
        {
          goodsNum: 2,
          account: "zmt",
          order_id: "1231101922325299202",
          order_status: "未发货",
          ouser_id: 20200019,
          totalPrice: 252,
          trade_time: "2020-02-22 14:22:25"
        },
        {
          goodsNum: 2,
          account: "zmt",
          order_id: "1231101922325299203",
          order_status: "未发货",
          ouser_id: 20200019,
          totalPrice: 252,
          trade_time: "2020-02-22 14:22:25"
        }
      ],
      dialogTableVisible: false,
      gridData: [],
      pageSize: 10, //每页数量
      currentPage: 1, //当前页
      totalSize: 0 //总数量
    };
  },
  async created() {
    let pageSize = this.pageSize;
    await this.searchOrders(1, pageSize);
  },
  methods: {
    async searchOrders(pageNum, pageSize) {
      let account = this.AccountText;
      let orderId = this.OrderIdText;
      let status = this.selectValue;
      await axios
        .post("http://localhost:3004/shopManager/searchOrders", {
          pageNum,
          pageSize,
          orderId,
          account,
          status
        })
        .then(response => {
          console.log(response);
          this.totalSize = response.data.totalSize;
          this.tableData2 = response.data.content;
          console.log(this.tableData2);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      let pageSize = this.pageSize;
      this.currentPage = val;
      this.searchOrders(val, pageSize);
    },
    changeOrderStatus(index, row) {
      console.log(index, row);
      let orderId = row.order_id;
      let status = "已发货";
      axios
        .post("http://localhost:3004/shopManager/changeOrderStatus", {
          orderId,
          status
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "发货成功"
            });
            this.searchOrders(this.currentPage, this.pageSize);
          } else {
            Message({
              type: "error",
              message: "发货失败"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "发货服务失败"
          });
        });
    },
    ordersDetail(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
      let orderId = row.order_id;
      axios
        .post("http://localhost:3004/shopManager/getUserOrdersDetail", {
          orderId
        })
        .then(response => {
          console.log(response);
          this.gridData = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteOrders(index, row) {
      let _this = this;
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("deleteOrders");
          console.log(index, row);
          _this.deleteOrdersPost(row.order_id, _this);
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteOrdersPost(orderId, getThis) {
      axios
        .post("http://localhost:3004/shopManager/deleteUserOrders", {
          orderId
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "删除成功!"
            });
            getThis.searchOrders(getThis.currentPage, getThis.pageSize);
          } else {
            Message({
              type: "error",
              message: "删除失败!"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "删除服务失败!"
          });
        });
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
.searchOrder {
  text-align: left;
  margin-bottom: 15px;
}
.search-input {
  width: 200px;
  margin-right: 8px;
}
.search-select {
  margin-left: 5px;
  margin-right: 5px;
}
.search-span {
  font-size: 14px;
  margin-right: 8px;
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
</style>
