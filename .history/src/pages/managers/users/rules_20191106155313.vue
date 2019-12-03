<template>
<div id="page-rule" class="row">
    <div class="col-sm-12">
        <div>
           
            <div class="row">
                <div class="col-md-6 sm-12">
                    <div class="card">
                         <p class="background">Danh mục quyền</p>
                        <form-group @addgroup="addgroup = $event" />
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                     <div class="card">
                         <p class="background">Danh mục quyền</p>
                     <form-rule />
                     </div>
                </div>
            </div>
        </div>
        
    </div>
    <div class="col-sm-12">
        <div class="row">
            <div class="col-md-3">
                <div class="card card-rule">
                    <b-radio v-model="radio"
                        width="100%"
                        name="name"
                        native-value="Flint">
                        Quyền 1
                    </b-radio>
                    <b-radio v-model="radio"
                        width="100%"
                        name="name"
                        native-value="Flint">
                        Quyền 2
                    </b-radio>
                    <b-radio v-model="radio"
                        width="100%"
                        name="name"
                        native-value="Flint">
                        Quyền 3
                    </b-radio>
                    <b-radio v-model="radio"
                        width="100%"
                        name="name"
                        native-value="Flint">
                        Quyền 4
                    </b-radio>
                    <b-radio v-model="radio"
                        width="100%"
                        name="name"
                        native-value="Flint">
                        Quyền 5
                    </b-radio>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {
        'form-rule': () => import('@/components/forms/formrule.vue'),
        'form-group': () => import('@/components/forms/formgroup.vue')
    },
    data()
    {
        return {
            addgroup: false,
        }
    },
    watch:{
        addgroup(newVal)
        {
            if(newVal == true)
            {

            }
        }
    },
    methods: {
        api_groups()
        {
            this.axios.get(this.$store.state.config.API_URL + 'groups').then((response) => {
                this.groups = response.data
            })
        }
    }
    
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.card-rule {padding: 10px}
</style>

