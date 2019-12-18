<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-4">

        </div>
    </div>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            thongke_loai_duan: []
        }
    },
    methods: {
        api_thong_ke()
        {
            this.axios.get(this.$store.state.config.API_URL + 'thong-ke-loai-du-an').then((repsonse) => {
                this.thongke_loai_duan = repsonse.data
            })
        }
    }
}
</script>