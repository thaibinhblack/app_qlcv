<template>
<b-tabs>
    <b-tab-item  label="Báo cáo tiến độ">
        <form @submit.prevent="api_bao_cao()" style="width:100%;padding:15px;">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                    <div class="col-sm-5 col-md-5 col-form-label">Tên công việc</div>
                    <div class="col-sm-7">
                        {{cong_viec_edit.ten_cv}}
                    </div>
                </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-9">
               
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
        