<template>
    <el-container>
        <el-aside>
            <div class="art-top">
                <h2>相关文章</h2>
            </div>
            <div class="art-content">
                <ul>
                    <li class="clearfix" @click="goPetArticle(item.artNo,item.artType)" v-for="item in aboutArtList" :key="item.artNo">
                        <span class="art-title"><i class="el-icon-view"></i>{{item.artTit}}</span>
                    </li>
                    
                </ul>
            </div>

        </el-aside>
    <el-container>
        <el-header class="art-head" height="130px">
            <h4>{{article.artTit}}</h4>
            <div class="art-head-mid"><span>{{article.artDate}}</span><span>作者：{{article.artAuthor}}</span></div>
            <div>浏览数：{{article.artSaw}}</div>
        </el-header>
        <el-main>
            <div v-html="article.artContent"> 
            <p>如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的
            大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉
            证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。
            </p>
            <p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的
            大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉
            证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。
            </p>
            <p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的
            大小便问题惹到它的小最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的
            大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉
            证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。而狗狗会把朝夕相处的人最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。
            </p>
            <p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的
            大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉
            证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。
            </p>
            <p>而狗狗会把朝夕相处的人群体，尤其是它的人类朋友不开心了，它就会通过毁掉
            证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常
            状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在
            的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的
            大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉
            证据来解决这个问题。最常见的大小便问题有以几种：
            </p>
            </div>
            </el-main>
    </el-container>
    </el-container>
</template>


<script>
import axios from 'axios'
export default {
    name:'petArticle',
    data(){
        return{
            artNo:'',
            artType:'',
            article:{},
            aboutArtList:[]
        }
    },
    created(){
        this.artNo=this.$route.params.artNo;
        this.artType=this.$route.params.artType;
        this.getArtDetail();
        this.getAboutArticleList(this.artType);
    },
    watch:{
        '$route'(to,from){
            //当两个路由目的都是同一个组件，只是参数发生变化，原来组件实例会被复用，意味着组件的生命周期钩子不会再被调用
            //参考vue-router文档的动态路由匹配---响应路由参数的变化
            //to 表示新的路由信息，from表示原来的路由信息
            //console.log(to);
            console.log(from);
            this.artNo=to.params.artNo;
            this.artType=to.params.artType;
            this.getArtDetail();
            this.getAboutArticleList(this.artType);
        }
    },
    methods:{
        getArtDetail(){
            let no=this.artNo;
            let arttype=this.artType;
             
            axios.get('http://localhost:3004/article/getArticleDetail',{
                params:{
                    artNo:no,
                    artType:arttype
                }
            })
            .then((response)=>{
                console.log(response);
                this.article=response.data;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        getAboutArticleList(typeName){
            axios.get('http://localhost:3004/article/getArticleByType',{
                params:{
                    pageNum:1,
                    pageSize:5,
                    typeName
                }
            })
            .then((response)=>{
                this.aboutArtList=response.data.content;
                console.log(this.aboutArtList);
            })
            .catch(function(error){
                console.log(error);
            })
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
.el-header{
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    
  }
  
  .el-main{
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    font-size: 16px;
    text-indent: 30px;
    line-height: 35px;
  }
  .el-aside {
      height: 300px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    margin-right: 20px;
  }
  .art-head{
      font-size: 16px;
      padding: 20px 0;
  }
  .art-head h4{
      font-size: 25px;
      font-weight: 600;
      line-height: 30px;

  }
  .art-head-mid{
      margin: 10px 0;
  }
  .art-head-mid span:nth-child(1){
      margin-right: 20px;
  }


/* 相关文章 */
.art-top{
    height: 50px;
    line-height: 50px;
    font-size:18px;
    font-family: "PingFang SC","Hiragino Sans GB";
    border-bottom: 1px solid #DCDFE6;
}
.art-top h2{
    font-size:17px;
    font-weight: 600;
    
}

.art-content ul li{
    height: 50px;
    font-size: 14px;
    padding-left: 5px;
    color: #606266;
    line-height: 50px;
    font-family: "PingFang SC","Hiragino Sans GB";
    border-bottom: 1px solid #DCDFE6;
    transition: all .2s linear; 
}

.art-content ul li:hover{
    background-color: rgba(0,0,0,.01);
    color: #409EFF;
    cursor: pointer;
}

.art-content ul li span{
    display: inline-block;
}

.art-content ul li .art-title{
    float: left;
}


.art-content ul li .art-title .el-icon-view{
    margin-right: 4px;
}
</style>