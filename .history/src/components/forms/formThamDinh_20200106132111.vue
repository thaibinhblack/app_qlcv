<template>
<form @submit.prevent="api_tham_dinh()">
    <div class="row">
        <div class="form-group col-sm-12 col-md-6 row">
        <div class="col-sm-4 col-form-label">Thẩm định thời gian</div>
        <div class="col-sm-8">
            <b-field>
            <b-input type="text" v-model="thamdinh.tham_dinh_tgian" placeholder="Thẩm định thời gian"></b-input>
            </b-field>
        </div> 
        </div>

        <div class="form-group col-sm-12 col-md-6 row">
        <div class="col-sm-4 col-form-label">Thẩm định chất lượng</div>
        <div class="col-sm-8">
            <b-field>
            <b-input type="text" v-model="thamdinh.tham_dinh_chat_luong" placeholder="Thẩm định chất lượng"></b-input>
            </b-field>
        </div> 
        </div>

        <div class="form-group col-sm-12 col-md-6 row">
        <div class="col-sm-4 col-form-label">Thẩm định khối lượng</div>
        <div class="col-sm-8">
            <b-field>
            <b-input type="text" v-model="thamdinh.tham_dinh_khoi_luong" placeholder="Thẩm định khối lượng"></b-input>
            </b-field>
        </div> 
        </div>

        <div class="form-group col-sm-12 col-md-6 row">
        <div class="col-sm-4 col-form-label">Người thẩm định {{my_info.display_name}}</div>
        <div class="col-sm-8">
            <b-field>
            <b-input disabled type="text" v-model="my_info.display_name" @input="my_info.display_name" ></b-input>
            </b-field>
        </div> 
        </div>

        <div class="form-group col-sm-12 col-md-6 row">
        <div class="col-sm-4 col-form-label">Ngày thẩm đinh</div>
        <div class="col-sm-8">
            <b-field>
            <b-input disabled v-model="thamdinh.ngay_tham_dinh" type="date" placeholder="Ngày thẩm định"></b-input>
            </b-field>
        </div> 
        </div>
        <div class="col-sm-12 col-md-12">
        <button type="submit"  class="btn btn-primary btn-form" style="margin-left:0" >Lưu lại</button>
    </div>    
    </div>
</form>
</template>

<script>
export default {
    data()
    {
        return {
            thamdinh: {
                
            }
        }
    }
}
</script>