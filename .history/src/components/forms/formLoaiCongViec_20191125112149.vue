<template>
<form @submit.prevent="api_loai_cv()" class="form-rule" style="padding: 15px;">

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên loại công việc</label>
        <div class="col-sm-8">
        <b-input type="text" maxlength="50" placeholder="Tên dự án" v-model="loai_cv.ten_loai_cv"></b-input>
        </div>
    </div>

    <div class="form-group row">
        <label for="inputPassword3" class="col-sm-4 col-form-label" >Mô tả</label>
        <div class="col-sm-8">
            <b-input type="textarea" v-model="loai_cv.mo_ta" minlength=""
            maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
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
import { type } from 'os';
export default {
    props: ["update","loai_cv_edit"],
    data()
    {
        return {
            loai_cv: {
                trang_thai: 1
            }
        }
    },
    watch: {
        update(newVal)
        {
            if(newVal == true)
            {
                this.loai_cv = this.loai_cv_edit;
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
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$session.get('token'),form_loai_cv).then((response) => {
                if(response.data.success = true)
                {
                    const type = 'is-success'
                    app.loai_cv = {
                        trang_thai: 1
                    }
                }
                else
                {
                    const type = 'is-danger'
                    
                }
                
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
            const app = this;
            this.axios.post(this.$store.state.config.API_URL + 'loai-cv/'+this.loai_cv.id_loai_cv+'?api_token='+this.$session.get('token'),form_loai_cv).then((response) => {
               
                const type = response.data.success == true ? 'is-success': 'is-danger'
                 app.loai_cv = {
                        trang_thai: 1
                    }
                this.$emit('clear',false)
                app.$buefy.notification.open({
                    duration: 1500,
                    message:  response.data.message,
                    position: 'is-bottom-right',
                    type: type,
                    hasIcon: true
                })
            })
        }
    }

}
</script>