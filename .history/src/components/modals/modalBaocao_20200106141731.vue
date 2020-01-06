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
                    <b-button icon-left="close" class="btn btn-close btn-form" @click="$emit('close',false)">Close</b-button>  
                </div>
            </div>
        </form>
    </b-tab-item>
    <b-tab-item label="Nội dung tiến độ">
        <div class="form-group row" v-for="(cv,index) in congviec" :key="index">
            <div class="col-sm-12 col-md-12 col-form-label">{{cv.display_name}} - <small>{{cv.created_at}}</small> </div>
            <div class="col-sm-12 col-md-12">
                {{cv.noi_dung_baocao}}
            </div>
        </div>
         <div class="form-group row">
                <div class="col-sm-9">
                   
                    <b-button style="margin-left:0" icon-left="close" class="btn btn-close btn-form" @click="$emit('close',false)">Close</b-button>  
                </div>
            </div>
    </b-tab-item>
</b-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ["cong_viec_edit", "my_info"],
    data()
    {
        return {
            noidung: "",
            congviec: []
        }
    },
    computed:
    {
        ...mapGetters(["getTaskEdit"])
    },
    methods: {
        api_bao_cao()
        {
            const baocao = new FormData()
            // baocao.append("P_ID_CV", this.cong_viec_edit.id_cv_da)
            baocao.append("P_ID_ND",this.my_info.id_nd)
            baocao.append("P_NOI_DUNG_BAOCAO", this.noidung)
            baocao.append("P_ID_CV", this.cong_viec_edit.tien_do)
            baocao.append("P_TIEN_DO",this.cong_viec_edit.tien_do)
            if(this.cong_viec_edit.tien_do < 100)
            {
                baocao.append("P_TRANG_THAI",2)
            }
            else
            {  
                baocao.append("P_TRANG_THAI",3)
            }
            baocao.append("P_NOI_DUNG_BAOCAO", this.noidung)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+ this.cong_viec_edit.id_cv_da +'/baocao?api_token='+this.$cookies.get('token'),baocao)
            .then((respose) => {
                
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Báo cáo công việc thành công',
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
                const content = this.my_info.display_name + ' vừa báo cáo tiến độ công việc ' + this.cong_viec_edit.ten_cv + ' Tiến độ công việc: ' + this.cong_viec_edit.tien_do +'% Nội dung là: '+ this.noidung
                this.axios.post("https://api.telegram.org/bot984384864:AAHL9TTvMytHSHiRJA4eEd5O3fv4njLCbK8/sendMessage",{
                    'chat_id': '-1001463887834',
                    'text':   content
                });
                this.noidung = ""
                this.api_get_baocao()
                
            }).catch(() => {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi server',
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
            })
        },
        api_get_baocao()
        {
            this.axios.get(this.$store.state.config.API_URL + 'bao-cao/'+this.cong_viec_edit.id_cv_da+'?api_token='+this.$cookies.get('token'))
            .then((response) => {
                this.congviec = response.data
            })
        }
    },
    created()
    {
        this.api_get_baocao()
    }
}
</script>
        