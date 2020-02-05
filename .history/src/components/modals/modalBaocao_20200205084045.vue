<template>
<b-tabs>
    <b-tab-item  label="Báo cáo tiến độ">
        <form @submit.prevent="api_bao_cao()" style="width:100%;padding:15px;">
            <div class="form-group row">
                <div class="col-sm-5 col-md-3 col-form-label">Tên công việc</div>
                <div class="col-sm-7 col-md-9">
                    {{getTaskEdit.ten_cv}}
                </div>
            </div>
            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-5 col-md-3 col-form-label" >Tiến độ ({{getTaskEdit.tien_do}}%)</label>
                <div class="col-sm-3 col-md-2">
                    <b-field>
                        <b-input type="number" v-model="getTaskEdit.tien_do" min="0" max="100"> </b-input>
                    </b-field>
                </div>
                <div class="col-sm-4 col-md-7">
                    <b-field>
                      <b-slider type="is-success" v-model="getTaskEdit.tien_do" :custom-formatter="val => val + '%'"></b-slider>
                    </b-field>
                </div>
            </div>

            <div class="form-group row">        
                <label for="inputPassword3" class="col-sm-12 col-form-label" >Nội dung báo cáo</label>
                <div class="col-sm-12">
                    <b-field>
                          <b-input v-model="noidung" maxlength="255" type="textarea"></b-input>
                    </b-field>
                </div>
            </div>

             <div class="form-group row">
                <div class="col-sm-9">
                    <button type="submit"  style="margin-left:0"  class="btn btn-primary btn-form">Báo cáo</button>
                    <b-button icon-left="close" class="btn btn-close btn-form" @click="$store.dispatch('updateModalBaoCao',false)">Close</b-button>  
                </div>
            </div>
        </form>
    </b-tab-item>
    <b-tab-item label="Nội dung tiến độ">
        <div class="form-group row" v-for="(cv,index) in LIST_BAOCAO" :key="index">
            <div class="col-sm-12 col-md-12 col-form-label">{{cv.display_name}} - <small>{{cv.created_at}}</small> </div>
            <div class="col-sm-12 col-md-12">
                {{cv.noi_dung_baocao}}
            </div>
        </div>
         <div class="form-group row">
                <div class="col-sm-9">
                    <b-button style="margin-left:0" icon-left="close" class="btn btn-close btn-form" @click="$store.dispatch('updateModalBaoCao',false)">Close</b-button>  
                </div>
            </div>
    </b-tab-item>
    <b-tab-item label="File báo cáo">
        <div class="row">
            <nav class="col-sm-12" style="padding: 15px;">
                <ul class="list-file">
                <li v-for="(file,index) in files" :key="index"> {{file.name}} </li>
                <li v-for="(file,index) in LIST_FILE" :key="index"> {{file.CREATED_AT}} <a target="_blank" :href="$store.state.config.PUBLIC_URL + file.url_file"> {{file.url_file.slice(17)}} </a> </li>
                <!-- <li> </li> -->
                </ul>
            </nav>
        </div>
        <div>
            <input ref="file_cv" type="file" multiple @change="up_files()">
            <b-button @click="api_up_file()">Lưu file</b-button>
        </div>
    </b-tab-item>
</b-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ["cong_viec_edit", "my_info"],
    data()
    {
        return {
            noidung: "",
            congviec: [],
            files: []
        }
    },
    computed:
    {
        ...mapGetters(["getTaskEdit", "INFO_USER", "LIST_BAOCAO", "LIST_FILE"])
    },
    methods: {
        api_bao_cao()
        {
            const baocao = {
                id_nd: this.INFO_USER.id_nd,
                noidung: this.noidung,
                id_cv_da: this.getTaskEdit.id_cv_da,
                tien_do: this.getTaskEdit.tien_do,
        
            }
            if(this.getTaskEdit.tien_do < 100)
            {
                baocao.trang_thai = 2
            }
            else
            {  
                 baocao.trang_thai = 3
            }
            var app = this;
            this.$store.dispatch('createBaoCaoTienDo',baocao).then((response) => {
                if(response == true)
                {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Báo cáo công việc thành công',
                        position: 'is-bottom-left',
                        type: 'is-success',
                        hasIcon: true
                    })
                    this.$store.dispatch('fetchBaoCaoTienDoById',this.getTaskEdit.id_cv_da)
                }
                else
                {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Lỗi! Xin vui lòng thử lại!',
                        position: 'is-bottom-left',
                        type: 'is-danger',
                        hasIcon: true
                    })
                }
            })
        },
        api_files()
        {
            this.$store.dispatch("getFile",this.getTaskEdit.id_cv_da)
        },
        api_up_file()
        {
            this.$store.dispatch('uploadFile',{
            P_ID_CV_DA: this.getTaskEdit.id_cv_da,
            FILE_CV: this.$refs.file_cv.files
            })
            this.files = []
        },
        up_files()
        {
            this.files = this.$refs.file_cv.files
        }
    },
    created()
    {
        this.getTaskEdit.tien_do = parseInt(this.getTaskEdit.tien_do)
        this.$store.dispatch('fetchBaoCaoTienDoById',this.getTaskEdit.id_cv_da)
    }
}
</script>

<style scoped>
.list-file { width: 100%;}
.list-file>li {padding: 5px 0;display: inline-block;width: 50%;overflow: hidden; padding: 5px 7px;}
</style>
        