<template>
<div id="page-rule" class="row">
    <div class="col-sm-12">
        <div>
           
            <div class="row">
                <div class="col-md-6 sm-12">
                    <div class="card">
                         <p class="background">Danh mục quyền</p>
                        <form-group />
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
                        name="name"
                        native-value="Flint">
                        Quyền 1
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
    }
}
</script>

<style scoped>
.background {padding: 7px 15px;background: #0051e9; color: #fff;}
.card-rule {padding: 7px}
</style>

