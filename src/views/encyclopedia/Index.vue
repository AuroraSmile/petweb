<template>
    <div class="ency-container">
        <!-- 宠物简介 -->
        <div class="petsBrief">
            <div class="brief-top">
                <h2>宠物简介</h2>
                <!-- <a href="#">更多<i class="el-icon-view el-icon--right"></i></a> -->
                <el-link :underline="false" @click="goPetInfoMore()">更多<i class="el-icon-view el-icon--right"></i> </el-link>
            </div>
            <div class="brief-content">
                <ul class="clearfix">
                    <li v-for="item in dogCardList" :key="item.dogNo" @click="goPetInfo(item.dogNo,item.dogName)">
                        <div class="item-hover">{{item.dogBrief}}</div>
                        <!-- <img src="../../assets/images/a3.jpg"> -->
                        <img :src="localHost+item.dogImg">
                        <p>{{item.dogName}}</p>
                    </li>
                    <!-- <li @click="goPetInfo()">
                        <div class="item-hover">拉布拉多是一种中大型犬类，个性温和、活泼；智商极高，位列世界犬类第七；适合做导盲犬或其他工作犬</div>
                        <img src="../../assets/images/a3.jpg">
                        <p>金毛</p>
                    </li> -->
                </ul>
            </div>
            
        </div>
        <!-- 宠物简介结束 -->
        
        <div class="article-container">
            <!-- 宠物饲养 -->
       <!--  <div class="petsFeed">
            <div class="art-top">
                <h2>宠物喂养</h2>
                <el-link :underline="false">更多<i class="el-icon-view el-icon--right"></i> </el-link>
            </div>
            <div class="art-content">
                <ul>
                    <li class="clearfix" @click="goPetArticle()">
                        <span class="art-title"><i class="el-icon-view"></i>狗狗如何训练坐握手？</span>
                        <span class="art-date">2020-01-25</span>
                    </li>
                    <li class="clearfix">
                        <span class="art-title"><i class="el-icon-view"></i>狗狗如何训练坐握手？</span>
                        <span class="art-date">2020-01-25</span>
                    </li>
                    <li class="clearfix">
                        <span class="art-title"><i class="el-icon-view"></i>狗狗如何训练坐握手？</span>
                        <span class="art-date">2020-01-25</span>
                    </li>
                    <li class="clearfix">
                        <span class="art-title"><i class="el-icon-view"></i>狗狗如何训练坐握手？</span>
                        <span class="art-date">2020-01-25</span>
                    </li>
                    <li class="clearfix">
                        <span class="art-title"><i class="el-icon-view"></i>狗狗如何训练坐握手？</span>
                        <span class="art-date">2020-01-25</span>
                    </li>
                </ul>
            </div>
        </div> -->
        <!-- 宠物饲养结束 -->

        <!-- 宠物文章模板 -->
        <div class="petsArt" v-for="item in artType" :key="item.no"> 
            <div class="art-top">
                <h2>{{item.typeName}}</h2>
                <el-link :underline="false" @click="goPetArticleMore()">更多<i class="el-icon-view el-icon--right"></i> </el-link>
            </div>
            <div class="art-content">
                <ul>
                    <li class="clearfix" @click="goPetArticle(artItem.artNo,artItem.artType)" v-for="artItem in changeArtList(item.typeName)" :key="artItem.artNo">
                        <span class="art-title"><i class="el-icon-view"></i>{{artItem.artTit}}</span>
                        <span class="art-date">{{artItem.artDate}}</span>
                    </li> 
                    <div class="nodata" v-if="changeArtList(item.typeName).length==0">暂无数据</div>
                </ul>
            </div>
        </div>
        <!-- 宠物文章模板结束 -->
         </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name:'petInfo',
    data(){
        return {
            localHost:'http://localhost:3004/',
            dogCardList:[],
            artType:[],
            artTitle:[],
            artType1:[
                {
                    no:1,
                    typeName:'宠物喂养'
                },
                {
                    no:2,
                    typeName:'宠物医疗'
                },
                {
                    no:3,
                    typeName:'宠物训练'
                },
                {
                    no:4,
                    typeName:'踩踩踩'
                }
                ],
            artTitle1:[
                {
                    artNo:1,
                    artTit:'狗狗如何训练坐握手？',
                    artDate:'2020-01-25'
                },
                {
                    artNo:2,
                    artTit:'狗狗坐握手？',
                    artDate:'2020-01-25'
                },
                {
                    artNo:3,
                    artTit:'狗狗如何坐握手？',
                    artDate:'2020-01-25'
                },
                {
                    artNo:4,
                    artTit:'狗练手？',
                    artDate:'2020-01-25'
                },
                {
                    artNo:5,
                    artTit:'狗狗练坐握手？',
                    artDate:'2020-01-25'
                },
            ]
        }
    },
  async created(){
        axios.get('http://localhost:3004/encyclopedia/dogCardList',{
              params:{
                  pageNum:1,
                  pageSize:12
              }
          })
            .then((response)=>{
                console.log(response);
                this.dogCardList=response.data.content;
            })
            .catch(function(error){
                console.log(error);
            })
            await this.getArtTypeList();
            await this.newGetArtTitList();
    },
    methods:{
       goPetInfo(dogNo,dogName){
            //console.log(this.dogCardList);
            console.log("狗编号"+dogNo+">>>>狗名>>>"+dogName);
            this.$router.push({path:'petInfo',query:{dogNo:dogNo,dogName:dogName}});
        },
        goPetInfoMore(){
            this.$router.push({path:'petInfoMore'});
        },
        goPetArticle(artNo,artType){
            console.log('文章编号'+artNo+">>>文章类型>>>"+artType);
            //this.$router.push({path:'petArticle',query:{artNo,artType}});
            this.updateClickSaw(artNo,artType);
            this.$router.push({name:'petArticle',params:{artNo,artType}});
        },
        goPetArticleMore(){
            this.$router.push({path:'petArticleMore'});
        },
       async getArtTypeList(){
          await axios.get('http://localhost:3004/getArtType')
            .then((response)=>{
                //console.log(response);
                this.artType=response.data;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        newGetArtTitList(){   
            let typeList=this.artType.map(function(item){
                return item.typeName;
            })
            for(let i=0;i<typeList.length;i++){
                this.newGetArtTit(typeList[i]);
            }

        },
        newGetArtTit(typeName){
            axios.get('http://localhost:3004/article/getArticleByType',{
                params:{
                    pageNum:1,
                    pageSize:8,
                    typeName
                }
            })
            .then((response)=>{
                let obj={
                    typeName,
                    data:response.data.content
                }
                this.artTitle.push(obj);
            })
            .catch(function(error){
                console.log(error);
            })
        },
        changeArtList(typeName){
            let list=[];
           // debugger
            this.artTitle.some(function(item){
                if(item.typeName==typeName){
                    list=item.data;
                    return true;
                }
            })
            //console.log(typeName);
            //console.log(list);
           // debugger
            return list;
        },
        /* async getArtTitList(typeName){
            
          let respon= await this.getArtTit(typeName);
          this.artTitle=respon.data;
          
          console.log(this.artTitle);
          
            return this.artTitle;
        },
       async getArtTit(typeName){
           let response=await axios.get('http://localhost:3004/article/getArticleByType',{
                params:{
                    typeName
                }
            })
            return response;
        }, */
        

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
/* 宠物简介 */
.petsBrief{
    width: 100%;
}
.brief-top{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size:18px;
    font-family: "PingFang SC","Hiragino Sans GB";
    border-bottom: 1px solid #DCDFE6;
}
.brief-top h2{
    float: left;
    font-size:18px;
    font-weight: 600;
    
}

.brief-top a{
    float:right;
    font-size: 17px;
}

.brief-content{
    line-height: 18px;
}

.brief-content ul li{
    width: 180px;
    height: 190px;
    position: relative;
    background-color: #E4E7ED;
    margin-top:30px;
    margin-right: 20px;
    float: left;
    transition: all .2s linear; 
}
.brief-content ul li:hover{
    transform: translate(0,-10px);
    box-shadow: 0 0 13px rgba(0,0,0,0.3);
    color: #409EFF;
    cursor: pointer;
    
}
.brief-content ul .item-hover:hover{
    opacity: 1;
}
.brief-content ul .item-hover{
    width: 100%;
    height: 111px;
    position: absolute;
    overflow: hidden;
    top:0;
    left: 0;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    transition: all 300ms ease-out;
    opacity: 0;
}

.brief-content ul li img{
    width: 180px;
    height: 155px;
}
.brief-content ul li p{
    font-size: 14px;
    font-family: "PingFang SC","Hiragino Sans GB";
}

.article-container{
    width: 100%;
    display: flex;
    margin-top: 30px;
    line-height: 18px;
    justify-content: space-between;
    flex-wrap: wrap;
}

/* 宠物文章 */
.petsArt{
    width: 350px;
    margin-top: 20px;
    margin-right: 15px;
}

.art-top{
    width: 350px;
    height: 50px;
    line-height: 50px;
    font-size:18px;
    font-family: "PingFang SC","Hiragino Sans GB";
    border-bottom: 1px solid #DCDFE6;
}
.art-top h2{
    float: left;
    font-size:18px;
    font-weight: 600;
    
}

.art-top a{
    float:right;
    font-size: 15px;
}

.art-content ul li{
    height: 50px;
    font-size: 14px;
    color: #606266;
    line-height: 50px;
    font-family: "PingFang SC","Hiragino Sans GB";
    border-bottom: 1px solid #DCDFE6;
    transition: all .2s linear; 
    text-align: left;
}
.art-content ul .nodata{
    font-size: 16px;
}

.art-content ul li:hover{
    background-color: rgba(0,0,0,.01);
    color: #409EFF;
    cursor: pointer;
}

.art-content ul li span{
    display: inline-block;
}
.art-content ul li span:nth-child(1){
    width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 50px;
    white-space: nowrap;
}

.art-content ul li .art-title{
    float: left;
}

.art-content ul li .art-date{
    float: right;
}

.art-content ul li .art-title .el-icon-view{
    margin-right: 4px;
}
</style>