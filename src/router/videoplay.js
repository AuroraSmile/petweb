import index from '../views/videoplay/Index.vue'
import postVideo from '../views/videoplay/postVideo.vue'
import videoDetail from '../views/videoplay/videoDetail.vue'
import myVideoPlay from '../views/videoplay/myVideoPlay.vue'
import myCommentVideo from '../views/videoplay/myCommentVideo.vue'
import myLikeVideo from '../views/videoplay/myLikeVideo.vue'

export default [
    {
        path:'index',
        component:index
    },
    {
        path:'postVideo',
        name:'postVideo',
        component:postVideo
    },
    {
        path:'videoDetail/:videoId',
        name:'videoDetail',
        component:videoDetail
    },
    {
        path:'myVideoPlay',
        name:'myVideoPlay',
        component:myVideoPlay
    },
    {
        path:'myCommentVideo',
        name:'myCommentVideo',
        component:myCommentVideo
    },
    {
        path:'myLikeVideo',
        name:'myLikeVideo',
        component:myLikeVideo
    }
]