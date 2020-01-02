<template>
<div id="page-loai-cv">
    <div class="row" v-if="getAction_loaicv.them == '6.2' || getAction_loaicv.sua == '6.3'">
        <div class="col-sm-12 col-md-12 col-lg-12" style="margin:auto">
            <div class="card">
                <p class="background">Danh mục loại công việc</p>
                <form-loai-cv  :update="update" :loai_cv_edit="loai_cv_edit" @clear="update = $event" @create="create = $event"/>
            </div>
        </div>
    </div>
   <div class="table-loai-cv"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false" style="margin-top:15px">
        <p class="background">Danh sácch loại dự án</p>
        <JqxGrid ref="myGrid"
                :width="'99%'" :source="dataAdapter" :columns="columns"  @rowclick="onRowclick($event)"
                :filterable="true" :selectionmode="'multiplecellsextended'" :showfilterrow="true">
        </JqxGrid>
    </div>
</div>
</template>

<script>
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgrid.vue";
import { mapGetters } from 'vuex';
import axios from '@/axios'
export default {
    components:{
        'form-loai-cv': () => import('@/components/forms/formLoaiCongViec.vue'),
        JqxGrid
    },
    data()
    {
        return {
            update: false,
            dataAdapter: new jqx.dataAdapter(this.source),
            columns: [
                {text: 'ID_LOAI_CV', datafield: 'id_loai_cv', hidden: true},
                {text: 'Công việc cha', datafield: 'parent', hidden: true},
                 {text: 'Công việc cha', datafield: 'ten_cv_cha', width: 240},
                {text: 'Tên loại công việc', datafield: 'ten_loai_cv', width: 240},
                {text: 'Mô tả', datafield: 'mo_ta', width: 400},
                {text: 'Trạng thái', datafield: 'trang_thai', width: 240, filtertype: 'checkedlist', cellsrenderer: (index, datafield, value, defaultvalue, column, rowdata) => {
                    // let total = parseFloat(rowdata.price) * parseFloat(rowdata.quantity);
                    if(rowdata.trang_thai == 1) {
                        return '<div style="margin: 4px;" class="jqx-left-align">Đang hoạt động</div>';
                    }
                    else if(rowdata.trang_thai == 2)
                    {
                        return '<div style="margin: 4px;" class="jqx-left-align">Đang bảo trì</div>';
                    }
                    else
                    {
                        return '<div style="margin: 4px;" class="jqx-left-align">Ngừng hoạt động</div>';
                    }
                    }},
                {text: 'Ngày tạo', datafield: 'created_at', width: 240},
                {text: 'Ngày cập nhật', datafield: 'updated_at', width: 240}
            ],
            loai_cv_edit: {},
            create: false,
            ds_loai_cv: []
        }
    },
    computed: {
        ...mapGetters(["getAction_danhmuc", "getAction_loaicv"])
    },
    watch:
    {
        update(newVal)
        {
            if(newVal == false)
            {
               this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_loai_cv', type: 'number'},
                        { name: 'parent', type: 'number'},
                        { name: 'ten_cv_cha', type: 'string'},
                        { name: 'ten_loai_cv' , type: 'string' },
                        { name: 'mo_ta', type: 'string' },
                        { name: 'trang_thai' ,type: 'number'},
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token')+'&parent=0' ,
                }
                this.loai_cv_edit = {
                    trang_thai: 1
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        },
        create(newVal)
        {
            if(newVal == true)
            {
                this.create = false
                this.source.localdata = {
                    datatype: "json",
                    datafields: [
                        { name: 'id_loai_cv', type: 'number'},
                        { name: 'parent', type: 'number'},
                         { name: 'ten_cv_cha', type: 'string'},
                        { name: 'ten_loai_cv' , type: 'string' },
                        { name: 'mo_ta', type: 'string' },
                        { name: 'trang_thai' ,type: 'number'},
                        { name: 'created_at', type: 'date'},
                        { name: 'updated_at', type: 'date'}
                    ],
                     url: this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token'),
                }
                // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
                this.$refs.myGrid.updatebounddata('cells');
            }
        }
    },
    methods:
    {
        onRowclick: function (event) {
            
            this.loai_cv_edit = event.args.row.bounddata
            this.update = true;
        },
        api_loai_cv()
        {
            this.axios.get(this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token')).then((response) => {
                this.ds_loai_cv = response.data
            })
        }
    },
    beforeCreate()
    {
        this.source = {
            datatype: "json",
            datafields: [
                { name: 'id_loai_cv', type: 'number'},
                { name: 'parent', type: 'number'},
                 { name: 'ten_cv_cha', type: 'string'},
                { name: 'ten_loai_cv' , type: 'string' },
                { name: 'mo_ta', type: 'string' },
                { name: 'trang_thai' ,type: 'number'},
                { name: 'created_at', type: 'date'},
                { name: 'updated_at', type: 'date'}
            ],
            url: this.$store.state.config.API_URL + 'loai-cv?api_token='+this.$cookies.get('token'),
            }
    },
    created()
    {
        console.log(axios.defaults.params)
        axios.get('/api/loai-cv', axios.defaults.params).then((response) => {
            console.log('test api',response.data)
        })
    }
}
</script>