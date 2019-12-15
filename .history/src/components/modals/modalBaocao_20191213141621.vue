<template>
<b-tabs>
    <b-tab-item  label="Báo cáo tiến độ">
        <form @submit.prevent="api_bao_cao(1)" style="width:100%;padding:15px;">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                    <div class="col-sm-4 col-form-label">Dự án </div>
                    <div class="col-sm-8">
                        <b-field>
                        <multiselect :disabled="update" v-model="selected_du_an_kh" :options="du_an" label="ten_du_an_kh" track-by="id_du_an_kh" 
                        :multiple="true" :taggable="true"  @remove="toggleUnSelectMarket"></multiselect>

                        <!-- <b-select v-model="cong_viec.id_du_an_kh" required>
                            <option value="0"> --Tất cả loại dự án--</option>
                            <option v-for="(da,index) in du_an" :key="index" :value="da.id_du_an_kh"> {{da.ten_du_an_kh}}</option>
                        </b-select> -->
                        </b-field>
                    </div>
                </div>
                </div>
            </div>
        </form>
    </b-tab-item>
</b-tabs>
</template>

<script>
export default {
    
}
</script>
        