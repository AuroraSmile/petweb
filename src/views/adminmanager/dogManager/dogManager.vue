<template>
    <div>
        <div class="search">
            <div class="searchText">
                <el-input v-model="searchText" size="medium"  placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
            </div>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="textSearch">搜索</el-button>
            <el-button type="primary" size="medium" icon="el-icon-edit" @click="dialogVisible=true">添加</el-button>
            <el-dialog
  title="添加宠物狗信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  center>
  <el-form :model="form" ref="dogForm" :rules="dogrules" >
    <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性格" :label-width="formLabelWidth" prop="characters">
      <el-input v-model="form.characters" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="祖籍" :label-width="formLabelWidth" prop="home">
      <el-input v-model="form.home" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="寿命" :label-width="formLabelWidth" prop="age">
      <el-input v-model="form.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
      <el-input v-model="form.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="宠物封面" label-width="80px" prop="imgfile">
      <el-upload
      v-model="form.imgfile"
  class="upload-demo"
  action="aaa"
  :on-change="hanldeChange"
  :on-remove="handleremove"
  :on-exceed="handleExceed"
  :auto-upload="false"
  accept="image/png,image/gif,image/jpg,image/jpeg"
  :limit="1"
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  
   <el-form-item label="宠物照片" label-width="80px" prop="imgfileList">
      <el-upload
      v-model="form.imgfileList"
  class="upload-demo2"
  multiple
  action="bbb"
  :on-change="handleImgListChange"
  :on-remove="handleImgListremove"
  :on-exceed="handleImgListExceed"
  :auto-upload="false"
  accept="image/png,image/gif,image/jpg,image/jpeg"
  :limit="5"
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>


    <el-form-item label="简介" prop="biref">
      <el-input type="textarea" v-model="form.biref" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="resetDogForm('dogForm')">取 消</el-button>
    <el-button type="primary" @click="submitDogForm('dogForm')">添加</el-button>
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
        prop="dogNo"
        label="编号"
        width="50">
        </el-table-column>
        <el-table-column
        prop="dogName"
        label="名称"
        width="100">
        </el-table-column>
         <el-table-column
        prop="characters"
        label="性格">
      </el-table-column>
      <el-table-column
        prop="home"
        label="祖籍"
        width="120">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="140">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="dogBrief"
        label="宠物简介">
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
  title="修改宠物狗信息"
  :visible.sync="editDialogBisible"
  width="30%"
  :before-close="handleClose2"
  center>
  <el-form :model="editform" ref="editForm" :rules="dogrules" >
    <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="editform.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性格" :label-width="formLabelWidth" prop="characters">
      <el-input v-model="editform.characters" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="祖籍" :label-width="formLabelWidth" prop="home">
      <el-input v-model="editform.home" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="寿命" :label-width="formLabelWidth" prop="age">
      <el-input v-model="editform.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
      <el-input v-model="editform.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="biref">
      <el-input type="textarea" v-model="editform.biref" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="resetEditForm('editForm')">取 消</el-button>
    <el-button type="primary" @click="editDogForm('editForm')">修改</el-button>
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
            tableData:[
            {
            dogNo: 1,
            dogName: '金毛',
            character: '活泼、忠诚、憨厚、友善',
            home:'苏格兰',
            age:'10-15',
            price:'3000-5000',
            dogBrief:'金毛巡回猎犬（Golden Retriever），原产于苏格兰，祖先有雪达犬血统，因有较强的游泳能力，并能把猎物从水中叼回给主人，故最初用作狩猎及巡回被枪猎射落的水鸟，AKC分类属于运动犬组。'
          },
          {
            dogNo: 1,
            dogName: '金毛',
            character: '活泼、忠诚、憨厚、友善',
            home:'苏格兰',
            age:'10-15',
            price:'3000-5000',
            dogBrief:'金毛巡回猎犬（Golden Retriever），原产于苏格兰，祖先有雪达犬血统，因有较强的游泳能力，并能把猎物从水中叼回给主人，故最初用作狩猎及巡回被枪猎射落的水鸟，AKC分类属于运动犬组。'
          },
          {
            dogNo: 1,
            dogName: '金毛',
            character: '活泼、忠诚、憨厚、友善',
            home:'苏格兰',
            age:'10-15',
            price:'3000-5000',
            dogBrief:'金毛巡回猎犬（Golden Retriever），原产于苏格兰，祖先有雪达犬血统，因有较强的游泳能力，并能把猎物从水中叼回给主人，故最初用作狩猎及巡回被枪猎射落的水鸟，AKC分类属于运动犬组。'
          },
          {
            dogNo: 1,
            dogName: '金毛',
            character: '活泼、忠诚、憨厚、友善',
            home:'苏格兰',
            age:'10-15',
            price:'3000-5000',
            dogBrief:'金毛巡回猎犬（Golden Retriever），原产于苏格兰，祖先有雪达犬血统，因有较强的游泳能力，并能把猎物从水中叼回给主人，故最初用作狩猎及巡回被枪猎射落的水鸟，AKC分类属于运动犬组。'
          },
          {
            dogNo: 1,
            dogName: '金毛',
            character: '活泼、忠诚、憨厚、友善',
            home:'苏格兰',
            age:'10-15',
            price:'3000-5000',
            dogBrief:'金毛巡回猎犬（Golden Retriever），原产于苏格兰，祖先有雪达犬血统，因有较强的游泳能力，并能把猎物从水中叼回给主人，故最初用作狩猎及巡回被枪猎射落的水鸟，AKC分类属于运动犬组。'
          },
          {
            dogNo: 1,
            dogName: '金毛',
            character: '活泼、忠诚、憨厚、友善',
            home:'苏格兰',
            age:'10-15',
            price:'3000-5000',
            dogBrief:'金毛巡回猎犬（Golden Retriever），原产于苏格兰，祖先有雪达犬血统，因有较强的游泳能力，并能把猎物从水中叼回给主人，故最初用作狩猎及巡回被枪猎射落的水鸟，AKC分类属于运动犬组。'
          }],
          form: {
          name: '',
          characters: '',
          home: '',
          age: '',
          price: '',
          biref:'',
          imgfile:'',
          imgfileList:''
        },
        editform: {
          dogNo:'',
          name: '',
          characters: '',
          home: '',
          age: '',
          price: '',
          biref:''
        },
        formLabelWidth: '50px',
        dogrules:{
          name:[ { required: true, message: '请输入名称', trigger: 'blur' }],
          characters:[{required:true,message:'请输入宠物性格',trigger:'blur'}],
          home:[{required:true,message:'请输入宠物祖籍',trigger:'blur'}],
          age:[{required:true,message:'请输入宠物寿命',trigger:'blur'}],
          price:[{required:true,message:'请输入宠物价格',trigger:'blur'}],
          biref:[{required:true,message:'请输入宠物简介',trigger:'blur'}],
          imgfile:[{required:true,message:'请上传宠物封面'}],
          imgfileList:[{required:true,message:'请上传宠物照片'}]
        }
        
        }
    },
    created(){
        this.searchAlldog();
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
        console.log(this.tableData);
        console.log(index, row);
        this.editform.dogNo=row.dogNo;
        this.editform.name=row.dogName;
        this.editform.characters=row.characters;
        this.editform.home=row.home;
        this.editform.age=row.age;
        this.editform.price=row.price;
        this.editform.biref=row.dogBrief;

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
          _this.deleteDogPost(row.dogNo);
          
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      deleteDogPost(no){
        axios.post('http://localhost:3004/adminManager/deleteDog',{
          dogNo:no
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
          this.searchAlldog();
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
          
          axios.post('http://localhost:3004/adminManager/searchDog',
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
      searchAlldog(){
          axios.get('http://localhost:3004/adminManager/searchDogManagerList')
          .then((response)=>{
              console.log(response);
              this.updateTableData(response.data);
          })
          .catch(function(error){
                console.log(error);
            })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(()=> {
            this.$refs['dogForm'].resetFields();
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
      submitDogForm(formName){
          console.log('表单提交');
          console.log(this.form);
          this.$refs[formName].validate((valid)=>{
            if(valid){
              let _this=this;
                this.addDogPost(_this);
          }else{
              console.log('error submit');
              return false;
            }
          })
         
      },
      addDogPost(getThis){
        let formData=this.getFormdata(this.form);
        console.dir(formData);
        axios({
                url:'http://localhost:3004/adminManager/addDog',
                method:'post',
                data:formData,
                headers:{
                    "Content-Type":'multipart/form-data'
                }
            })
            .then(function(response){
                if(response.data==1){
            console.log(response);
            getThis.searchAlldog();
            getThis.dialogVisible=false;
            Message({
            type: 'success',
            message: '添加成功!'
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
      },
      editDogForm(formName){
        console.log(this.editform);
        this.$refs[formName].validate((valid)=>{
            if(valid){
              this.editDogPost();
          }else{
              console.log('error edit');
              return false;
            }
          })
        
      },
      editDogPost(){
          console.log(this.editform);
          axios.post('http://localhost:3004/adminManager/updateDog',{
            dogNo:this.editform.dogNo,
            name:this.editform.name,
            characters: this.editform.characters,
            home: this.editform.home,
            age: this.editform.age,
            price: this.editform.price,
            biref:this.editform.biref
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
          this.searchAlldog();
          this.editDialogBisible=false;
          })
          .catch(function(error){
            console.log(error);
             Message({
            type: 'error',
            message: '修改失败!'
          });
          })
      },
      resetDogForm(formName){
         this.$refs[formName].resetFields();
          this.dialogVisible=false;
      },
      resetEditForm(formName){
        this.$refs[formName].resetFields();
        this.editDialogBisible=false;
      },

      //文件上传
      //宠物封面
      hanldeChange(file, fileList){
        console.log("文件上传change");
        console.log(file, fileList);
        //console.log(this.fileList);
        this.form.imgfile=file.raw;
        //console.log(this.form.imgfile);
      },
      handleremove(){
        console.log('文件remove')
        this.form.imgfile='';
      },
      handleExceed(files, fileList) {
        console.log("超出限制");
        Message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      //宠物照片组
      handleImgListChange(file, fileList){
        console.log("文件上传change");
        //console.log(file, fileList);
        this.form.imgfileList=this.getFileList(fileList);
        //console.log(this.form.imgfileList);
      },
      handleImgListremove(file, fileList){
        console.log("文件上传remove");
        //console.log(file, fileList);
        this.form.imgfileList=this.getFileList(fileList);
        //console.log(this.form.imgfileList);
      },
      handleImgListExceed(files, fileList){
         //console.log("超出限制");
        Message.warning(`当前限制选择 5个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      getFileList(list){
        let newList=[];
        for(let i=0;i<list.length;i++){
          newList.push(list[i].raw);
        }
        return newList;
      },
      getFormdata(obj){
        let formdata=new FormData();
        //Object.setPrototypeOf(obj.imgfileList,File);
        //console.log(obj.imgfileList);
        for(let key in obj){
            if(key=="imgfileList"){
              for(let i=0;i<obj[key].length;i++){
                formdata.append("imgfileList",obj[key][i]);
              }
              
            }
            else{
              formdata.append(key,obj[key]);
            }
            
        }
        
        return formdata;
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
<style>
.upload-demo .el-upload__input{
  display: none;
}
 
.upload-demo2 .el-upload__input{
  display: none;
}
</style>