<template>
    <el-container>
        <el-main class="article">
            <ul>
                <li class="art-box" v-for="item in articleList" :key="item.artNo">
                    <div class="art-tit clearfix">
                        <h3 @click="goPetArticle(item.artNo,item.artType)">{{item.artTit}}</h3>
                        <span><i class="el-icon-view"></i>{{item.artSaw}}</span>
                    </div>
                    <p class="art-author"><i class="el-icon-user"></i>作者：{{item.artAuthor}}</p>
                    <div class="art-info" v-html="item.artContent">如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就
                        是让它所在的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。
                        而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大
                        小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉
                        得它的任务就是让它所在的群体
                        开心快乐。
                    </div>
                    <P class="art-type"><i class="el-icon-collection-tag"></i>类别:{{item.artType}}</P>
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
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            pageSize:8,    //每页数量
            currentPage:1,  //当前页
            totalSize:0,    //总数量
            articleList:[],
            lifeImaList:[
                "http://localhost:3004/petfile/imges/dogphoto/life01.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life02.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life03.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life04.jpg",
                "http://localhost:3004/petfile/imges/dogphoto/life05.jpg"
            ]
        }
    },
   async created(){
       let pageSize=this.pageSize;
       await this.initGetArt(1,pageSize);
       await this.initArtPage();
    },
    methods:{
    initArtPage(){
          console.log(this.totalSize);
          console.log(this.articleList);

        },
      async initGetArt(pageNum,pageSize){
          await axios.post('http://localhost:3004/article/getArticlePage',{
                pageNum,
                pageSize
            })
            .then((response)=>{
                this.totalSize=response.data.totalSize;
                this.articleList=response.data.content
            })
            .catch(function(error){
                console.log(error);
            })
        },
        getArtPage(pageNum,pageSize){
            axios.post('http://localhost:3004/article/getArticlePage',{
                pageNum,
                pageSize
            })
            .then((response)=>{
                console.log(response);
                this.articleList=response.data.content;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        handleCurrentChange(val){
            let pageSize=this.pageSize;
            this.getArtPage(val,pageSize);
        },
        goPetArticle(artNo,artType){
            console.log('文章编号'+artNo+">>>文章类型>>>"+artType);
            this.updateClickSaw(artNo,artType);
            this.$router.push({name:'petArticle',params:{artNo,artType}});
        },
        updateClickSaw(artNo,artType){
            axios.post('http://localhost:3004/article/updateClickSaw',{
                artNo,
                artType
            })
            .then((response)=>{
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
}
</script>


<style scoped>
.el-container{
    line-height: 16px;
}
  .el-aside {
      height: 380px;
      padding: 10px 0px;
    color: #333;
    text-align: center;
    border: 1px solid #DCDFE6;
  }
  
  .el-main {
      margin-right: 15px;
      padding: 10px;
    color: #333;
    text-align: left;
    border: 1px solid #DCDFE6;

  }

  .art-box{
      padding: 15px 10px 10px 10px;
      font-size: 15px;
      border-bottom: 1px dotted #ccc;
  }

  .art-box h3{
      display: inline-block;
      font-size: 19px;
      font-weight: bold;
      margin-bottom: 12px;

  }
 .art-box h3:hover{
    color: #409EFF;
    cursor: pointer;
    
}
 .art-box .art-tit span{
     float: right;
 } 

 .art-box .art-author{
     
     margin-bottom: 10px;
 }
.art-box .art-info{
    height: 80px;
    margin-bottom: 10px;
    line-height: 20px;
    color: #434343;
    overflow: hidden;
    word-break: break-all;
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