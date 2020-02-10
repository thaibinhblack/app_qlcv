<template>
    <div class="setting-datalist">
        <p class="background">CẬP NHẬT HIỂN THỊ LIST CÔNG VIỆC</p>
        <form action="">
            <ul class="list-setting">
                <li>
                    <div class="row">
                        <div class="col-sm-5">ID_CV_DA</div>
                        <div class="col-sm-5">
                            <b-input v-model="setting.label"></b-input>
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
                id_cv_da: {
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
</style>