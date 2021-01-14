<template>
    <el-container class="petInfo-container">
        <el-main>
            <div class="infoBase">
                <dl class="infoBase-left">
                   <dt>基本信息</dt>
                   <dd>
                       <span>姓名：</span>
                       <em>{{dogInfo.dogName}}</em>
                   </dd>
                   <dd>
                       <span>性格：</span>
                       <em>{{dogInfo.characters}}</em>
                   </dd>
                   <dd>
                       <span>祖籍：</span>
                       <em>{{dogInfo.home}}</em>
                   </dd>
                   <dd>
                       <span>寿命：</span>
                       <em>{{dogInfo.age}}年</em>
                   </dd>
                   <dd>
                       <span>价格：</span>
                       <em>{{dogInfo.price}}元</em>
                   </dd>
                </dl>
                <div class="infoBase-righ">
                    <img :src="localHost+dogInfo.dogImg" alt="狗狗头像">
                </div>
                </div>
                <div class="infoPrief">
                    <h4>宠物简介</h4>
                    <p>{{dogInfo.dogBrief}}</p>
                    </div> 
            
            <div class="infoPhoto">
                <h4>宠物图片</h4>
                <el-image :src="url" :preview-src-list="imgSrcList"></el-image>
                </div>
           
        </el-main>
        <!-- <div>
        <p>我是宠物详细信息页面</p>
        <p @click="show2()">显示</p>
        <P>id>>>>{{msg3.id}}>>>name>>{{msg3.name}}>>>>>author>>{{msg3.author}}</P>
        <form >
            <input type="file" name="file" accept="image/*" @change="getPhoto()" ref="photo"> 
        </form>
        </div> -->
       <!--  <form action="/uploads" method="post" enctype="multipart/form-data">
<input type="file" name="uploadFiles" value="请选择多个文件" multiple>
    <input type="submit" value="多上传">
</form> -->
    </el-container>
</template>


<script>
import axios from 'axios'
export default {
    data(){
        return {
            localHost:'http://localhost:3004/',
            dogNo:'',
            dogName:'',
            dogInfo:{
                dogNo:'',
                dogName:'',
                dogBrief:'',
                characters:'',
                home:'',
                age:'',
                price:'',
                dogImg:'',
                dogImgList:[]
            },
            msg:'aa',
            msg2:'bb',
            url:"",
            imgSrcList:[]
        }
    },
    created(){
        this.dogNo=this.$route.query.dogNo;
        this.dogName=this.$route.query.dogName;
        this.getDogDetail();
    },
    methods:{
        getDogDetail(){
            let dogNo=this.dogNo;
            let dogName=this.dogName;
            axios.get('http://localhost:3004/encyclopedia/dogDetail',{
                params:{
                    dogNo,
                    dogName
                }
            })
            .then((response)=>{
                console.log(response);
                this.dogInfo=response.data.result[0];
                this.url=this.localHost+this.dogInfo.dogImgList[0]
                this.imgSrcList=this.getImgSrcList(this.dogInfo.dogImgList);
            })

        },
        getImgSrcList(list){
            let newList=[];
            for(let i=0;i<list.length;i++){
                let str=this.localHost+list[i];
                newList.push(str);
            }
            return newList;
        },
        show(){
            axios.get('http://localhost:3004//encyclopedia/dogCardList')
            .then((response)=>{
                console.log(response);
                this.msg3=response.data;
            })
        },
       
        getPhoto(){
            let inputDOM=this.$refs.photo;
            let file=inputDOM.files;
            //let base64='';
            let form=new FormData();
           // let r=new FileReader();
            form.append('file',file[0]);
            console.log('formdata');
            console.log(form.get('file'));
            axios({
                url:'http://localhost:3004//encyclopedia/upload',
                method:'post',
                data:form,
                headers:{
                    "Content-Type":'multipart/form-data'
                }
            })
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
           
           
           /*  r.readAsDataURL(file[0]);
            r.onload=function(e){
                base64=e.target.result;
                console.log('base64值');
                console.log(base64);
                let newbase64=base64.replace(/^data:image\/\w+;base64,/, "");
                console.log('newbase64值');
                console.log(newbase64);
                
            } */
           
            //console.log('aabase64值');
            //console.log(base64);
            
            //inputDOM.value="";
            //console.dir(inputDOM);
        }
    }
}
</script>



<style scoped>
.petInfo-container{
    line-height: 16px;
}
.infoBase{
    width: 100%;
    height: 250px;
    text-align: left;
    font-family: "Microsoft YaHei";
    
}
.infoBase-left{
    width: 70%;
    vertical-align: top;
    display: inline-block;
}
.infoBase-left dt{
    font-size: 20px;
    margin-bottom: 10px;
}
.infoBase-left dd{
    width: 360px;
    margin-top: 20px;
    float: left;
}
.infoBase-left dd span{
    font-size: 18px;
    color: #303133;
}
.infoBase-left dd em{
    color: #606266;
    font-size: 16px;
    font-style: normal;
}
.infoBase-righ{
    width: 30%;
    height: 240px;
    display: inline-block;
    vertical-align: top;
}
.infoBase-righ img{
    width: 100%;
    height: 100%;
}

.infoPrief,
.infoXingTai,
.infoPhoto{
    margin-top: 38px;
    padding: 0 30px;
    text-align: center;
}
.infoPrief h4,
.infoXingTai h4,
.infoPhoto h4{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.infoPrief p,
.infoXingTai p{
    font-size: 16px;
    color: #606266;
}


</style>