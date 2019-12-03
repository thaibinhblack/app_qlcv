<template>
<div id="page-projects">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-mg-5">
            <div class="add-du-an card">
                 <p class="background">Danh mục dự án</p>
                 <form @submit.prevent="api_create_customer()" class="form-rule" style="padding: 15px;">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên khách hàng</label>
                        <div class="col-sm-8">
                            <b-input type="text"  placeholder="Tên khách hàng" required></b-input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>