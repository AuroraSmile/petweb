<template>
    <div>
        <div class="search">
            <div class="searchText">
                <el-input class="search-input" v-model="searchText" size="medium"  placeholder="请输入文章标题" prefix-icon="el-icon-search"></el-input>
                <el-select v-model="selectValue" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                     </el-option>
                </el-select>
            </div>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="textSearch(1,pageSize)">搜索</el-button>   
        </div>

        <el-table
        :data="tableData"
        stripe
        hightlight-current-row
        row-class-name='rowContent'
        empty-text="暂无数据"
        
        style="width:100%">
        <el-table-column
        prop="artNo"
        label="编号"
        width="50">
        </el-table-column>
        <el-table-column
        prop="artTit"
        label="文章标题"
        width="210">
        </el-table-column>
         <el-table-column
        prop="artType"
        label="文章类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="artDate"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
     show-overflow-tooltip
        prop="artContent"
        label="内容"
        >
      </el-table-column>
      <el-table-column
        prop="artSaw"
        label="浏览数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="artAuthor"
        label="作者"
        width="80">
      </el-table-column>
       <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                    :total="totalSize">
                </el-pagination>
            </div>
    </div>
</template>


<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
    data(){
        return {
            searchText:'',
            options:[],
            selectValue:'',
            tableData:[],
            tableData2:[
                {
                    artNo:1,
                    artTit:'怎样训练狗狗大小便 一个简单的训练方法',
                    artType:'宠物喂养',
                    artDate:'2020-02-05',
                    artContent:'<p>如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p><p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p>',
                    artSaw:222,
                    artAuthor:'admin'
                },
                {
                    artNo:2,
                    artTit:'怎样训练狗狗大小便 一个简单的训练方法',
                    artType:'宠物喂养',
                    artDate:'2020-02-05',
                    artContent:'<p>如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p><p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p>',
                    artSaw:222,
                    artAuthor:'admin'
                },
                {
                    artNo:3,
                    artTit:'怎样训练狗狗大小便 一个简单的训练方法',
                    artType:'宠物喂养',
                    artDate:'2020-02-05',
                    artContent:'<p>如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p><p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p>',
                    artSaw:222,
                    artAuthor:'admin'
                },
                {
                    artNo:4,
                    artTit:'怎样训练狗狗大小便 一个简单的训练方法',
                    artType:'宠物喂养',
                    artDate:'2020-02-05',
                    artContent:'<p>如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p><p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p>',
                    artSaw:222,
                    artAuthor:'admin'
                },
                {
                    artNo:5,
                    artTit:'怎样训练狗狗大小便 一个简单的训练方法',
                    artType:'宠物喂养',
                    artDate:'2020-02-05',
                    artContent:'<p>如果在这个时候，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以下，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p><p>而狗狗会把朝夕相处的人当做是群体的一员，如果它的大小便问题惹到它的小群体，尤其是它的人类朋友不开心了，它就会通过毁掉证据来解决这个问题。最常见的大小便问题有以，主人对狗狗加以指责批评或者反应过激，那么狗狗的大小便失常状况会更加恶化，情况会更加糟糕。在狗狗心中，会觉得它的任务就是让它所在的群体开心快乐。</p>',
                    artSaw:222,
                    artAuthor:'admin'
                }

            ],
            pageSize:10,    //每页数量
            currentPage:1,  //当前页
            totalSize:0,    //总数量
        }
    },
   async created(){
       let pageSize=this.pageSize;
        await this.textSearch(1,pageSize);
        await this.getdata();
        this.getArticleType();
    },
    methods:{
      async  textSearch(pageNum,pageSize){
            console.log('aaa');
            console.log(this.searchText);
            console.log(this.selectValue);
            let artTit=this.searchText;
            let artType=this.selectValue;
           await axios.post('http://localhost:3004/articleManager/searchArticle',{
                pageNum,
                pageSize,
                artTit,
                artType
            })
            .then((response)=>{
                console.log(response);
                 this.totalSize=response.data.totalSize;
                 this.tableData=response.data.content;

            })
            .catch(function(error){
                console.log(error);
            })

        },
        getArticleType(){
            axios.get('http://localhost:3004/articleManager/getArticleType')
            .then((response)=>{
                console.log(response);
                let list=[];
                let obj={
                    label:'所有类型',
                    value:''
                };
                list.push(obj);
                let result=response.data;
                for(let i=0;i<result.length;i++){
                    let newobj={};
                    newobj.label=result[i].typeName;
                    newobj.value=result[i].typeName;
                    list.push(newobj);
                }
                this.options=list;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        getdata(){
            console.log(this.totalSize);
            console.log(this.tableData);
        },
        handleEdit(index,row){
            console.log(index,row);
            this.$router.push({name:'articeEdit',params:{artNo:row.artNo,artType:row.artType}})
        },
        handleDelete(index,row){
            console.log(index,row);
            let _this=this;
         this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("handleDelete");
        console.log(index, row);
          _this.deleteArticlePost(row.artNo);
          
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        },
        deleteArticlePost(no){
            axios.post('http://localhost:3004/articleManager/deleteArticle',{
                artNo:no
        })
        .then((response)=>{
          console.log(response);
          if(response.data==1){
            Message({
            type: 'success',
            message: '删除成功!'
          });
          }
          else if(response.data==0){
              Message({
            type: 'error',
            message: '删除失败!'
          });
          }
          let pageSize=this.pageSize;
          this.textSearch(1,pageSize);
        })
        .catch(function(error){
          console.log(error);
        })
        },
        handleCurrentChange(val){
            let pageSize=this.pageSize;
            this.textSearch(val,pageSize);
        }
    }
}
</script>



<style scoped>
.search{
    text-align:left;
    margin-bottom:15px; 
}
.searchText{
    width: 455px;
    display: inline-block;
    margin-right: 10px;
}
.search-input{
    width: 250px;
    margin-right: 10px;
}
.artcontent{
    height: 50px;
}

</style>