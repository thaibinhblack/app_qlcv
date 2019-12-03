<template>
<div id="page-loai-du-an">
    <div class="row">
        <div class="col-sm-12 col-md-7" style="margin:auto">
            <div class="edit-user card">
                <p class="background">Danh mục loại dự án</p>
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
</div>
</template>