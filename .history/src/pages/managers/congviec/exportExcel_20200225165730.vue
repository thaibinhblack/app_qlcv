<template>
<export-excel
    :data="json_data"
    :fields="json_fields">
   <b-button icon-left="download"></b-button> 
</export-excel>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: ["list_cong_viec"],
    computed:
    {
        ...mapGetters(["getCongViec"])
    },
    data(){
        return {
            json_fields: {
            'DỰ ÁN KHÁCH HÀNG': 'ten_du_an_kh',
            'TÊN CÔNG VIỆC': 'ten_cv',
            'LOẠI CÔNG VIỆC': 'ten_loai_cv',
            'NỘI DUNG CÔNG VIỆC': 'noi_dung_cv',
            'NGÀY TIẾP NHẬN': 'ngay_tiep_nhan',
            'NGÀY GIAO VIỆC': 'ngay_giao_viec',
            'NGÀY HOÀN THÀNH': 'ngay_hoan_thanh',
            'THỜI GIAN THỰC HIỆN': 'gio_thuc_hien',
            'ĐỘ ƯU TIÊN': 'do_uu_tien',
            'MÃ JIRA': 'ma_jira',
            'NGƯỜI GIAO VIỆC': 'ten_ngv',
            'NGƯỜI NHẬN VIỆC': 'ten_nnv',
            'TIẾN ĐỘ': 'tien_do',
            'TRẠNG THÁI': {
                field: 'trang_thai',
                callback: (value) => {
                    return value == 1 ? `Chưa thực hiện` : value == 2 ? `Đang thực hiện` : value == 3 ? `Đã hoàn thành` : `Đã gia hạn`;
                }
            }
        },
        json_data: this.list_cong_viec,
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
        }
    },
    watch:
    {
        getCongViec(val)
        {
            this.json_data = val
        }
    }
}
</script>