<template>
<form @submit.prevent="api_create_customer()" class="form-rule row" style="padding: 15px;">
    <div class="col-sm-12 col-md-6">
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
    </div>
    <div class="col-sm-12 col-md-6">
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Người đại diện</label>
            <div class="col-sm-8">
                <b-input type="text" v-model="customer.nguoi_dai_dien" placeholder="Người dại diện" required></b-input>
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label" >Tình trạng chức năng</label>
            <div class="col-sm-8">
                <b-field>
                    <b-select v-model="customer.trang_thai_kh" >
                        
                        <option value="1" selected>Đang hoạt động</option>
                        <option value="2">Đang bảo trì</option>
                        <option value="3">Ngừng hoạt động</option>
                    </b-select>
                </b-field>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-12">
        <button type="submit" :disabled="update"  class="btn btn-primary btn-form" >Thêm</button>
        <button type="button" :disabled="!update" @click="update_khach_hang()" class="btn btn-warning btn-form">Sửa</button>
        <button type="button" v-if="update == true" @click="$emit('clear',false)" class="btn btn-danger btn-form">clear</button>
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
                trang_thai_kh: 1,
                ten_kh: "",
                dia_chi_kh: "",
                sdt_kh: "",
                nguoi_dai_dien: ""
            }
        }
    },
    watch: {
        customer_edit(newVal)
        {
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
            customer.append("NGUOI_DAI_DIEN_KH",this.customer.nguoi_dai_dien)
            customer.append("TRANG_THAI_KH",this.customer.trang_thai_kh);
            const app = this;
            this.axios.post(this.$store.state.config.API_URL +'customer?api_token='+this.$cookies.get('token'),customer).then((response) => {
                app.customer = {
                    trang_thai_kh: 1,
                    ten_kh: "",
                    dia_chi_kh: "",
                    sdt_kh: "",
                    nguoi_dai_dien: ""
                }
                const type = response.data.success == true ? 'is-success' : 'is-danger'
                app.$buefy.notification.open({
                    duration: 1500,
                    message: response.data.message,
                    position: 'is-bottom-right',
                    type: type,
                    hasIcon: true
                })
                app.$emit('create_customer',true)
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
            customer.append("TEN_KH",this.customer.ten_kh);
            customer.append("DIA_CHI_KH",this.customer.dia_chi_kh)
            customer.append("SDT_KH",this.customer.sdt_kh);
            customer.append("NGUOI_DAI_DIEN_KH",this.customer.nguoi_dai_dien)
            customer.append("TRANG_THAI_KH",this.customer.trang_thai_kh);
            const app = this;
            if(!this.customer.trang_thai_kh)
            {
                app.$buefy.notification.open({
                    duration: 1500,
                    message: 'Chưa chọn trạng thái cho khách hàng',
                    position: 'is-bottom-right',
                    type: 'is-warning',
                    hasIcon: true
                })
            }
            else
            {
                this.axios.post(this.$store.state.config.API_URL +'customer/'+this.customer.id_khach_hang+'?api_token='+this.$cookies.get('token'),customer).then((response) => {
                    app.customer = {
                        trang_thai_kh: 1
                    }
                    const type = response.data.success == true ? 'is-success' : 'is-danger'
                    app.$emit('update_khachhang',false)
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: response.data.message,
                        position: 'is-bottom-right',
                        type: type,
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
}
</script>