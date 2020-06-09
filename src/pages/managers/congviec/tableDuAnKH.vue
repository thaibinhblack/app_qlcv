<template>
    <div class="p15">
        <h3>DANH SÁCH DỰ ÁN CỦA KHÁCH HÀNG</h3>
        <table class="table-cv">
            <thead>
                <th style="width: 20px;">STT</th>
                <th>TÊN DỰ ÁN</th>
                <th>TÊN KHÁCH HÀNG</th>
                <th>TỔNG CÔNG VIỆC</th>
                <th>TỔNG CÔNG VIỆC HT</th>
                <th>TỔNG CÔNG VIỆC CHT</th>
                <th>TÁC VỤ</th>
            </thead>
            <tbody>
                <tr v-for="(tk,index) in tk_du_an_kh">
                    <td class="center"> {{tk.stt}} </td>
                    <td>{{tk.ten_du_an}}</td>
                    <td>{{tk.ten_kh}}</td>
                    <td>{{tk.sl}}</td>
                    <td>{{tk.ten_du_an}}</td>
                    <td>{{tk.ten_du_an}}</td>
                    <td>
                        <button @click="openSetting(tk.id_du_an)"><i class="fa fa-cog" aria-hidden="true"></i></button>
                        <a :href="'./ds-cv-can-theo-doi?ID_DU_AN='+tk.id_du_an" target="_blank"><button class="ml-10" ><i class="fa fa-angle-right" aria-hidden="true"></i></button></a>
                    </td>
                </tr>
            </tbody>
        </table>

        <b-modal :active.sync="isModelSetting" :width="'500px'" > 
            <form  style="padding: 15px;">
                <!-- {{customer}} -->
                <div class="col-sm-12">
                    <div class="form-group row"  style="padding: 15px;">
                        <label for="inputPassword3" class="col-sm-4 col-form-label" >Tên khách hàng</label>
                        <div class="col-sm-8">
                            <b-input type="text" placeholder="Tên khách hàng" required></b-input>
                        </div>
                    </div>
                       
                </div>
                
                
            </form>
        </b-modal>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data()
    {
        return {
            isModelSetting: false
        }
    },
    computed: {
        ...mapGetters(["tk_du_an_kh"])
    },
    methods: {
        openSetting(id)
        {
            this.isModelSetting = true
        }
    },
    created() {
        this.$store.dispatch("fetchThongKeDuAnKH")
    },
}
</script>

<style lang="css">
    .center {text-align: center}
</style>