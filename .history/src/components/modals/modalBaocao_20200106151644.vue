<template>
<b-tabs>
    <b-tab-item  label="Báo cáo tiến độ">
        <form @submit.prevent="api_bao_cao()" style="width:100%;padding:15px;">
            <div class="form-group row">
                <div class="col-sm-5 col-md-3 col-form-label">Tên công việc</div>
                <div class="col-sm-7 col-md-9">
                    {{getTaskEdit.ten_cv}}
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-5 col-md-3 col-form-label" >Tiến độ ({{getTaskEdit.tien_do}}%)</label>
                <div class="col-sm-7 col-md-9">
                    <b-field>
                      <b-slider type="is-success" v-model="getTaskEdit.tien_do" :custom-formatter="val => val + '%'"></b-slider>
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
        <div class="form-group row" v-for="(cv,index) in LIST_BAOCAO" :key="index">
            <div class="col-sm-12 col-md-12 col-form-label">{{cv.display_name}} - <small>{{cv.created_at}}</small> </div>
            <div class="col-sm-12 col-md-12">
                {{cv.noi_dung_baocao}}
            </div>
        </div>
         <div class="form-group row">
                <div class="col-sm-9">
                    <b-button style="margin-left:0" icon-left="close" class="btn btn-close btn-form" @click="$store.dispatch('updateModalEdit',false)">Close</b-button>  
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
        ...mapGetters(["getTaskEdit", "INFO_USER", "LIST_BAOCAO"])
    },
    methods: {
        api_bao_cao()
        {
            const baocao = {
                id_nd: this.INFO_USER.id_nd,
                noidung: this.noidung,
                id_cv_da: this.getTaskEdit.id_cv_da,
                tien_do: this.getTaskEdit.tien_do,
        
            }
            if(this.getTaskEdit.tien_do < 100)
            {
                baocao.trang_thai = 2
            }
            else
            {  
                 baocao.trang_thai = 3
                // baocao.append("P_TRANG_THAI",3)
            }
            // baocao.append("P_NOI_DUNG_BAOCAO", this.noidung)
            var app = this;
            this.$store.dispatch('createBaoCaoTienDo',baocao).then((response) => {
                if(response == true)
                {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Báo cáo công việc thành công',
                        position: 'is-bottom-left',
                        type: 'is-success',
                        hasIcon: true
                    })
                }
                else
                {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Lỗi! Xin vui lòng thử lại!',
                        position: 'is-bottom-left',
                        type: 'is-danger',
                        hasIcon: true
                    })
                }
            })
            // this.axios.post(this.$store.state.config.API_URL + 'cong-viec/'+ this.getTaskEdit.id_cv_da +'/baocao?api_token='+this.$cookies.get('token'),baocao)
            // .then((respose) => {
                
            //     app.$buefy.notification.open({
            //         duration: 1500,
            //         message: 'Báo cáo công việc thành công',
            //         position: 'is-bottom-right',
            //         type: 'is-success',
            //         hasIcon: true
            //     })
               
                
            // }).catch(() => {
            //     app.$buefy.notification.open({
            //         duration: 1500,
            //         message: 'Lỗi server',
            //         position: 'is-bottom-right',
            //         type: 'is-success',
            //         hasIcon: true
            //     })
            // })
        },
        api_get_baocao()
        {
            this.axios.get(this.$store.state.config.API_URL + 'bao-cao/'+this.getTaskEdit.id_cv_da+'?api_token='+this.$cookies.get('token'))
            .then((response) => {
                this.congviec = response.data
            })
        }
    },
    created()
    {
        this.$store.dispatch('fetchBaoCaoTienDoById',this.getTaskEdit.id_cv_da)
    }
}
</script>
        