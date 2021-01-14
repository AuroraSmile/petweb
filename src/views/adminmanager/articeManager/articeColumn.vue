<template>
    <div>
        <div class="search">
            <div class="searchText">
                <el-input v-model="searchText" size="medium"  placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
            </div>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="textSearch">搜索</el-button>
            <el-button type="primary" size="medium" icon="el-icon-edit" @click="dialogVisible=true">添加</el-button>
            <el-dialog
  title="添加栏目信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  center>
  <el-form :model="form" ref="ColForm" :rules="Colrules" >
    <el-form-item label="栏目名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="resetArtTypeForm('ColForm')">取 消</el-button>
    <el-button type="primary" @click="submitArtTypeForm('ColForm')">添加</el-button>
  </span>
</el-dialog>
        </div>
        <el-table
        :data="tableData2"
        stripe
        hightlight-current-row
        empty-text="暂无数据"
        max-height="500"
        style="width:100%">
        <el-table-column
        prop="no"
        label="编号"
        width="50">
        </el-table-column>
        <el-table-column
        prop="typeName"
        label="名称"
        width="100">
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
<el-dialog
  title="修改栏目信息"
  :visible.sync="editDialogBisible"
  width="30%"
  :before-close="handleClose2"
  center>
  <el-form :model="editform" ref="editForm" :rules="Colrules" >
    <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="editform.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="resetEditForm('editForm')">取 消</el-button>
    <el-button type="primary" @click="editArtTypeForm('editForm')">修改</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
    data(){
        return {
            searchText:'',
            tableData2:[],
            dialogVisible: false,
            editDialogBisible:false,
            tableData: [
            {
                no:1,
                typeName:'宠物医疗'
            },
            {
                no:2,
                typeName:'宠物医疗'
            },
            {
                no:3,
                typeName:'宠物医疗'
            },
            {
                no:4,
                typeName:'宠物医疗'
            }
            ],
          form: {     
          name: ''
        },
        editform: { 
            no:'',
          name: '',
        },
        formLabelWidth: '80px',
        Colrules:{
          name:[ { required: true, message: '请输入栏目名称', trigger: 'blur' }]
        }
        }
    },
    created(){
       this.textSearch();
    },
    methods:{
        handleCurrentChange(newRow){
            console.log("newRow");
            console.log(newRow);

        },
        handleEdit(index, row) {
            this.editDialogBisible=true;
            console.log("handleEdit");
            console.log('编辑前tabledata');
            console.log(this.tableData2);
            console.log(index, row);
            this.editform.no=row.no;
            this.editform.name=row.typeName;
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
          _this.deleteArtTypePost(row.no);
          
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      deleteArtTypePost(no){
        axios.post('http://localhost:3004/articleTypeManager/deleteArticleType',{
            no
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
          this.textSearch();
        })
        .catch(function(error){
          console.log(error);
          Message({
            type: 'error',
            message: '删除失败!'
          });
        })
      },
      textSearch(){
          console.log(this.searchText);
          
          axios.post('http://localhost:3004/articleTypeManager/searchArticleType',
            {
             name:this.searchText
            }
          )
          .then((response)=>{
              console.log(response);
              this.updateTableData(response.data);
          })
          .catch(function(error){
              console.log(error)
          })
      },
      updateTableData(newData){
          this.tableData2=newData;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(()=> {
            this.$refs['ColForm'].resetFields();
            done();
          })
          .catch(()=> {});
      },
      handleClose2(done) {
        this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(()=> {});
      },
      submitArtTypeForm(formName){
          console.log('表单提交');
          this.$refs[formName].validate((valid)=>{
            if(valid){
             axios.post('http://localhost:3004/articleTypeManager/addArticleType',{
            name:this.form.name
          })
          .then((response)=>{
              console.log(response);
            if(response.data==1){
              Message({
            type: 'success',
            message: '添加成功!'
          });
            this.textSearch();
            this.dialogVisible=false;
            }
            else if(response.data==0){
                Message({
            type: 'error',
            message: '已存在添加失败!'
          });
            }
            
          })
          .catch(function(error){
            console.log(error);
            Message({
            type: 'error',
            message: '添加失败!'
          });
          }) 
          }else{
              console.log('error submit');
              return false;
            }
          })
         
      },
      editArtTypeForm(formName){
        console.log(this.editform);
        this.$refs[formName].validate((valid)=>{
            if(valid){
              this.editArtTypePost();
          }else{
              console.log('error edit');
              return false;
            }
          })
        
      },
      editArtTypePost(){
          console.log(this.editform);
          axios.post('http://localhost:3004/articleTypeManager/editArticleType',{
            no:this.editform.no,
            typeName:this.editform.name,
            
          })
          .then((response)=>{
              console.log(response);
              if(response.data==1){
                Message({
            type: 'success',
            message: '修改成功!'
          });
            }
            else{
               Message({
            type: 'error',
            message: '修改失败!'
          });
            }
          this.textSearch();
          this.editDialogBisible=false;
          })
          .catch(function(error){
            console.log(error);
             Message({
            type: 'error',
            message: '修改服务失败!'
          });
          })
      },
      resetArtTypeForm(formName){
         this.$refs[formName].resetFields();
          this.dialogVisible=false;
      },
      resetEditForm(formName){
        this.$refs[formName].resetFields();
        this.editDialogBisible=false;
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
    width: 200px;
    display: inline-block;
    margin-right: 10px;
}
</style>