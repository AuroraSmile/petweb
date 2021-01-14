<template>
    <div>
        <h5>aaa</h5>
        <temp ref="t"></temp>
    </div>
</template>


<script>
import temp from './temp.vue'
export default {
    components:{temp},
    name:"test",
    data(){
        return {}
    },
    mounted:function(){
        this.chan();
    },
    methods:{
        chan:function(){
            this.$refs.t.showclick();
        }
    }
}

</script>


<style>

</style>


