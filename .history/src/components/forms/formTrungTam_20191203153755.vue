<template>
<form @submit.prevent="api_trung_tam()" style="padding:15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên Trung Tâm</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="trungtam.ten_tt"  placeholder="Tên trung tâm" required></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
        <div class="col-sm-8">
            <b-input type="textarea" minlength="10"
            maxlength="255" placeholder="Mô tả trung tâm" 
            v-model="trungtam.mo_ta_tt"   ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Ghi chú</label>
        <div class="col-sm-8">
            <b-input type="text"  placeholder="Ghi chú"
            v-model="trungtam.ghi_chu_tt"  ></b-input>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng</label>
        <div class="col-sm-8">
            <b-field>
                <b-select placeholder="Danh sách phòng ban"  v-model="trungtam.trang_thai_tt" >
                
                    <option value="1" selected>Đang hoạt động</option>
                    <option value="2">Đang bảo trì</option>
                    <option value="3">Ngừng hoạt động</option>
                </b-select>
            </b-field>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-8">
        <button type="submit" class="btn btn-primary btn-form">Thêm</button>
    
        </div>
        
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            trungtam: {
                trang_thai_tt: 1
            }
        }
    },
    methods: 
    {
        api_trung_tam()
        {
            const trung_tam = new FormData()
            trung_tam.append("P_TEN_TT",this.trungtam.ten_tt);
            trung_tam.append("P_MO_TA",this.trungtam.mo_ta_tt);
            trung_tam.append("P_GHI_CHU",this.trungtam.ghi_chu_tt);
            trung_tam.append("P_TRANG_THAI",this.trungtam.trang_thai_tt);
            const app  = this;
            this.axios.post(this.$store.state.config.API_URL + 'trung-tam?api_token='+this.$cookies.get('token'),trung_tam).then((response) => {
                app.trungtam = {
                    trang_thai_tt: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: `Thêm trung tâm mới thành công`,
                    position: 'is-bottom-right',
                    type: 'is-success',
                    hasIcon: true
                })
                app.$emit('createGroup',true)
            }).catch(() => {
                 app.$buefy.notification.open({
                    duration: 1500,
                    message: `Thêm trung tâm mới thất bại`,
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            })
           
        }
    }
}
</script>