<template>
  <div>
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
      <el-button type="primary" size="medium" @click="searchgood(1,pageSize)">搜索</el-button>
      <el-button type="primary" size="medium" icon="el-icon-edit" @click="dialogVisible=true">添加商品</el-button>
    </div>
    <el-table
      :data="tableData2"
      stripe
      hightlight-current-row
      empty-text="暂无数据"
      max-height="700"
      style="width:100%"
    >
      <el-table-column prop="goodsId" label="商品编号" width="120"></el-table-column>
      <el-table-column prop="goodsName" label="名称" align="center">
        <template slot-scope="scopeName">
          <span>{{scopeName.row.goodsName}}</span>
          <el-popover placement="right" trigger="click">
            <el-image style="width: 200px; height: 210px" :src="scopeName.row.goodsImg" fit="fill"></el-image>
            <i class="el-icon-picture icon" slot="reference"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="goodsType" label="商品类型" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="120" align="center"></el-table-column>
      <el-table-column prop="inventory" label="库存" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalSize"
      ></el-pagination>
    </div>


    <!-- 添加商品 -->
    <el-dialog
      title="添加商品信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center
    >
      <el-form :model="goodsform" ref="goodsForm" :rules="goodsrules">
        <el-form-item label="商品图片" label-width="80px" prop="goodsImg">
          <el-upload
            :http-request="uploadGoods"
            :show-file-list="false"
            class="avatar-uploader"
            action
            :on-success="uploadSuccess"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <img v-if="goodsform.goodsImg" :src="goodsform.goodsImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
          <el-input v-model="goodsform.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" :label-width="formLabelWidth" prop="goodsType">
          <el-select v-model="goodsform.goodsType" placeholder="请选择商品种类">
            <el-option
              v-for="item in addOptions"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="goodsform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth" prop="inventory">
          <el-input v-model.number="goodsform.inventory" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetGoodsForm('goodsForm')">取 消</el-button>
        <el-button type="primary" @click="submitGoodsForm('goodsForm')">添加</el-button>
      </span>
    </el-dialog>


    <!-- 编辑商品 -->
    <el-dialog
      title="编辑商品信息"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="edithandleClose"
      center
    >
      <el-form :model="editform" ref="editForm" :rules="goodsrules">
        <el-form-item label="商品图片" label-width="80px" prop="goodsImg">
          <el-upload
            :http-request="uploadGoods"
            :show-file-list="false"
            class="avatar-uploader"
            action
            :on-success="editUploadSuccess"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <img v-if="editform.goodsImg" :src="editform.goodsImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
          <el-input v-model="editform.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" :label-width="formLabelWidth" prop="goodsType">
          <el-select v-model="editform.goodsType" placeholder="请选择商品种类">
            <el-option
              v-for="item in addOptions"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="editform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth" prop="inventory">
          <el-input v-model.number="editform.inventory" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetEditGoodsForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditGoodsForm('editForm')">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      searchText: "",
      selectValue: "",
      dialogVisible: false,//添加商品弹框
      editDialogVisible:false,//编辑商品弹框
      options: [],
      addOptions: [],
      tableData: [
        {
          goodsId: 20190001,
          goodsName: "啊飒飒飒飒",
          goodsType: "狗狗主食",
          price: 320,
          inventory: 22,
          goodsImg:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          goodsId: 20190002,
          goodsName: "啊飒飒飒飒",
          goodsType: "狗狗主食",
          price: 320,
          inventory: 22,
          goodsImg:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
      ],
      tableData2: [],
      goodsform: {
        goodsName: "",
        goodsType: "",
        price: "",
        inventory: "",
        goodsImg: ""
      },
      goodsrules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsType: [
          { required: true, message: "请输入商品类型", trigger: "change" }
        ],
        price: [
          { required: true, message: "价格不能为空" },
          { type: "number", message: "价格必须为数字值" }
        ],
        inventory: [
          { required: true, message: "库存不能为空" },
          { type: "number", message: "库存必须为数字值" }
        ],
        goodsImg: [
          { required: true, message: "请上传商品图片", trigger: "blur" }
        ]
      },
      editform: {
        goodsId:"",
        goodsName: "",
        goodsType: "",
        price: "",
        inventory: "",
        goodsImg: ""
      },
      formLabelWidth: "80px",
      pageSize: 10, //每页数量
      currentPage: 1, //当前页
      totalSize: 0 //总数量
    };
  },
  async created() {
    let pageSize = this.pageSize;
    await this.searchgood(1, pageSize);
    this.getGoodsType();
  },
  methods: {
    async searchgood(pageNum, pageSize) {
      console.log(this.searchText);
      console.log(this.selectValue);
      let goodsName = this.searchText;
      let goodsType = this.selectValue;
      await axios
        .post("http://localhost:3004/shopManager/searchGoods", {
          pageNum,
          pageSize,
          goodsName,
          goodsType
        })
        .then(response => {
          console.log(response);
          this.totalSize = response.data.totalSize;
          this.tableData2 = response.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGoodsType() {
      axios
        .get("http://localhost:3004/shopManager/getGoodsType")
        .then(response => {
          console.log(response);
          let list = [];
          let obj = {
            label: "所有类型",
            value: ""
          };
          list.push(obj);
          let result = response.data;
          this.addOptions = response.data;
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
    handleEdit(index, row) {
      console.log(index, row);
      this.editDialogVisible=true;
      this.editform.goodsId=row.goodsId;
      this.editform.goodsName=row.goodsName;
      this.editform.goodsType=row.goodsType;
      this.editform.price=row.price;
      this.editform.inventory=row.inventory;
      this.editform.goodsImg=row.goodsImg;
    },
    handleDelete(index, row) {
      let _this=this;
         this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("handleDelete");
        console.log(index, row);
          _this.deleteGoodsPost(row.goodsId,_this);
          
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    deleteGoodsPost(goodsId,getThis){
        console.log(goodsId);
        axios.post('http://localhost:3004/shopManager/deleteGoods',{
          goodsId
        })
        .then((response)=>{
          console.log(response);
          if(response.data==1){
            Message({
            type: 'success',
            message: '删除成功!'
          });
          //getThis.currentPage=1;
        getThis.searchgood(getThis.currentPage,getThis.pageSize);
          }
          else if(response.data==0){
              Message({
            type: 'error',
            message: '删除失败!'
          });
          }
        })
        .catch(function(error){
          console.log(error);
          Message({
            type: 'error',
            message: '删除服务失败!'
          });
        })
    },
    handleCurrentChange(val) {
      let pageSize = this.pageSize;
      this.currentPage=val;
      this.searchgood(val, pageSize);
    },

    //商品上传
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$refs["goodsForm"].resetFields();
          done();
        })
        .catch(() => {});
    },
    submitGoodsForm(formName) {
      console.log("表单提交");
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this=this;
          console.log(this.goodsform);
          this.addGoodsPost(_this);
          
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    addGoodsPost(getThis){
      axios.post('http://localhost:3004/shopManager/addGoods',{
        goodsName:this.goodsform.goodsName,
        goodsType:this.goodsform.goodsType,
        price:this.goodsform.price,
        inventory:this.goodsform.inventory,
        goodsImg:this.goodsform.goodsImg
      })
      .then((response)=>{
        console.log(response);
        getThis.currentPage=1;
        getThis.searchgood(getThis.currentPage,getThis.pageSize);
        getThis.$refs['goodsForm'].resetFields();
        getThis.dialogVisible=false;
        Message({
            type: 'success',
            message: '添加成功!'
          });
      })
      .catch(function(error){
        console.log(error);
        Message({
            type: 'error',
            message: '添加服务失败!'
          });
      })
    },
    resetGoodsForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    uploadGoods(file) {
      console.log(file);
      let fileObj = file.file;
      let formdata = this.getFileFormData(fileObj);
      axios({
        url: "http://localhost:3004/shopManager/uploadGoodsFile",
        method: "post",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          console.log("商品上传成功");
          console.log(response);
          file.onSuccess(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    uploadSuccess(res, file, fileList) {
      console.log("uploadSuccess回调");
      console.log(res, file, fileList);
      this.goodsform.goodsImg = res.data.url;
    },
    getFileFormData(fileObj) {
      let formdata = new FormData();
      formdata.append("imgfile", fileObj);
      return formdata;
    },
    //商品上传结束

    //编辑商品
    edithandleClose(done){
      this.$confirm("确认关闭？")
        .then(() => {
          this.$refs["editForm"].resetFields();
          done();
        })
        .catch(() => {});
    },
    editUploadSuccess(res, file, fileList){
      console.log("editUploadSuccess回调");
      console.log(res, file, fileList);
      this.editform.goodsImg = res.data.url;
    },
    resetEditGoodsForm(formName){
      this.$refs[formName].resetFields();
      this.editDialogVisible = false;
    },
    submitEditGoodsForm(formName){
       console.log("表单提交");
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this=this;
          console.log(this.editform);
          this.editGoodsPost(_this);
          
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    editGoodsPost(getThis){
      axios.post('http://localhost:3004/shopManager/updateGoods',{
        goodsId:this.editform.goodsId,
        goodsName:this.editform.goodsName,
        goodsType:this.editform.goodsType,
        price:this.editform.price,
        inventory:this.editform.inventory,
        goodsImg:this.editform.goodsImg
      })
      .then((response)=>{
        console.log(response);
        if(response.data==1){
                Message({
            type: 'success',
            message: '修改成功!'
          });
          getThis.searchgood(getThis.currentPage,getThis.pageSize);
        getThis.$refs['editForm'].resetFields();
        getThis.editDialogVisible=false;
            }
            else{
               Message({
            type: 'error',
            message: '修改失败!'
          });
            }
      })
      .catch(function(error){
        console.log(error);
         Message({
            type: 'error',
            message: '修改服务失败!'
          });
      })
    }
  }
};
</script>


<style scoped>
.searchgood {
  text-align: left;
  margin-bottom: 15px;
}
.search-input {
  width: 200px;
}
.search-select {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
<style>
.avatar-uploader .el-upload__input {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 208px;
  height: 210px;
  display: block;
}
.upload-demo2 .el-upload__input {
  display: none;
}
</style>