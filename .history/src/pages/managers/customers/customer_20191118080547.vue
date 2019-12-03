<template>
<div id="page-customer">
    <div class="row">
        <div class="auto col-md-6 col-sm-12">
            <div class="card">
                <form @submit.prevent="api_function()" class="form-rule">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mã chức năng</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Mã chức năng" v-model="fc.MA_CN" required></b-input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>