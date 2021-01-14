<template>
  <div>
    <el-container>
      <el-header height>
        <div class="top">
          <div class="biaoti">
            <span class="fa fa-paw" aria-hidden="true"></span>Pets Home
          </div>
          <div class="top-right">
            <span v-if="role==1" @click="goManger()">管理员</span>
            <span v-if="role==3" class="login" @click="loginDialogVisible=true">登录</span>
            <span v-if="role==3" class="regsiter" @click="registerDialogVisible =true">注册</span>
            <span v-if="userAccount" class="userAccount">{{userAccount}}</span>
            <div v-if="userAccount" class="user">
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <el-avatar class="user-ava" icon="el-icon-user-solid" size="small"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command='userInfo'>个人信息</el-dropdown-item>
                  <el-dropdown-item command='exit'>退出登录</el-dropdown-item>
                  <el-dropdown-item command='about'>关于</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="middle">
          <img src="../assets/images/banner3.jpg" alt="狗-海边" />
          <h2>Pets Home</h2>
          <nav>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo navmenu"
              mode="horizontal"
              background-color="rgba(6, 6, 6, 0.47)"
              text-color="#fff"
              @select="goPage"
              active-text-color="#fff"
            >
              <!-- <el-menu-item index="/">首页</el-menu-item> -->
              <el-menu-item index="/encyclopedia/index">狗狗百科</el-menu-item>
              <el-menu-item index="/community/index">狗狗社区</el-menu-item>
              <el-menu-item index="/videoplay/index">狗狗视频</el-menu-item>
              <el-menu-item index="/shopmall/index">狗狗商城</el-menu-item>
              <el-menu-item index="/test">测试</el-menu-item>
            </el-menu>
          </nav>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height>
        <div>
          <span>pets home</span>
          <span>@2020 patpat</span>
        </div>
        <div>Copyright © pets home 版权所有</div>
      </el-footer>
    </el-container>
    <!-- 用户登录 -->
    <el-dialog title="用户登录" :visible.sync="loginDialogVisible" width="350px" center>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="forget-pwd" @click="forgetPassword">忘记密码？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetLoginForm('loginForm')">取消</el-button>
        <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
      </div>
    </el-dialog>

    <!-- 找回密码 -->
    <el-dialog title="找回密码" :visible.sync="forgetPwdDialogVisible" width="350px" center>
      <el-form :model="forgetForm" :rules="forgetRules" ref="forgetForm">
        <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="forgetForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="forgetForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goBackLoginForm">返回登录</el-button>
        <el-button type="primary" @click="submitEmailForm('forgetForm')">发送邮件</el-button>
      </div>
    </el-dialog>

    <!-- 用户注册 -->
    <el-dialog title="用户注册" :visible.sync="registerDialogVisible" width="350px" center @close="closehandler('registerForm')">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetRegisterForm('registerForm')">取消</el-button>
        <el-button type="primary" @click="submitRegisterForm('registerForm')">注册</el-button>
      </div>
    </el-dialog>

    <!-- 用户信息修改 -->
    <el-dialog title="信息修改" :visible.sync="modifyDialogVisible" width="350px" center @close="closehandler('modifyForm')">
      <el-form :model="modifyForm" :rules="registerRules" ref="modifyForm">
        <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="modifyForm.account" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input placeholder="请输入密码" v-model="modifyForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="modifyForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="modifyForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="modifyForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-width="70px" prop="phone">
          <el-input v-model="modifyForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="modifyForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetModifyForm('modifyForm')">取消</el-button>
        <el-button type="primary" @click="submitModifyForm('modifyForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  name: "LayoutDefault",
  data() {
    return {
      activeIndex: "/encyclopedia/index",
      loginDialogVisible: false,
      registerDialogVisible: false,
      forgetPwdDialogVisible:false,
      modifyDialogVisible:false,
      loginForm: {
        account: "",
        password: ""
      },
      registerForm: {
        account: "",
        password: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: ""
      },
      forgetForm:{
        account: "",
        email: ""
      },
      modifyForm:{
        account: "",
        password: "",
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: ""
      },
      forgetRules:{
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱" }
        ]
      },
      formLabelWidth: "50px",
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
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
        ]
      }
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
  methods: {
    goPage(key) {
      //console.log(key, keyPath);
      this.$router.push(key);
    },
    goManger() {
      this.$router.push("/adminManager/dogManager");
    },
    handleCommand(command){
      if(command=="exit"){
        this.exitLogin();
      }
      else if(command=="about"){
        console.log('about');
      }
      else if(command=="userInfo"){
        this.getUserInfo();
      }
    },
    exitLogin() {
      this.$store.commit("user/exitUserData");
      Message({
        type: "success",
        message: "登出成功"
      });
    },
    getUserInfo(){
      let userId=this.userId;
      axios.post("http://localhost:3004/user/getUserInfo",{
        userId
      })
      .then(response=>{
        console.log(response);
        let obj=response.data;
        this.modifyForm.account=obj.account;
        this.modifyForm.password=obj.password;
        this.modifyForm.name=obj.user_name;
        this.modifyForm.sex=obj.sex;
        this.modifyForm.age=obj.age;
        this.modifyForm.phone=obj.phoneCode;
        this.modifyForm.email=obj.email;
        this.modifyDialogVisible=true;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    submitLoginForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginPost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginPost() {
      axios
        .post("http://localhost:3004/user/login", {
          account: this.loginForm.account,
          password: this.loginForm.password
        })
        .then(response => {
          console.log(response);
          let res = response.data;
          if (res.message == "登录成功") {
            let data = res.result[0];
            this.$store.commit("user/updateUserData", {
              account: data.account,
              user_id: data.user_id,
              role: data.role
            });
            Message({
              type: "success",
              message: "登录成功!"
            });
            this.loginDialogVisible = false;
          } else {
            Message({
              type: "error",
              message: "用户名或密码错误!"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          Message({
              type: "error",
              message: "登录服务失败!"
            });
        });
    },
    resetLoginForm(formName) {
      this.$refs[formName].resetFields();
      this.loginDialogVisible = false;
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
    registerPost(){
      axios.post('http://localhost:3004/user/register',{
         account:this.registerForm.account,
        password: this.registerForm.password,
        name: this.registerForm.name,
        sex: this.registerForm.sex,
        age:this.registerForm.age,
        phone: this.registerForm.phone,
        email: this.registerForm.email
      })
      .then((response)=>{
        console.log(response);
        let result=response.data;
        if(result.message=="添加成功"){
          Message({
            type:'success',
            message:'注册成功'
          })
          this.registerDialogVisible = false;
          this.$refs['registerForm'].resetFields();
        }
        else{
          Message({
            type:'error',
            message:'用户已存在'
          })
        }
      })
      .catch(function(error){
        console.log(error);
        Message({
            type:'error',
            message:'注册服务失败'
          })
      })
    },
    closehandler(formName){
      console.log("关闭Dialog的回调");
      this.$refs[formName].resetFields();
    },
    resetRegisterForm(formName) {
      this.$refs[formName].resetFields();
      this.registerDialogVisible = false;
    },
    forgetPassword(){
      this.$refs['loginForm'].resetFields();
      this.loginDialogVisible = false;
      this.forgetPwdDialogVisible=true;
    },
    goBackLoginForm(){
        this.$refs['forgetForm'].resetFields();
      this.loginDialogVisible = true;
      this.forgetPwdDialogVisible=false;
    },
    submitEmailForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('找回密码');
          this.findUserPasswordPost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    findUserPasswordPost(){
      axios.post("http://localhost:3004/user/findUserPassword",{
        account:this.forgetForm.account,
        email:this.forgetForm.email
      })
      .then(response=>{
        console.log("找回密码成功");
        console.log(response);
        if(response.data=='邮件发送成功'){
          Message({
            type:'success',
            message:'邮件发送成功'
          })
          this.$refs['forgetForm'].resetFields();
        }
        else if(response.data=="用户账户不存在"){
            Message({
            type:'error',
            message:'用户账户不存在'
          })
        }
        else if(response.data=="邮箱不存在"){
          Message({
            type:'error',
            message:'邮箱不存在'
          })
        }
        else{
          Message({
            type:'error',
            message:'发送邮件失败'
          })
        }
      })
      .catch(function(error){
        console.log(error);
        Message({
            type:'error',
            message:'发送邮件服务失败'
          })
      })
    },
    resetModifyForm(formName) {
      this.$refs[formName].resetFields();
      this.modifyDialogVisible = false;
    },
    submitModifyForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.modifyUserInfoPost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    modifyUserInfoPost(){
      console.log("用户信息修改");
      console.log(this.modifyForm);
      axios.post("http://localhost:3004/user/updateUserInfo",{
        account:this.modifyForm.account,
        password:this.modifyForm.password,
        name:this.modifyForm.name,
        sex:this.modifyForm.sex,
        age:this.modifyForm.age,
        phone:this.modifyForm.phone,
        email:this.modifyForm.email
      })
      .then(response=>{
        console.log(response);
        if(response.data==1){
          Message({
            type:'success',
            message:'修改成功'
          })
          this.$refs['modifyForm'].resetFields();
      this.modifyDialogVisible = false;
        }
        else{
          Message({
            type:'success',
            message:'修改失败'
          })
        }
      })
      .catch(function(error){
        console.log(error);
        Message({
            type:'success',
            message:'修改服务失败'
          })
      })
    }

  }
};
</script>


<style scoped src="../../public/css/font-awesome.css"></style>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-footer{
  font-size: 14px;
  background-color: #fff;
  line-height: 20px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.top {
  height: 55px;
  background-color: #ffffff;
  overflow: hidden;
  padding: 5px 30px;
  box-sizing: border-box;
}
.biaoti {
  float: left;
  font-family: "Helvetica Neue", Helvetica;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 45px;
}

/* 脚印样式 */
.biaoti span {
  font-size: 30px;
}

.top-right {
  float: right;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
}
.top-right span {
  display: inline-block;
  font-family: "PingFang SC";
  font-size: 17px;
  margin-right: 15px;
  cursor: pointer;
  color: #606266;
}

.top-right span:hover {
  color: #409eff;
}

.top-right .userAccount {
  margin-right: 5px;
}
.user {
  display: inline-block;
  height: 45px;
  width: 50px;
}

.user .user-ava {
  color: #fff;
  vertical-align: middle;
  margin-top: -4px;
}

.middle {
  position: relative;
  height: 400px;
}

.middle img {
  height: 100%;
  width: 100%;
}
.middle h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  color: #fff;
  letter-spacing: 15px;
  font-family: "Limelight", cursive;
  font-weight: 600;
}

.middle nav {
  width: 500px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.middle .navmenu {
  font-family: "PingFang SC", "Hiragino Sans GB";
}
.middle .navmenu .el-menu-item {
  width: 125px;
  padding: 0 20px;
}
.middle .navmenu .el-menu-item:hover {
  background-color: #ff5722 !important;
}
.middle .navmenu .is-active {
  border-bottom-color: #ff5722 !important;
  background-color: #ff5722 !important;
}

.el-main {
  padding: 20px 60px;
  background-color: #fff;
}

/* Dialog样式 */
.forget-pwd {
  width: 100px;
  margin: 0 auto;
  font-size: 13px;
  color: #409eff;
  cursor: pointer;
}
</style>