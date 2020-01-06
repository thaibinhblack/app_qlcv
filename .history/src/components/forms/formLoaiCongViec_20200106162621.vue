<template>
<form @submit.prevent="api_loai_cv()" class="form-rule" style="padding: 15px;">
    <!-- {{loai_cv}} -->
    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Công việc con</label>
                <div class="col-sm-8">
                    <b-field>
                        <b-checkbox v-model="parent"></b-checkbox>
                    </b-field>
                </div>
            </div>
            <div class="form-group row" v-if="parent == true">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >DS công việc cha</label>
                <div class="col-sm-8">
                    <b-filed>
                        <b-select placeholder="Danh sách loại công việc cha" expanded v-model="loai_cv.parent">
                            <option v-for="(lcv,index) in ds_loai_cv" :key="index" :value="lcv.id_loai_cv"> {{lcv.ten_loai_cv}}</option>
                        </b-select>
                    </b-filed>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại công việc</label>
                <div class="col-sm-8">
                <b-input type="text" maxlength="50" placeholder="Tên loại công việc" v-model="loai_cv.ten_loai_cv"></b-input>
                </div>
            </div>
            <div class="form-group row">
               
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại công việc</label>
                <div class="col-sm-8">
                <b-input type="text" maxlength="50" placeholder="Màu loại công việc" v-model="colors.hex"></b-input>

                </div>
                <div class="group-color">
                    <chrome-picker :value="colors" @input="updateColor"></chrome-picker>
                    <button type="button"  class="btn btn-primary btn-form" style="margin-top:10px;margin-left: 0;">Xác nhận</button>

                </div>
                    <!-- <photoshop-picker :value="colors"></photoshop-picker> -->
            </div>
        </div>
        <div class="ol-sm-12 col-md-6">
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
                <div class="col-sm-8">
                    <b-input type="textarea" v-model="loai_cv.mo_ta" minlength=""
                    maxlength="255" placeholder="Mô tả loại công việc"  ></b-input>
                </div>
            </div>
            
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label" >Trạng thái</label>
                <div class="col-sm-8">
                    <b-field>
                        <b-select v-model="loai_cv.trang_thai">
                            <option value="1" selected>Đang hoạt động</option>
                            <option value="2">Đang bảo trì</option>
                            <option value="3">Ngừng hoạt động</option>
                        </b-select>
                    </b-field>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-8">
            <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
            <button type="button" :disabled="!update" class="btn btn-warning btn-form" @click="update_loai_cv()">Cập nhật</button>
            <button type="submit" v-if="update == true" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
        </div>
    </div>
</form>
</template>

<script>
import { Photoshop, Compact, Material,Chrome } from 'vue-color'

export default {
    props: ["update","loai_cv_edit"],
    components:
    {
        'material-picker': Material,
         'photoshop-picker': Photoshop,
         'compact-picker': Compact,
         'chrome-picker': Chrome,
    },
    data()
    {
        return {
            loai_cv: {
                trang_thai: 1,
                parent: 0
            },
            ds_loai_cv: [],
            parent: false,
            selected_parent: 0,
            colors:{
                hex:  "#194d33"
            }
        }
    },
    watch: {
        loai_cv_edit(newVal)
        {
            this.loai_cv = newVal;
        
            if(newVal.parent >0)
            {
                this.parent = true
            }
            else
            {
                this.parent = false
            }
        },
        parent(val)
        {
            if(val == false)
            {
                this.loai_cv.parent = 0
            }
        }
    },
    methods:
    {
        api_loai_cv()
        {
            const form_loai_cv = new FormData();
            form_loai_cv.append("P_TEN_LOAI_CV", this.loai_cv.ten_loai_cv)
            form_loai_cv.append("P_MO_TA", this.loai_cv.mo_ta)
            form_loai_cv.append("P_TRANG_THAI", this.loai_cv.trang_thai)
            form_loai_cv.append("P_PARENT",this.loai_cv.parent)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token'),form_loai_cv).then((response) => {
                if(response.data.success = true)
                {
                   
                    app.loai_cv = {
                        trang_thai: 1
                    }
                    this.$emit('create',true)
                }
                 const type =  response.data.success == true ? 'is-success' : 'is-danger'
                
                app.$buefy.notification.open({
                    duration: 1500,
                    message:  response.data.message,
                    position: 'is-bottom-right',
                    type: type,
                    hasIcon: true
                })
            })
        },
        update_loai_cv()
        {
         const form_loai_cv = new FormData();
            form_loai_cv.append("P_TEN_LOAI_CV", this.loai_cv.ten_loai_cv)
            form_loai_cv.append("P_MO_TA", this.loai_cv.mo_ta)
            form_loai_cv.append("P_TRANG_THAI", this.loai_cv.trang_thai)
             form_loai_cv.append("P_PARENT",this.loai_cv.parent)
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'loai-cv/'+this.loai_cv.id_loai_cv+'?api_token='+this.$cookies.get('token'),form_loai_cv).then((response) => {
               
                if(response.data.success = true)
                {
                   
                    app.loai_cv = {
                        trang_thai: 1
                    }
                    this.$emit('clear',false)
                }
                const type =  response.data.success == true ? 'is-success' : 'is-danger'
                
                
                app.$buefy.notification.open({
                    duration: 1500,
                    message:  response.data.message,
                    position: 'is-bottom-right',
                    type: type,
                    hasIcon: true
                })
            })
        },
        api_ds_loai_cv(id)
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token') +'&parent='+id).then((response) => {
                this.ds_loai_cv = response.data
            })
        },
        updateColor (val)
        {
           this.colors = val
        }
    },
    created()
    {
         this.api_ds_loai_cv(0)
    }

}
</script>

<style scoped>
.group-color {position: absolute;top: 0;right: 0;}
</style>