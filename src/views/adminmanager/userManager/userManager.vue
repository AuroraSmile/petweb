<template>
  <div>
    <div class="searchgood">
      <el-input
        class="search-input"
        placeholder="请输入要搜索的用户"
        prefix-icon="el-icon-search"
        v-model="searchText"
      ></el-input>
      <el-button type="primary" size="medium" @click="searchUser(1,pageSize)">搜索</el-button>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-edit"
        @click="registerDialogVisible =true"
      >添加用户</el-button>
    </div>
    <el-table
      :data="tableData2"
      stripe
      hightlight-current-row
      empty-text="暂无数据"
      max-height="700"
      style="width:100%"
    >
      <el-table-column prop="user_id" label="用户编号" width="90"></el-table-column>
      <el-table-column prop="account" label="账户" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" width="120"></el-table-column>
      <el-table-column prop="user_name" label="姓名" width="100" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="age" label="年龄" width="50"></el-table-column>
      <el-table-column prop="phoneCode" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="role" label="角色权限" width="50"></el-table-column>
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

    <!-- 用户添加 -->
    <el-dialog
      title="添加用户"
      :visible.sync="registerDialogVisible"
      width="350px"
      center
      @close="closehandler('registerForm')"
    >
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="registerForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input placeholder="请输入密码" v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="registerForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="registerForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-width="70px" prop="phone">
          <el-input v-model="registerForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="90px" prop="role">
          <el-input v-model.number="registerForm.role" placeholder="请输入角色权限1管2会3游"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetRegisterForm('registerForm')">取消</el-button>
        <el-button type="primary" @click="submitRegisterForm('registerForm')">添加</el-button>
      </div>
    </el-dialog>

    <!-- 用户编辑 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="350px"
      center
      @close="closehandler('editForm')"
    >
      <el-form :model="editForm" :rules="registerRules" ref="editForm">
        <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="editForm.account" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input placeholder="请输入密码" v-model="editForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="editForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-width="70px" prop="phone">
          <el-input v-model="editForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="90px" prop="role">
          <el-input v-model.number="editForm.role" placeholder="请输入角色权限1管2会3游"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetEditForm('editForm')">取消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      searchText: "",
      registerDialogVisible: false,
      editDialogVisible: false,
      formLabelWidth: "50px",
      tableData2: [],
      tableData: [
        {
          user_id: 20200001,
          account: "zzz",
          password: "asassas",
          user_name: "sasa",
          sex: "男",
          age: 22,
          phoneCode: "13145674589",
          email: "545176780@qq.com",
          role: 2
        },
        {
          user_id: 20200002,
          account: "zzz",
          password: "asassas",
          user_name: "sasa",
          sex: "男",
          age: 22,
          phoneCode: "13145674589",
          email: "545176780@qq.com",
          role: 2
        },
        {
          user_id: 20200003,
          account: "zzz",
          password: "asassas",
          user_name: "sasa",
          sex: "男",
          age: 22,
          phoneCode: "13145674589",
          email: "545176780@qq.com",
          role: 2
        }
      ],
      registerForm: {
        account: "",
        password: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        role: ""
      },
      editForm: {
        userId: "",
        account: "",
        password: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        role: ""
      },
      registerRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "change" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入手机号码");
              } else if (/^[1][0-9]{10}$/.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            }
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱" }
        ],
        role: [
          { required: true, message: "请输入角色权限", trigger: "blur" },
          { type: "number", message: "权限必须为数字值" }
        ]
      },
      pageSize: 10, //每页数量
      currentPage: 1, //当前页
      totalSize: 0 //总数量
    };
  },
  created() {
    let pageSize = this.pageSize;
    this.searchUser(1, pageSize);
  },
  methods: {
    searchUser(pageNum, pageSize) {
      console.log(pageNum, pageSize);
      let account = this.searchText;
      axios
        .post("http://localhost:3004/userManager/searchUser", {
          pageNum,
          pageSize,
          account
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
    handleEdit(index, row) {
      console.log(index, row);
      this.editDialogVisible = true;
      this.editForm.userId = row.user_id;
      this.editForm.account = row.account;
      this.editForm.password = row.password;
      this.editForm.name = row.user_name;
      this.editForm.sex = row.sex;
      this.editForm.age = row.age;
      this.editForm.phone = row.phoneCode;
      this.editForm.email = row.email;
      this.editForm.role = row.role;
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
          _this.deleteUserPost(row.user_id,_this);
          
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    deleteUserPost(userId,getThis){
        axios.post("http://localhost:3004/userManager/deleteUser",{
          userId
        })
        .then(response=>{
          console.log(response);
          if(response.data==1){
            Message({
            type: 'success',
            message: '删除成功!'
          });
          getThis.searchUser(getThis.currentPage,getThis.pageSize);
          }
          else{
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
      this.currentPage = val;
      this.searchUser(val, pageSize);
    },
    submitRegisterForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerPost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    registerPost() {
      axios
        .post("http://localhost:3004/userManager/addUser", {
          account: this.registerForm.account,
          password: this.registerForm.password,
          name: this.registerForm.name,
          sex: this.registerForm.sex,
          age: this.registerForm.age,
          phone: this.registerForm.phone,
          email: this.registerForm.email,
          role: this.registerForm.role
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (result.message == "添加成功") {
            Message({
              type: "success",
              message: "添加成功"
            });
            this.currentPage = 1;
            this.searchUser(this.currentPage, this.pageSize);
            this.registerDialogVisible = false;
            this.$refs["registerForm"].resetFields();
          } else {
            Message({
              type: "error",
              message: "用户已存在"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "添加服务失败"
          });
        });
    },
    closehandler(formName) {
      console.log("关闭Dialog的回调");
      this.$refs[formName].resetFields();
    },
    resetRegisterForm(formName) {
      this.$refs[formName].resetFields();
      this.registerDialogVisible = false;
    },
    submitEditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editUserPost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editUserPost() {
      console.log(this.editForm);
      axios
        .post("http://localhost:3004/userManager/updateUserInfo", {
          userId: this.editForm.userId,
          password: this.editForm.password,
          name: this.editForm.name,
          sex: this.editForm.sex,
          age: this.editForm.age,
          phone: this.editForm.phone,
          email: this.editForm.email,
          role: this.editForm.role
        })
        .then(response => {
          console.log(response);
          if (response.data == 1) {
            Message({
              type: "success",
              message: "修改成功"
            });
            this.searchUser(this.currentPage, this.pageSize);
            this.$refs["editForm"].resetFields();
            this.editDialogVisible = false;
          } else {
            Message({
              type: "error",
              message: "修改失败!"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
            type: "error",
            message: "修改服务失败!"
          });
        });
    },
    resetEditForm(formName) {
      this.$refs[formName].resetFields();
      this.editDialogVisible = false;
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