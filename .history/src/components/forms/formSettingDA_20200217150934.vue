<template>
 <form @submit.prevent="api_du_an()" class="form-rule" style="padding: 15px;">
    <div class="row" v-for="(setting,index) in settings" :key="index">
        <div class="col-sm-12 col-md-3">
            <b-filed>
                <b-input v-model="setting.NAME_ATTRIBUTE" type="text" placeholder="Nhập tên thuộc tinh" label="Tên thuộc tính"></b-input>
            </b-filed>
        </div>
        <div class="col-sm-12 col-md-4">
            <b-filed>
                <b-input v-model="setting.NOT_ATTRIBUTE" type="text" placeholder="Nhập tên thuộc tinh" label="Ghi chú"></b-input>
            </b-filed>
        </div>
        <div class="col-sm-12 col-md-3">
            <b-filed>
                <b-select v-model="setting.TYPE_ATTRIBUTE">
                    <option value="string">Kiểu string</option>
                     <option value="number">Kiểu number</option>
                      <option value="date">Kiểu date</option>
                </b-select>
            </b-filed>
        </div>
        <div class="col-sm-12 col-md-2">
            <b-button icon-left="delete"></b-button>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12" style="margin-top: 15px;">
            <button v-if="getAction_danhmuc.them == '5.2'" type="button"  @click="addAttribute()"  class="btn btn-primary btn-form">Thêm</button>
            <button v-if="getAction_danhmuc.sua == '5.3'" type="button" class="btn btn-warning btn-form" @click="updateLoaiDuAn()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
    
        </div>
    </div>

</form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ["update", "du_an_edit", "users"],
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
        ...mapGetters(["getAction_danhmuc"])
    },
    watch:
    {
        du_an_edit(newVal)
        {
            this.du_an = newVal
            this.selected_user_ql = this.users.filter((value,index,array) => {
                return array[index].id_nd == newVal.id_ql
            })[0]
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
        }
        
    },
    created()
    {
        this.api_loai_du_an()
    }
}
</script>