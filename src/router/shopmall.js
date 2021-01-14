import index from '../views/shopmall/Index.vue'
import shopCart from '../views/shopmall/shopCart.vue'
import userOrderCenter from '../views/shopmall/userOrderCenter.vue'
import userGoodsCollect from '../views/shopmall/useGoodsCollect.vue'


export default [
    {
        path:'index',
        component:index
    },
    {
        path:'shopCart',
        name:'shopCart',
        component:shopCart
    },
    {
        path:'userOrderCenter',
        name:'userOrderCenter',
        component:userOrderCenter
    },
    {
        path:'userGoodsCollect',
        name:'userGoodsCollect',
        component:userGoodsCollect
    }
]