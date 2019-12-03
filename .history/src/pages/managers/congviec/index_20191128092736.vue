<template>
<div id="page-project">
    <div class="row">
        <div class="col-md-7 col-lg-6">
        <b-navbar class="menu-left" style="height:20px;padding:0">
            <template slot="start">
                <b-navbar-item href="/">
                    <b-icon icon="home" size="is-small"></b-icon>
                </b-navbar-item>
                
                <b-navbar-item>
                    <b-field>
                        <b-select v-model="selected_project">
                            <option value="0"> --Tất cả loại dự án--</option>
                            <option v-for="(da,index) in du_an_kh" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                        </b-select>
                    </b-field>
                </b-navbar-item>
                
            </template>
        </b-navbar>
        </div>
    </div>
    <div class="row" style="margin-top: 50px;">
        <div class="col-3">
        <div class="card card-task">
            <div class="card-title">
            <h3 style="line-height:36px">Danh sách công việc được giao </h3>
            </div>
           
            <b-field class="add-task" style="margin-top: 15px" >
            <b-button icon-left="plus" @click="isActiveModal = true" class="btn-add-task">Thêm công việc mới</b-button>
            </b-field>
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
            du_an_kh: [],
            selected_project: 0
        }
    },
    methods: {
        api_du_an_kh()
        {
        this.axios.get(this.$store.state.config.API_URL + 'du-an-kh?api_token='+this.$session.get("token")).then((response) => {
            this.du_an_kh = response.data
            this.du_an_selected = response.data.filter((value,index,array) => {
            return array[index].id_du_an_kh == this.$route.query.id_du_an_kh
            })[0]
            console.log('test',this.du_an_selected);
            // this.cong_viec = response.data
        })
        },
    },
    created()
    {
        this.api_du_an_kh()
    }
}
</script>

<style scoped>
.list-group {min-height: 50px;}
.card-task {padding: 10px;}
#page-project {background-image: url('../../../assets/images/banner-project.jpg');height: 100%;background-size: cover;background-repeat: no-repeat}
.menu-left {background: transparent}
.navbar-start {height: 40px;}
.navbar-start>a {color: #fff;}
.navbar-start>a:hover {color: #fff;text-decoration: none;background-color: hsla(0,0%,100%,.3)}
</style>