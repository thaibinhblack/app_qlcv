<template>
<div id="page-projects">
    <div class="row">
        <div class="col-sm-12 col-md-6 col-mg-5">
            <div class="add-du-an card">
                 <p class="background">Danh mục dự án</p>
                 <form @submit.prevent="api_create_customer()" class="form-rule" style="padding: 15px;">
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label" >Loại dự án</label>
                        <div class="col-sm-9">
                            <b-field>
                                <b-select v-model="du_an.id_loai_du_an" required>
                                    <option value="0"> --Tất cả trung tâm--</option>
                                    <option v-for="(tt,index) in trung_tams" :key="index" :value="tt.id_tt"> {{tt.ten_tt}}</option>
                                </b-select>
                            </b-field>
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
                
            }
        }
    }
}
</script>