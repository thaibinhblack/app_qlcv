<template>
<div id="page-projects">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-mg-5" style="margin:auto">
            <div class="add-du-an card">
                 <p class="background">Danh mục dự án</p>
                 <form @submit.prevent="api_create_customer()" class="form-rule" style="padding: 15px;">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
                        <div class="col-sm-9">
                            <b-field>
                                <b-select v-model="du_an.id_loai_du_an" required>
                                    <option value="0"> --Tất cả loại dự án--</option>
                                    <option v-for="(lda,index) in loai_du_an" :key="index" :value="lda.id_loai_du_an"> {{lda.ten_loai_du_an}}</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label" >Tên dự án</label>
                        <div class="col-sm-9">
                        <b-input type="text"  placeholder="Tên dự án" v-model="du_an.ten_du_an"></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label" >Mô tả</label>
                        <div class="col-sm-9">
                            <b-input type="textarea" v-model="du_an.mo_ta_du_an" minlength=""
                            maxlength="255" placeholder="Mô tả loại dự án"  ></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label" >Ghi chú</label>
                        <div class="col-sm-9">
                            <b-input type="text" v-model="du_an.ghi_chu_du_an"  placeholder="Ghi chú"  ></b-input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label" >Trạng thái</label>
                        <div class="col-sm-9">
                            <b-field>
                                <b-select v-model="du_an.trang_thai_du_an">
                                    <option value="1" selected>Đang hoạt động</option>
                                    <option value="2">Đang bảo trì</option>
                                    <option value="3">Ngừng hoạt động</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-9">
                            <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Thêm</button>
                            <button type="button" :disabled="!update" class="btn btn-warning btn-form" >Cập nhật</button>
                            <button type="submit" :disabled="!update" @click="$emit('clear',false)" class="btn btn-success btn-form">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            du_an : {
                trang_thai_du_an: 1
            },
            loai_du_an: []
        }
    },
    methods: {
        api_loai_du_an()
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-du-an?api_token='+this.$session.get('token')).then((response) => {
                this.loai_du_an = response.data
            })
        }
    },
    created()
    {
        console.log('created')
        this.api_loai_du_an()
    }
}
</script>