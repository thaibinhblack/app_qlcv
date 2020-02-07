<template>
 <div class="col-4 col-md-4 col-sm-6 col-lg-3 col-xl-3 item-group-task">
    <div class="card card-task">
        <div class="card-title">
            <h3 style="line-height:36px">{{title}} ({{list_congviec.length}})</h3>
        </div>
        
        <div class="search-task">
                <!-- <b-input v-model="search_list1" type="text" placeholder="Tìm kiếm công việc" ></b-input> -->
        </div>
        <draggable class="list-group" :list="list_congviec" group="people"  >
            
            <div
                class="list-group-item"
                v-for="(element, index) in list_congviec"
                :key="index"
                :class="{coder: element.id_loai_cv == 1, support: element.id_loai_cv == 3, cv_kh: element.type_cv == true, error: new Date(element.ngay_hoan_thanh).getDate() - new Date(element.ngay_cam_ket).getDate()  <= -1}">
                    
                
                <b-button icon-left="more" class="btn-more" >   
                    <ul class="list-action" >
                        <li @click="$store.dispatch('openTask',element.id_cv_da)">Xem thông tin công việc</li>
                        <li @click="$store.dispatch('openGiaHan',element.id_cv_da)">Gia hạn công việc</li>
                        <li @click="$store.dispatch('openBaoCao',element.id_cv_da)">Báo cáo tiến độ</li>
                        <li @click="deleteCongViec(element.id_cv_da)">Xóa công việc</li>
                    
                    </ul>
                </b-button>
                <div class="row">
                    <div class="status col-md-12">
                        <div class="color" style="width:40px;height:10px;float:left;border-radius: 5px;margin-top:5px;margin-right:15px;" :style="{'background': element.color_status != null? element.color_status : '#e2e2e2e2'}" ></div> <span style="font-size:12px;"
                            :title="element.ten_loai_cv">{{element.ten_loai_cv}}</span>
                    </div>
                    <div class="col-md-12">
                        <small>{{element.ten_nnv}}</small>
                    </div>
                    <div class="col-sm-4 col-md-3">
                        <div class="avatar">
                            <img :src="$store.state.config.PUBLIC_URL + element.avatar" style="width:50px;height:50px;border-radius:50%;">
                            
                        </div>
                    </div>
                    <div class="col-sm-8 col-md-9">
                        <span class="ten_cv">{{element.ten_cv}} <span v-if="element.ten_du_an_kh"> - {{element.ten_du_an_kh}} </span> </span>  <br/>
                       
                    </div>
                </div>
                 <p><small>{{element.ngay_giao_viec.slice(0,10)}} - {{element.ngay_cam_ket}}</small></p>
                    <b-progress type="is-info"  :value="Math.floor(element.tien_do)" show-value style="margin-top:10px;"></b-progress>
            </div>
            </draggable>
        <b-field class="add-task" style="margin-top: 15px" >
        <b-button icon-left="plus" @click="openModalEdit()" class="btn-add-task">Thêm công việc mới</b-button>
        </b-field>
    </div>
    <b-modal :active.sync="isModalDelete" :width="'300px'" :can-cancel="false">
        <div class="warnning" >
            <p class="background">Bạn có chắc xóa công việc này? <b-button @click="isModalDelete = false" icon-left="close" class="btn btn-close"></b-button></p>
           <div class="group-button" style="padding:15px;text-align: center;">
                <b-button color="primary" type="is-warning" class="success" @click="success_delete()">Chấp nhận</b-button>
                <b-button color="warning"  type="is-success" style="margin-left:10px;" @click="isModalDelete = false"> Hủy bỏ</b-button>
           </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    props: ["list_congviec", "title"],
    data()
    {
        return {
            isModalDelete: false,
            ID_CV_DA: 0
        }
    },
    components: {
        draggable
    },
    methods:
    {
        openModalEdit()
        {
            this.$store.dispatch("updateModalEdit",true)        
        },
        deleteCongViec($id)
        {
            this.isModalDelete = true
            this.ID_CV_DA = $id
        },
        success_delete()
        {
            this.$store.dispatch('deleteCongViec',this.ID_CV_DA).then(() => {
                this.isModalDelete = false
                this.$buefy.notification.open({
                    duration: 1500,
                    message: 'Bạn vừa xóa công việc',
                    position: 'is-bottom-left',
                    type: 'is-success',
                    hasIcon: true
                })
            }).catch(() => {
                this.$buefy.notification.open({
                    duration: 1500,
                    message: 'Lỗi! Xin vui lòng thử lại',
                    position: 'is-bottom-left',
                    type: 'is-danger',
                    hasIcon: true
                })
            })
        }
    }
}
</script>