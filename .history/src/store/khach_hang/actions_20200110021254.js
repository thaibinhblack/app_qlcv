import axios from '@/axios'
export default {
    CREATE_CUSTOMER: ({commit}, customer) =>
    {
        return new Promise((resolve,reject) => {
            var form_customer = new FormData()
            form_customer.append("TEN_KH",customer.ten_kh);
            form_customer.append("DIA_CHI_KH",customer.dia_chi_kh)
            form_customer.append("SDT_KH",customer.sdt_kh);
            form_customer.append("NGUOI_DAI_DIEN_KH",customer.nguoi_dai_dien)
            form_customer.append("TRANG_THAI_KH",customer.trang_thai_kh);
            axios.post('/api/customer?api_token='+axios.defaults.params.api_token,form_customer)
            .then((response) => {
                form_customer.append()
            })
        })
    }
}