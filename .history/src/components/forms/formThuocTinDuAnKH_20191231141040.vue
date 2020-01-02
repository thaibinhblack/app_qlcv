<template>
<form @submit.prevent="api_create_thongtin()" class="form-rule" style="padding: 15px;">
    <div class="row">
         <item-form-thongtin v-for="(tt,index) in thong_tin" :key="index" 
         :tt="tt" @edit_item="tt_edit = $event" 
         :tt_edit="tt_edit" :update="update"
         @update_tt_edit="tt_edit = $event" />
        
    </div>
     <div class="form-group row">
         <div class="form-group col-sm-12 col-md-6 row">
            <div class="col-sm-12 col-md-4">
                <b-field>
                    <b-input v-model="attribute.ten_thongtin" placeholder="Tên thông tin"></b-input>
                </b-field>
            </div>
            <div class="col-sm-12 col-md-8">
            <b-field>
                <b-input v-model="attribute.noi_dung_thongtin" placeholder="Nội dung thông tin"></b-input>
            </b-field>
            </div>
        </div>
        <div class="col-sm-8">
            <button v-if=" Object.entries(this.tt_edit).length === 0" style="margin-left:0" type="subbmit" class="btn btn-primary btn-form">Lưu lại</button>
            <button v-else style="margin-left:0" type="submit" class="btn btn-primary btn-form">Cập nhật</button>
        </div>
    </div>
</form>
</template>

<script>
export default {
    props:["du_an_kh","thong_tin"],
    components: {
        'item-form-thongtin': () => import('./itemFormThongTin.vue')
    },
    data()
    {
        return {
            attribute: {
                ten_thongtin: "",
                noi_dung_thongtin: ""
            },
            tt_edit: {

            },
            update: false
        }
    },
    watch:
    {
        du_an_kh()
        {
            this.tt_edit = {}
        }
    },
    methods:
    {
        api_create_thongtin()
        {
            var app = this;
            if( Object.entries(this.tt_edit).length === 0)
            {
                 const form_data= new FormData();
                form_data.append("P_ID_DU_AN_KH",this.du_an_kh.id_du_an_kh)
                form_data.append("P_TEN_THONGTIN",this.attribute.ten_thongtin)
                form_data.append("P_NOI_DUNG_THONGTIN",this.attribute.noi_dung_thongtin)
                // console.log(this.du_an_kh)
                
                this.axios.post(this.$store.state.config.API_URL + 'thong-tin-duan-kh?api_token='+this.$cookies.get('token'),form_data).then((response) => {
                
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Thêm thông tin mới thành công',
                        position: 'is-bottom-right',
                        type: 'is-success',
                        hasIcon: true
                    })
                }).catch(() => {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Lõi server',
                        position: 'is-bottom-right',
                        type: 'is-success',
                        hasIcon: true
                    })
                })
            } 
            else
            {
                const result  = this.$store.dispatch('updateThongTin',this.tt_edit);
                if(result == false)
                {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Lỗi! Xin vui lòng thử lại',
                        position: 'is-bottom-left',
                        type: 'is-danger',
                        hasIcon: true
                    })
                }
                else
                {
                    this.update = true
                    this.tt_edit = {}
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Thêm thông tin mới thành công',
                        position: 'is-bottom-left',
                        type: 'is-success',
                        hasIcon: true
                    })
                }
            }
           
        }
    }
}
</script>