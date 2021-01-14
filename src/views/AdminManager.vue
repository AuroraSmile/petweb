<template>
    <el-container>
         <el-header height="40px" class="m-header">
             <h4>宠物狗网站管理员页面</h4>
            <div class="m-header-r">
                <span @click="gohome()">首页</span>
            </div>
        </el-header>
  
  <el-container style="height:600px">
   <el-aside width="200px">
       <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
       @select="handleSelect"
       default-active="dogManager">
             <el-menu-item index="dogManager">
                <i class="el-icon-setting"></i>
                 <span>狗狗管理</span>
            </el-menu-item>
               <el-menu-item index="articeManager/articeSearch">
                   <i class="el-icon-setting"></i>
                 <span>文章管理</span>
               </el-menu-item>
               <el-menu-item index="goodManager">
                    <i class="el-icon-setting"></i>
                 <span>商品管理</span>
               </el-menu-item>
               <el-menu-item index="orderManager">
                   <i class="el-icon-setting"></i>
                 <span>订单管理</span>
               </el-menu-item>
               <el-menu-item index="userManager">
                   <i class="el-icon-setting"></i>
                 <span>用户管理</span>
               </el-menu-item>
       </el-menu>
   </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>


<script>
export default {
    data(){
        return {}
    },
    methods:{
        gohome(){
            this.$router.push('/');
        },
        handleSelect(key){
            console.log(key);
            this.$router.push('/adminManager/'+key);
        }
    }
}
</script>


<style scoped>
.el-header{
    background-color: #545c64;
    color: #dddddd;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    padding: 0 30px;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
.el-container{
    margin-top:20px;
}
.m-header h4{
    float: left;
    color: #fff;
}
.m-header-r{
    float: right;
    color: #fff;
    cursor: pointer;
}
</style>