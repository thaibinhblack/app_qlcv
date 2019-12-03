<template>
<div id="page-ds-phong-ban">
    <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-7">
            <div class="card">
                <p class="background">Danh mục phòng ban</p>
                <form-group  :trung_tams="trung_tams" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-group': () => import('@/components/forms/formgroup.vue')
    },
    data()
    {
        return {
            trung_tams: []
        }
    },
    methods: {
        api_trung_tams()
        {
            this.axios.get(this.$store.state.config.API_URL + 'trung-tam?api_token='+this.$session.get("token")).then((response) => {
                this.trung_tams = response.data
            })
        },
    },
    created()
    {
        this.api_trung_tams()
    }
}
</script>