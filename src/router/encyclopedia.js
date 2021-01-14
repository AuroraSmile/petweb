import index from '../views/encyclopedia/Index.vue'
import petInfo from '../views/encyclopedia/petInfo.vue'
import petInfoMore from '../views/encyclopedia/petInfoMore.vue'
import petArticle from '../views/encyclopedia/petArticle.vue'
import petArticleMore from '../views/encyclopedia/petArticleMore.vue'


export default [
    {
        path:'index',
        component:index
    },
    {
        path:'petInfo',
        component:petInfo
    },
    {
        path:'petInfoMore',
        name:'petInfoMore',
        component:petInfoMore
    },
    {
        path:'petArticle/:artNo/:artType',
        name:'petArticle',
        component: petArticle
    },
    {
        path:'petArticleMore',
        name: 'petArticleMore',
        component:petArticleMore
    }
]