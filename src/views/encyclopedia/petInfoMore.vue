<template>
    <el-container>
        <el-header>
            <div class="search">
                <div class="searchText">
                    <el-input v-model="searchText" size="medium"  placeholder="请输入宠物名称" prefix-icon="el-icon-search"></el-input> 
                </div>
                 <el-button type="primary" size="medium" icon="el-icon-search" @click="textSearch(1,pageSize)">搜索</el-button>
            </div>
        </el-header>
           <el-container>
               <el-main>
                   <div v-if="dogList.length!=0">
                   <ul>
                <li class="dog-box" v-for="item in dogList" :key="item.dogNo">
                    <div class="dog-l">
                        <img :src="localHost+item.dogImg" alt="宠物">
                    </div>
                    <div class="dog-r">
                        <h3 @click="goPetInfo(item.dogNo,item.dogName)">{{item.dogName}}</h3>
                        <p>祖籍:{{item.home}}</p>
                        <p>性格：{{item.characters}}</p>
                        <p>寿命：{{item.age}}年</p>
                    </div>
                    <div class="dog-price">
                        <p>参考价格</p>
                        <p>{{item.price}}</p>
                    </div>
                </li>
            </ul>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="totalSize">
                </el-pagination>
            </div>
            </div>
            <div class="noFind" v-else>
                <p>抱歉，没有找到符合条件的狗狗</p>
            </div>
               </el-main>
               <el-aside>
                   <div class="aside-header">
                <h3>Love life love dog</h3>
                <p>狗的寿命只有年，不足以陪伴我们一生；但是却比人的情义要长</p>
            </div>
            <!-- <img src="../../assets/images/life01.jpg" alt="图像"> -->
            <div class="carousel-box">
                 <el-carousel height="180px" indicator-position="none">
                        <el-carousel-item v-for="item in lifeImaList" :key="item">
                            <!-- <h3 class="small">{{ item }}</h3> -->
                            <img :src="item" alt="图像">
                        </el-carousel-item>
                </el-carousel>
            </div>
            <p class="aside-footer">Animals are spiritual and different from plants. If you are alone, it will accompany you.
                 On a sunny afternoon, curl up in your arms</p>
               </el-aside>
           </el-container>
    </el-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            localHost:'http://localhost:3004/',
            pageSize:8,
            currentPage:1,  //当前页
            totalSize:0,    //总数量
            searchText:'',
            dogList:[],
            lifeImaList:[
                "http://localhost:3004/petfile/imges/dogphoto/life01.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life02.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life03.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life04.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life05.jpg"
            ]
        }
    },
    created(){
        let pageSize=this.pageSize;
        this.textSearch(1,pageSize);
    },
    methods:{
        textSearch(pageNum,pageSize){
             let name=this.searchText;
            axios.post('http://localhost:3004/encyclopedia/encySearchDog',{
                pageNum,
                pageSize,
                name
            })
            .then((response)=>{
                console.log(response);
                this.totalSize=response.data.totalSize;
                this.dogList=response.data.content;
            })
            .catch(function(error){
                console.log(error);
            })
            console.log('aa');

        },
        goPetInfo(dogNo,dogName){
            console.log("狗编号"+dogNo+">>>>狗名>>>"+dogName);
            this.$router.push({path:'petInfo',query:{dogNo:dogNo,dogName:dogName}});
        },
        handleCurrentChange(val){
            console.log(val);
            let pageSize=this.pageSize;
            this.textSearch(val,pageSize);
        }
    }
}
</script>


<style scoped>
.el-container{
    line-height: 16px;
}
  .el-header{
      margin-bottom: 10px;
    padding: 10px 5px;
    border: 1px solid #DCDFE6;
    color: #333;
    text-align:left;
  }
  
  .el-main{
      margin-right: 45px;
      padding: 10px;
      border: 1px solid #ccc;
    color: #333;
    text-align: left;
  }

  .el-aside {
      height: 380px;
      padding: 10px 0px;
      border: 1px solid #DCDFE6;
    color: #333;
    text-align: center;
  }
  

  .search{
    text-align:left;
    margin-bottom:15px; 
}
.searchText{
    width: 200px;
    display: inline-block;
    margin-right: 10px;
}

  .dog-box{
      width: 95%;
      position: relative;
      padding: 15px 10px 10px 10px;
      font-size: 15px;
      border-bottom: 1px dotted #ccc;
      
  }

.dog-box .dog-l{
    width: 200px;
    height: 170px;
    display: inline-block;
}

.dog-box .dog-l img{
    width: 100%;
    height: 100%;
}
.dog-box .dog-r{
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    line-height: 40px;
    font-family: "Microsoft YaHei";
}

.dog-box .dog-r h3{
    font-size: 20px;
    font-weight: bold;
}
.dog-box .dog-r h3:hover{
    color: #409EFF;
    cursor: pointer;
}

.dog-box .dog-r p{
    font-size: 14px;
}
.dog-box .dog-price{
    position: absolute;
    right:10px;
    top: 20px;
}
.dog-box .dog-price p:nth-child(1){
    margin-bottom: 5px;
    font-size: 14px;
    color: #909399;
}
.dog-box .dog-price p:nth-child(2){
    font-size: 18px;
    font-weight: bold;
    color: #F56C6C;
}

.noFind{
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
}

.aside-header h3{
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Limelight', cursive;
    text-shadow: 2px 2px 2px rgba(41, 41, 41, 0.26);
}
.aside-header p{
    margin-bottom: 8px;
    font-size: 15px;
    line-height: 20px;
    color: #909399;
}

  .el-carousel__item img{
      max-width: 100%;
  }
  .aside-footer{
      margin-top: 8px;
      font-size: 16px;
      line-height: 20px;
      color: #7b7d7d;
      font-family: 'Open Sans', sans-serif;
  }
 
</style>