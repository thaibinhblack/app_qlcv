<template>
<form style="width:100%;padding:15px;">

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Tên lịch công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
            <b-field>
                    <b-input type="text" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Thời gian công tác <span class="color-red">(*)</span></label>
         <div class="col-sm-3">
            <input type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
         <div class="col-sm-3">
            <input type="number" min="1" max="24" class="tag-time" style="margin-right:5px;"> giờ :
            <input type="number" min="0" max="59" class="tag-time" style="margin-left: 5px;"> phút
        </div>
        <div class="col-sm-3">
            <b-field>
                    <b-input type="date" placeholder="Nhập tên lịch công tác" required> </b-input>
            </b-field>
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Nội dung công tác <span class="color-red">(*)</span></label>
        <div class="col-sm-12">
            <vue-editor v-model="content" />
        </div>
        <label for="inputPassword3" class="col-sm-12 col-form-label" >Người đi công tác <span class="color-red">(*)</span></label>


    </div>
</form>
</template>
<script>
import Multiselect from 'vue-multiselect'
export default {
    components:
    {
        Multiselect
    }
}
</script>
<style scoped>

.tag-time {    padding: 3px;
    line-height: unsetpx;
    line-height: 36px;
    height: 36px;
    width: 45px;
    text-align: center;}
</style>

