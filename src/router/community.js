import index from '../views/community/Index.vue'
import userPostLike from '../views/community/userPostLike.vue'
import userPostPage from '../views/community/userPostPage.vue'
import userPostComment from '../views/community/userPostComment.vue'

export default [
    {
        path:'index',
        component:index
    },
    {
        path:'userPostLike',
        name: 'userPostLike',
        component: userPostLike
    },
    {
        path:'userPostPage',
        name:'userPostPage',
        component:userPostPage
    },
    {
        path:'userPostComment',
        name: 'userPostComment',
        component:userPostComment
    }
]