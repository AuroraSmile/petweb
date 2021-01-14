<template>
    <div>
    <div class="art-header">
    <el-form ref="form" :model="form" label-width="80px" :rules="artrules">
        <el-form-item label="文章标题" prop="artTit">
            <el-input v-model="form.artTit" class="artTit-input"></el-input>
        </el-form-item>
         <el-form-item label="文章类型" prop="artType">
            <el-select v-model="form.artType" placeholder="请选择文章类型">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                     </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="作者" prop="artAuthor">
            <el-input v-model="form.artAuthor" class="artAuthor-input"></el-input>
        </el-form-item>
    </el-form>
    </div>
    <div class="artContent">
        <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                >
        </quill-editor>
    </div>
    
   <el-button type="primary" size="medium"  @click="submitForm('form')">提交</el-button> 
    </div>
</template>


<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
    data(){
        return {
            options:[],
            form:{
                artTit:'',
                artType:'',
                artContent:'',
                artAuthor:''
            },
            content: '<h2>I am Example</h2>',
            editorOption: {
            },
            artrules:{
          artTit:[ { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
          artType:[{required:true,message:'请选择文章类型',trigger:'change'}],
          artAuthor:[{required:true,message:'请输入作者名称',trigger:'blur'}]
        }

        }
    },
    created(){
     this.getArticleType();
    },
    methods:{
        // 失去焦点事件
        onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      // 获得焦点事件
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      // 准备编辑器
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      getFormatDate(){
          let date=new Date();
          let year=date.getFullYear();
          let month=date.getMonth()+1;
          let day=date.getDate();
          if (month < 10) {
            month = "0" + month;
            }
        if (day < 10) {
                day = "0" + day;
            }
          let nowDate=year+"-"+month+"-"+day;
          return nowDate;  
      },
      getArticleType(){
            axios.get('http://localhost:3004/articleManager/getArticleType')
            .then((response)=>{
                console.log(response);
                let list=[];
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
      submitForm(formName){
          this.$refs[formName].validate((valid)=>{
            if(valid){
            console.log(this.content);
            this.form.artContent=this.content;
            console.log(this.form);
            this.addArtPost();
          }else{
              console.log('error edit');
              return false;
            }
          })
      
        },
        addArtPost(){
            axios.post('http://localhost:3004/articleManager/addArticle',{
                artTit:this.form.artTit,
                artType:this.form.artType,
                artAuthor:this.form.artAuthor,
                artContent:this.form.artContent
            })
            .then((response)=>{
                console.log(response)
                if(response.status==200){
                    if(response.data==1){
                        Message({
                        type: 'success',
                         message: '添加成功!'
                        });
                        this.$refs['form'].resetFields();
                    }
                    else {
                        Message({
                            type: 'error',
                            message: '添加失败!'
                            });
                    }
                }
                
            })
            .catch(function(error){
                console.log(error);
                Message({
            type: 'error',
            message: '添加失败!'
          });
            })
        }
    },
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    }


}
</script>



<style scoped>
.artContent{
    width: 95%;
    margin: 0 auto;
}
.ql-container{
    height: 300px;
}
.art-header{
    text-align: left;
}
.artTit-input{
    width: 350px;
}
.artAuthor-input{
    width: 200px;
}
</style>