<template>
    <div>
        
    </div>
</template>
<script>
export default {
    watch: {
        $route(to, from) {
             console.log(to, form)
        }
    },
    created() {
        console.log(this.$route)
    },
}
</script>