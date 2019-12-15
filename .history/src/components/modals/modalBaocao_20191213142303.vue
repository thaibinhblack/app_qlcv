<template>
<b-tabs>
    <b-tab-item  label="Báo cáo tiến độ">
        <form @submit.prevent="api_bao_cao()" style="width:100%;padding:15px;">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                    <div class="col-sm-4 col-form-label">Tên công việc</div>
                    <div class="col-sm-8">
                        {{cong_viec_edit.ten_cv}}
                    </div>
                </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-9">
                    <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
                    <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="api_capnhat_congviec()">Cập nhật</button>
                    <button type="submit" v-if="update == true" @click="clear()" class="btn btn-success btn-form">Clear</button>
                    <b-button icon-left="close" class="btn btn-close btn-form" @click="close()">Close</b-button>  
                </div>
            </div>
        </form>
    </b-tab-item>
</b-tabs>
</template>

<script>
export default {
    props: ["cong_viec_edit"]
}
</script>
        