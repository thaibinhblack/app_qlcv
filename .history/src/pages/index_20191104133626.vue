<template>
<div>
    <div class="columns is-mobile">
        <div class="column">1</div>
        <div class="column">2</div>
        <div class="column">3</div>
        <div class="column">4</div>
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