<template>
 <form class="form-rule" style="padding: 15px;">
    <div class="row" v-for="(setting,index) in settings" :key="index" style="margin: 10px 0;">
        <div class="col-sm-12 col-md-3">
            <b-field>
                <b-input v-model="setting.NAME_ATTRIBUTE" type="text" placeholder="Nhập tên thuộc tinh" label="Tên thuộc tính"></b-input>
            </b-field>
        </div>
        <div class="col-sm-12 col-md-4">
            <b-field>
                <b-input v-model="setting.NOT_ATTRIBUTE" type="text" placeholder="Nhập tên thuộc tinh" label="Ghi chú"></b-input>
            </b-field>
        </div>
        <div class="col-sm-12 col-md-3">
            <b-field>
                <b-select v-model="setting.TYPE_ATTRIBUTE">
                    <option value="string">Kiểu string</option>
                     <option value="number">Kiểu number</option>
                      <option value="date">Kiểu date</option>
                </b-select>
            </b-field>
        </div>
        <div class="col-sm-12 col-md-2">
            <b-button icon-left="delete"></b-button>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12" style="margin-top: 15px;">
            <button v-if="getAction_danhmuc.them == '5.2'" type="button"  @click="addAttribute()"  class="btn btn-primary btn-form">Thêm</button>
            <button v-if="getAction_danhmuc.sua == '5.3'" type="button" class="btn btn-warning btn-form" @click="createSetting()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
    
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
            settings: [
                {
                    NAME_ATTRIBUTE: '',
                    NOTE_ATTRIBUTE: '',
                    TYPE_ATTRIBUTE: 'string'
                }
            ]
        }
    },
    computed: {
        ...mapGetters(["getAction_danhmuc", "SETTING_DU_AN"])
    },
    watch:
    {
        du_an_kh_edit(newVal)
        {
            // console.log(Object.entries(newVal).length)
            if(Object.entries(newVal).length > 0)
            {
                this.$store.dispatch("fetchSettingDuAn",newVal.id_du_an)
            }
        },
        SETTING_DU_AN(val)
        {
            // console.log(val)
            this.settings = val
        }
    },
    methods: {
        addAttribute()
        {
            this.settings.push(  {
                    NAME_ATTRIBUTE: '',
                    NOTE_ATTRIBUTE: '',
                    TYPE_ATTRIBUTE: 'string'
                })
        },
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