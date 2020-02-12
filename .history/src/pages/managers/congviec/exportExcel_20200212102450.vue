<template>
<download-excel
    :data   = "json_data"
    :fields = "json_fields"
    type    = "csv"
    name    = "THỐN KÊ CÔNG VIỆC.xls">
 
<b-button icon-left="download"></b-button> 
</download-excel>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
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
            'TIẾN ĐỘ': 'tien_do'
        },
        json_data: this.getCongViec,
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