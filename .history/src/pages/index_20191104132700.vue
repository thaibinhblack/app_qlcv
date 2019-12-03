<template>
<div>
    {{token}}
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