import articeSearch from '../views/adminmanager/articeManager/articeSearch.vue'
import articeAdd from '../views/adminmanager/articeManager/articeAdd.vue'
import articeColumn from '../views/adminmanager/articeManager/articeColumn.vue'
import articeEdit from '../views/adminmanager/articeManager/articeEdit.vue'


export default [
    {
        path:'articeSearch',
        component:articeSearch
    },
    {
        path:'articeAdd',
        component:articeAdd
    },
    {
        path:'articeColumn',
        component:articeColumn
    },
    {
        path:'articeEdit',
        name: 'articeEdit',
        component:articeEdit
    }
]