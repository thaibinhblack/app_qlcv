<template>
    <div class="setting-datalist">
        <p class="background">CẬP NHẬT HIỂN THỊ LIST CÔNG VIỆC</p>
        <form action="">
            <ul class="list-setting">
                <li>
                    <div class="row">
                        <div class="col-sm-5">
                            <b-input disabled v-model="setting.columns.column" value="ID_CV_DA"></b-input>
                        </div>
                        <div class="col-sm-5">
                            <b-input v-model="setting.columns.label"></b-input>
                        </div>
                        <div class="col-sm-2">
                            <b-button :icon-left="setting.columns.hidden == true? 'close' : 'check'"></b-button>
                        </div>
                    </div>
                </li>
               
            </ul>
        </form>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            setting: [
                {
                    column: 'ID_CV_DA',
                    label: 'ID CÔNG VIỆC',
                    hidden: true
                },
                                {
                    column: 'ten_du_an_kh',
                    label: 'TÊN DỰ ÁN KHÁCH HÀNG',
                    hidden: true
                },
                {
                    column: 'ten_loai_cv',
                    label: 'TÊN LOẠI CÔNG VIỆC',
                    hidden: true
                },
                {
                    column: 'TEN_CV',
                    label: 'TÊN CÔNG VIỆC',
                    hidden: true
                },
                {
                    column: 'NOI_DUNG_CV',
                    label: 'NỘI DUNG CÔNG VIỆC',
                    hidden: true
                },
                {
                    column: 'NGAY_TIEP_NHAN',
                    label: 'NGÀY TIẾP NHẬN',
                    hidden: true
                },
                {
                    column: 'NGAY_HOAN_THANH',
                    label: 'NGÀY HOÀN THÀNH',
                    hidden: true
                },
                {
                    column: 'NGAY_CAM_KET',
                    label: 'NGÀY CAM KẾT',
                    hidden: true
                },
                {
                    column: 'DO_UU_TIEN',
                    label: 'ĐỘ ƯU TIÊN',
                    hidden: true
                },
                {
                    column: 'MA_JIRA',
                    label: 'MÃ JARA',
                    hidden: true
                },

                {
                    column: 'NGUOI_GIAO_VIEC',
                    label: 'NGƯỜI GIAO VIỆC',
                    hidden: true
                },
                {
                    column: 'NGUOI_NHAN_VIEC',
                    label: 'NGƯỜI NHẬN VIỆC',
                    hidden: true
                },
                {
                    column: 'TIEN_DO',
                    label: 'TIẾN ĐỘ',
                    hidden: true
                },
                {
                    column: 'GHI_CHU',
                    label: 'GHI CHÚ',
                    hidden: true
                },

                
            ]
        }
    }
}
</script>

<style scoped>
.list-setting {width: 100%}
.list-setting>li {width: 50%; display: inline-block;}
..list-setting>li>.row>div {padding: 5px !important;}
</style>