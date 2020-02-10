<template>
    <div class="setting-datalist">
        <p class="background">CẬP NHẬT HIỂN THỊ LIST CÔNG VIỆC</p>
        <form action="">
            <ul class="list-setting">
                <li v-for="(setting,index) in settings" :key="index">
                    <div class="row">
                        <div class="col-sm-5">
                            <b-input disabled v-model="setting.column" value="ID_CV_DA"></b-input>
                        </div>
                        <div class="col-sm-5">
                            <b-input v-model="setting.label"></b-input>
                        </div>
                        <div class="col-sm-2">
                            <b-button :icon-left="setting.hidden == true? 'close' : 'check'" @click="setting.hidden = !setting.hidden"></b-button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="subbmit">
                <b-button is-success>CẬP NHẬT</b-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            settings: [
                {
                    column: 'ID_CV_DA',
                    label: 'ID CÔNG VIỆC',
                    hidden: true
                },
                {
                    column: 'TEN_CV',
                    label: 'TÊN CÔNG VIỆC',
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
                    column: 'ten_ngv',
                    label: 'NGƯỜI GIAO VIỆC',
                    hidden: true
                },
                {
                    column: 'ten_nnv',
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
                }
                
            ]
        }
    }
}
</script>

<style scoped>
.list-setting {width: 100%;padding: 15px;margin-top: 25px;}
.list-setting>li {width: 50%; display: inline-block;}
.list-setting>li>.row>div {padding: 5px !important;}
</style>