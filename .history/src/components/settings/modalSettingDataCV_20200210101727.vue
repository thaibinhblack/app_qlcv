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
                <b-button type="is-info" @click="UPDATE_SETTING()">CẬP NHẬT</b-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["settings"])
    },
    methods: {
        UPDATE_SETTING()
        {
            // const P_VALUE_SETTING = JSON.stringify(this.settings)
            // console.log(P_VALUE_SETTING.length)
            this.$store.dispatch("SETTING_HIENTHI",this.settings).then((response) => {
                console.log(response)
            })
        }
    }
}
</script>

<style scoped>
.setting-datalisst > form {padding: 15px;}
.list-setting {width: 100%;padding: 15px;margin-top: 25px;}
.list-setting>li {width: 50%; display: inline-block;}
.list-setting>li>.row>div {padding: 5px !important;}
</style>