<template>
    <div>
        <el-container>
            <el-header>
                <div class="tab-header">
                <el-button type="primary" @click="goSearch()">文章搜索</el-button>
                <el-button type="primary" @click="goAdd()">文章添加</el-button>
                <el-button type="primary" @click="goColumn()">文章栏目管理</el-button>
                </div>  
          </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>


<script>
export default {
    data(){
        return {
           
        }
    },
    methods:{
        goSearch(){
            this.$router.push('articeSearch');
        },
        goAdd(){
            this.$router.push('articeAdd');
        },
        goColumn(){
            this.$router.push('articeColumn');
        }
    }
}
</script>



<style scoped>

.el-container{
    line-height: 16px;
}
  .el-header{
    color: #333;
    text-align: left;
  }
  
  .el-main {
    padding: 14px 0;
    background-color: #fff;
    color: #333;
    text-align: center;
  }
  .tab-header{
      width: 400px;
  }
</style>