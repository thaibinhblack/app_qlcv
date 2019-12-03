<template>
<div id="page-projects">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-mg-5" style="margin:auto">
            <div class="add-du-an card">
                 <p class="background">Danh mục dự án</p>
                 
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-du-an': () => import('@/components/forms/formDuAn.vue')
    },
    data()
    {
        return {
           
            loai_du_an: []
        }
    },
    methods: {
        api_loai_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token')).then((response) => {
                this.loai_du_an = response.data
            })
        }
    },
    created()
    {
        console.log('created')
        this.api_loai_du_an()
    }
}
</script>