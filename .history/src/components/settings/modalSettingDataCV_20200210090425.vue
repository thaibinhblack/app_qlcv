<template>
    <div class="setting-datalist">
        <p class="background">CẬP NHẬT HIỂN THỊ LIST CÔNG VIỆC</p>
        <form action="">
            <ul class="list-setting">
                <li>
                    <div class="row">
                        <div class="col-sm-5">
                            <b-input disabled value="ID_CV_DA"></b-input>
                        </div>
                        <div class="col-sm-5">
                            <b-input v-model="setting.id_cv_da.label"></b-input>
                        </div>
                        <div class="col-sm-2">
                            <b-button :icon-left="setting.id_cv_da.hidden == true? 'close' : 'check'"></b-button>
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
            setting: {
                columns: {
                    column: 'ID_CV_DA',
                    label: 'ID CÔNG VIỆC',
                    hidden: true
                }
            }
        }
    }
}
</script>

<style scoped>
.list-setting {width: 100%}
.list-setting>li {width: 50%; display: inline-block;}
..list-setting>li>.row>div {padding: 5px !important;}
</style>