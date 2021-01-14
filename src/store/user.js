

export default {
namespaced:true,
state:{
    userAccount:null,
    userId:null,
    role:3
},
mutations:{
    updateUserData(state,userData){
        console.log("======用户登录======");
        console.log(userData);
        state.userAccount = userData.account;
        state.userId = userData.user_id;
        state.role = userData.role;
    },
    exitUserData(state){
        console.log("======用户退出========")
        state.userAccount=null;
        state.userId=null;
        state.role=3;
    }
},
actions:{}
}