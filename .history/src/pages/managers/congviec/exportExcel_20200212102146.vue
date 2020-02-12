<template>
<download-excel
    :data   = "json_data"
    :fields = "json_fields"
    type    = "csv"
    name    = "filename.xls">
 
<b-button icon-left="download"></b-button> 
</download-excel>

</template>
<script>
export default {
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
        json_data: [
            {
                'name': 'Tony Peña',
                'city': 'New York',
                'country': 'United States',
                'birthdate': '1978-03-15',
                'phone': {
                    'mobile': '1-541-754-3010',
                    'landline': '(541) 754-3010'
                }
            },
            {
                'name': 'Thessaloniki',
                'city': 'Athens',
                'country': 'Greece',
                'birthdate': '1987-11-23',
                'phone': {
                    'mobile': '+1 855 275 5071',
                    'landline': '(2741) 2621-244'
                }
            }
        ],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
        }
    }
}
</script>