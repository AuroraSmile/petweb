<template>
    <div>
        <input type="button" value="按钮" v-on:click="showclick">
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        showclick:function(){
            console.log("aaaa");
            console.dir(this);
        }
    }
}

</script>