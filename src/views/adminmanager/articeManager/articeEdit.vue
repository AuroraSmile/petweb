<template>
    <div>
        <h3>文章编辑</h3>
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
         <el-form-item label="浏览数">
            <el-input v-model="form.artSaw"  :disabled="true" class="artAuthor-input"></el-input>
        </el-form-item>
         <el-form-item label="作者" prop="artAuthor">
            <el-input v-model="form.artAuthor" class="artAuthor-input"></el-input>
        </el-form-item>
    </el-form>
    </div>

    <div class="artContent">
        <quill-editor v-model="form.artContent"
                ref="myQuillEditor"
                :options="editorOption"
                >
        </quill-editor>
    </div>
        <el-button type="primary" size="medium"  @click="submitEditForm('form')">提交</el-button> 
    </div>
</template>


<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
    data(){
        return {
            artNo:'',
            artType:'',
            options:[],
            form:{
                artTit:'',
                artType:'',
                artContent:'<h2>I am Example</h2>',
                artAuthor:'',
                artSaw:0
            },
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
         this.artNo=this.$route.params.artNo;
         this.artType=this.$route.params.artType
         this.getArticleType();
        this.getOneArticle();
    },
    methods:{
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
        getOneArticle(){
            let artNo=this.artNo;
            let artType=this.artType;
            axios.get('http://localhost:3004/articleManager/getOneArticle',{
                params:{
                    artNo,
                    artType
                }
            })
            .then((response)=>{
                console.log(response);
                let result=response.data;
                this.form.artTit=result.artTit;
                this.form.artType=result.artType;
                this.form.artContent=result.artContent;
                this.form.artAuthor=result.artAuthor;
                this.form.artSaw=result.artSaw;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        submitEditForm(formName){
            this.$refs[formName].validate((valid)=>{
            if(valid){
            this.editArtPost();
          }else{
              console.log('error edit');
              return false;
            }
          })
        },
        editArtPost(){
            axios.post('http://localhost:3004/articleManager/updateArticle',{
                artNo:this.artNo,
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
                         message: '修改成功!'
                        });
                        this.$refs['form'].resetFields();
                        this.form.artContent='';
                        this.form.artSaw=0;
                    }
                    else {
                        Message({
                            type: 'error',
                            message: '修改失败!'
                            });
                    }
                }
                
            })
            .catch(function(error){
                console.log(error);
                Message({
            type: 'error',
            message: '修改服务失败!'
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