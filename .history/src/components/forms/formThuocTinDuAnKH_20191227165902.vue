<template>
<form @submit.prevent="api_create_thongtin()" class="form-rule" style="padding: 15px;">
    <div class="row">
         <div class="form-group col-sm-12 col-md-6 row" v-for="(tt,index) in thong_tin" :key="index">
            <label class="col-sm-12 col-md-4">
                {{tt.ten_thongtin}}
            </label>
            <div class="col-sm-12 col-md-8">
                {{tt.noi_dung_thongtin}}
            </div>
        </div>
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
    </div>
     <div class="form-group row">
        <div class="col-sm-8">
            <button style="margin-left:0" type="subbmit" class="btn btn-primary btn-form">Lưu lại</button>
        </div>
    </div>
</form>
</template>

<script>
export default {
    props:["du_an_kh","thong_tin"],
    data()
    {
        return {
            attribute: {
                ten_thongtin: "",
                noi_dung_thongtin: ""
            }
        }
    },
    methods:
    {
        api_create_thongtin()
        {
            const form_data= new FormData();
            form_data.append("P_ID_DU_AN_KH",this.du_an_kh.id_du_an_kh)
            form_data.append("P_TEN_THONGTIN",this.attribute.ten_thongtin)
            form_data.append("P_NOI_DUNG_THONGTIN",this.attribute.noi_dung_thongtin)
            // console.log(this.du_an_kh)
            this.axios.post(this.$store.state.config.API_URL + 'thong-tin-duan-kh?api_token='+this.$cookies.get('token'),form_data).then((response) => {
                console.log(response.data)
            })
        }
    }
}
</script>