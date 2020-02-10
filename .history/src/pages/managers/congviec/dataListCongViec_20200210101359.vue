<template>
        <section class="section-data" >  
            <div class="header header-datalist">
                <button class="btn btn-add" @click='$store.dispatch("updateModalEdit",true)' >Thêm mới</button>
                <b-button style="float:right" icon-left="settings" @click="isModalSetting = true"></b-button>
            </div>

            <b-modal :active.sync="isModalSetting" :width="'100%'" full-screen>
                <modal-setting />
            </b-modal>

             <b-table
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
            
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :data="getCongViec">
                 <template slot-scope="props">
                    <b-table-column  v-for="(setting,index) in GET_SETTING" :key="index" :label="setting.label" >
                      {{setting.clomun}}
                        {{props.row[setting.clomun]}}
                    </b-table-column>

                 </template>
            </b-table>
        </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
      'modal-setting': () => import('@/components/settings/modalSettingDataCV.vue')
    },
    data()
    {
      return {
          isPaginated: true,
          isPaginationSimple: true,
          paginationPosition: 'bottom',
          currentPage: 1,
          perPage: 5,
          isModalSetting: false
      }
    },
    computed:{
        ...mapGetters(["getCongViec", "GET_SETTING"])
    },
    created()
    {
      this.$store.dispatch("SELECT_SETTING").then((response) => {
        console.log(response)
      })
    }
}
</script>
<style scoped>
.btn-action {float: left; margin-left: 5px}
.avatar {width: 50px;height: 50px;border-radius: 50%;background:#e2e2e2;}
.avatar img {width: 100%;border-radius: 50%;height: 50px;}
.header-datalist {padding: 10px;background: #fff;border-radius: 5px; margin-bottom: 5px;}
.section-data {padding: 5px; border-radius: 5px;background: #fff;}
.btn-add {border: 1px solid #e2e2e2;}
.btn-add:hover {background: #209cee;color: #fff;}
</style>