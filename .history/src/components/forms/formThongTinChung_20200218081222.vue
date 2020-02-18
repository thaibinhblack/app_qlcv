<template>
 <form class="form-rule" style="padding: 15px;">
     <!-- {{settings}} {{du_an_kh_edit}} -->
     {{du_an_kh_edit}}
     {{settings}}
    <div class="row" v-for="(setting,index) in settings" :key="index" style="margin: 10px 0;">
        <div class="col-sm-12 col-md-4">
            <span>{{setting.NAME_ATTRIBUTE}}</span>
        </div>
        <div class="col-sm-12 col-md-8">
            <b-field>
                <b-input v-model="settings[index].VALUE_ATTRIBUTE" :placeholder="setting.NOT_ATTRIBUTE" :type="setting.TYPE_ATTRIBUTE" ></b-input>
            </b-field>
        </div>
      
    </div>
    <p>{{Object.entries(settings).length == 0 ? 'Chưa cài đặt thông tin cho dự án này' : ''}}</p>
    <div class="row">
        <div class="col-sm-12 col-md-12" style="margin-top: 15px;">
            <button v-if="getAction_danhmuc.sua == '5.3'" type="button" class="btn btn-warning btn-form" @click="createSetting()">Cập nhật</button>
    
        </div>
    </div>

</form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ["update", "du_an_kh_edit", "users"],
    data()
    {
        return {
            du_an: {
                trang_thai_du_an: 1
            },
            loai_du_an: [],
            selected_user_ql: {},
            settings: []
        }
    },
    computed: {
        ...mapGetters(["getAction_danhmuc", "SETTING_DU_AN"])
    },
    watch:
    {
        SETTING_DU_AN(val)
        {
            // console.log(val)
            this.settings = val
            this.settings.forEach((setting) => {{
                setting.VALUE_ATTRIBUTE = ""
            }})
        }
    },
    methods: {

        createSetting()
        {
            if(Object.entries(this.du_an_kh_edit).length > 0)
            {
                this.$store.dispatch("createSettingDuAn",{
                    id_du_an: this.du_an_kh_edit.id_du_an,
                    VALUE_CD_DA: this.settings
                })
                .then(() => {
                    this.$buefy.notification.open({
                        duration: 1500,
                        message: 'Cập nhật thuộc tính dự án thành công',
                        position: 'is-bottom-left',
                        type: 'is-success',
                        hasIcon: true
                    })
                })
                .catch(() => {
                    this.$buefy.notification.open({
                        duration: 1500,
                        message: 'Lỗi server!',
                        position: 'is-bottom-left',
                        type: 'is-dnager',
                        hasIcon: true
                    })
                })
            }
            else
            {
                 this.$buefy.notification.open({
                        duration: 1500,
                        message: 'Chưa chọn dự án để thêm thuộc tính',
                        position: 'is-bottom-left',
                        type: 'is-warning',
                        hasIcon: true
                    })
            }
        }
        
    },
}
</script>