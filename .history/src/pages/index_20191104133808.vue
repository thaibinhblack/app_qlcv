<template>
<div>
    <div class="sidebar-left">
        
    </div>
</div>
</template>
<script>
export default {
    data()
    {
        return {
            token: ''
        }
    },
    created()
    {
        this.token = this.$session.get('token')
    }
}
</script>