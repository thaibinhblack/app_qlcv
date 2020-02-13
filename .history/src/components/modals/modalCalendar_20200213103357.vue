<template>
<form @keydown.esc="close()" @submit.prevent="api_cong_viec()" style="width:100%;padding:15px;">

 <div class="form-group row">
                <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
                <div class="col-sm-9">
                    <b-field>
                        <b-select v-model="du_an_kh.id_du_an"  required>
                            <option value="0"> --Tất cả dự án--</option>
                            <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an"> {{da.ten_du_an}}</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
</form>
</template>

