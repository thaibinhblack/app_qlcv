<template>
<b-tabs>
    <b-tab-item  label="Báo cáo tiến độ">
        <form @submit.prevent="api_bao_cao()" style="width:100%;padding:15px;">
            <div class="form-group row">
                <div class="col-sm-5 col-md-3 col-form-label">Tên công việc</div>
                <div class="col-sm-7 col-md-9">
                    {{cong_viec_edit.ten_cv}}
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-5 col-md-3 col-form-label" >Tiến độ ({{cong_viec_edit.tien_do}}%)</label>
                <div class="col-sm-7 col-md-9">
                    <b-field>
                      <b-slider type="is-success" v-model="cong_viec_edit.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                    </b-field>
                </div>
            </div>

            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-12 col-form-label" >Nội dung báo cáo</label>
                <div class="col-sm-12">
                    <b-field>
                          <b-input v-model="noidung" maxlength="255" type="textarea"></b-input>
                    </b-field>
                </div>
            </div>

             <div class="form-group row">
                <div class="col-sm-9">
                    <button type="submit"  style="margin-left:0"  class="btn btn-primary btn-form">Báo cáo</button>
                    <b-button icon-left="close" class="btn btn-close btn-form" @click="close()">Close</b-button>  
                </div>
            </div>
        </form>
    </b-tab-item>
    <b-tab-item label="Nội dung tiến độ">

    </b-tab-item>
</b-tabs>
</template>

<script>
export default {
    props: ["cong_viec_edit", "my_info"],
    data()
    {
        return {
            noidung: ""
        }
    },
    methods: {
        api_bao_cao()
        {
            const baocao = new FormData()
            baocao.append("P_ID_CV", this.cong_viec_edit.id_cv)
            baocao.append("P_ID_ND",this.my_info.id_nd)
            baocao.append("P_NOI_DUNG_BAOCAO", this.noidung)
        }
    }
}
</script>
        