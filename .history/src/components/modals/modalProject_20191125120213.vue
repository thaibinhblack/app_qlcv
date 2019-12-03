<template>
<form>
     <div class="form-group row">        
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên công việc</label>
        <div class="col-sm-8">
        <b-input type="text" v-model="cong_viec.ten_cv" required placeholder="Tên công việc" ></b-input>
        </div>
    </div>
</form>
</template>