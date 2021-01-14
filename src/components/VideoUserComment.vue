<template>
  <div class="commentList">
    <div class="list-com-header">
      <el-avatar :size="35" icon="el-icon-user-solid"></el-avatar>
      <div class="list-com-header-r">
        <h3>{{comment.account}}</h3>
      </div>
    </div>
    <div class="list-content">{{comment.vcom_content}}</div>
    <div class="comment-reply">
      <span>{{comment.comCreate_time|dateTimeFormat}}</span>
      <span>
        <i class="el-icon-chat-round"></i> 回复
      </span>
    </div>
  </div>
</template>


<script>
export default {
    props:['comment'],
  data() {
    return {};
  },
  methods: {},
  filters:{
      dateTimeFormat:function(dateTime){
        let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    //let halfamonth = day * 15
    let month = day * 30;
    let year = month * 12;
    let now = new Date().getTime()
    let diffValue = now - new Date(dateTime).getTime()
    diffValue = diffValue > 0 ? diffValue : now - new Date(Date.parse(dateTime.replace(/-/g, "/"))).getTime()
    if(diffValue < 0){
        console.log('日期不合法')
    }
    let yearC = diffValue/year
    let monthC = diffValue/month
    let weekC = diffValue/(7*day)
    let dayC = diffValue/day
    let hourC = diffValue/hour
    let minC = diffValue/minute
    let result
    if(yearC >= 1){
        result = parseInt(yearC) + "年前"
    }
    else if(monthC >= 1){
        result = parseInt(monthC) + "个月前"
    }
    else if(weekC >= 1){
        result = parseInt(weekC) + "周前"
    }
    else if(dayC >= 1){
        result = parseInt(dayC) +"天前"
    }
    else if(hourC >= 1){
        result = parseInt(hourC) +"小时前"
    }
    else if(minC>= 1){
        result = parseInt(minC) +"分钟前"
    }else{
        result = "刚刚"}
    return result;
      }
    }
};
</script>

<style scoped>
/* 评论列表 */
.commentList {
  padding: 10px;
  border-bottom: 1px solid #ebebeb;
}
.list-com-header {
  text-align: left;
}

.list-com-header .list-com-header-r {
  margin-top: 9px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: top;
}
.list-com-header .list-com-header-r h3 {
  margin-bottom: 6px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  font-family: "PingFang SC";
}

.list-content {
  margin-left: 50px;
  line-height: 1.3;
  font-size: 14px;
  color: #505050;
  text-align: left;
}
.comment-reply {
  margin-top: 8px;
  margin-left: 50px;
  font-size: 14px;
  text-align: left;
}

.comment-reply span:nth-child(2) {
  margin-left: 20px;
  cursor: pointer;
}
</style>