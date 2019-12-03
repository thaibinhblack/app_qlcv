<template>
<form @submit.prevent="api_create_customer()" class="form-rule" style="padding: 15px;">
    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên khách hàng</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.ten_kh"  placeholder="Tên khách hàng" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Địa chỉ khách hàng</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.dia_chi_kh"  placeholder="Địa chỉ khách hàng" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >SĐT khách hàng</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.sdt_kh" placeholder="Số điện thoại khách hàng" required></b-input>
        </div>
    </div>
        <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Người đại diện</label>
        <div class="col-sm-8">
            <b-input type="text" v-model="customer.nguoi_dai_dien_kh" placeholder="Người dại diện" required></b-input>
        </div>
    </div>
    {{customer.ten_Kh}}
     <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
        <div class="col-sm-8">
            <b-field>
                <b-select v-model="customer.tinh_trang_khach_hang" >
                    
                    <option value="1" selected>Đang hoạt động</option>
                    <option value="2">Đang bảo trì</option>
                    <option value="3">Ngừng hoạt động</option>
                </b-select>
            </b-field>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-8">
            <button type="submit" :disabled="update"  class="btn btn-primary btn-form" >Thêm</button>
            <button type="button" :disabled="!update" @click="update_khach_hang()" class="btn btn-warning btn-form">Sửa</button>
            <button type="button" v-if="update == true" @click="$emit('clear',false)" class="btn btn-danger btn-form">clear</button>
        </div>          
    </div>
</form>
</template>

<script>
export default {
    props: ["update", "customer_edit"],
    data()
    {
        return {
            customer: {
                tinh_trang_khach_hang: 1
            }
        }
    },
    watch: {
        customer_edit(newVal)
        {
            console.log(newVal)
            this.customer = newVal
        }
    },
    methods:
    {
        api_create_customer()
        {
            const customer = new FormData();
            customer.append("TEN_KH",this.customer.ten_kh);
            customer.append("DIA_CHI_KH",this.customer.dia_chi_kh)
            customer.append("SDT_KH",this.customer.sdt_kh);
            customer.append("NGUOI_DAI_DIEN_KH",this.customer.nguoi_dai_dien_kh)
            customer.append("TRANG_THAI_KH",this.customer.tinh_trang_khach_hang);
            const app = this;
            this.axios.post(this.$store.state.config.API_URL +'customer?api_token='+this.$session.get('token'),customer).then((response) => {
                app.customer = {
                    trang_thai_kh: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: response.success == true ? 'is-success' : 'is-danger',
                    hasIcon: true
                })
            }).catch(() => {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi server',
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            })

        },
        update_khach_hang()
        {
            const customer = new FormData();
            customer.append("TEN_KH",this.customer.ten_Kh);
            customer.append("DIA_CHI_KH",this.customer.dia_chi_kh)
            customer.append("SDT_KH",this.customer.sdt_kh);
            customer.append("NGUOI_DAI_DIEN_KH",this.customer.nguoi_dai_dien_kh)
            customer.append("TRANG_THAI_KH",this.customer.tinh_trang_khach_hang);
            const app = this;
            this.axios.post(this.$store.state.config.API_URL +'customer/'+this.customer.id_khach_hang+'?api_token='+this.$session.get('token'),customer).then((response) => {
                app.customer = {
                    trang_thai_kh: 1
                }
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: response.success == true ? 'is-success' : 'is-danger',
                    hasIcon: true
                })
            }).catch(() => {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi server',
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true
                })
            }) 
        }
    }
}
</script>