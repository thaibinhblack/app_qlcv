export default {
    list_congviec_ctd: [],
    list_congviec_dtd: [],
    list_congviec: [],
    list_congviec_tmp: [],
    task_edit: {},
    isModalEdit: false,
    isModalGiaHan: false,
    isModalBaoCao: false,
    list_baocao: [],
    list_file: [],
    settings: [
        {
            column: 'id_cv_da',
            label: 'ID CÔNG VIỆC',
            width: '200px',
            hidden: true
        },
      
        {
            column: 'ten_du_an',
            label: 'TÊN DỰ ÁN',
            width: '200px',
            hidden: true
        },
        {
            column: 'ten_kh',
            label: 'TÊN KHÁCH HÀNG',
            width: '200px',
            hidden: true
        },
        
        {
            column: 'ten_cv',
            label: 'TÊN CÔNG VIỆC',
            width: '200px',
            hidden: true
        },
        {
            column: 'ten_loai_cv',
            label: 'TÊN LOẠI CÔNG VIỆC',
            width: '200px',
            hidden: true
        },
    
        {
            column: 'noi_dung_cv',
            label: 'NỘI DUNG CÔNG VIỆC',
            width: '200px',
            hidden: true
        },
        {
            column: 'ngay_tiep_nhan',
            label: 'NGÀY TIẾP NHẬN',
            width: '200px',
            hidden: true
        },
        {
            column: 'ngay_hoan_thanh',
            label: 'NGÀY HOÀN THÀNH',
            width: '200px',
            hidden: true
        },
        {
            column: 'ngay_cam_ket',
            label: 'NGÀY CAM KẾT',
            width: '200px',
            hidden: true
        },
        {
            column: 'do_uu_tien',
            label: 'ĐỘ ƯU TIÊN',
            width: '200px',
            hidden: true
        },
        {
            column: 'ma_jara',
            label: 'MÃ JARA',
            width: '200px',
            hidden: true
        },

        {
            column: 'ten_ngv',
            label: 'NGƯỜI GIAO VIỆC',
            width: '200px',
            hidden: true
        },
        {
            column: 'ten_nnv',
            label: 'NGƯỜI NHẬN VIỆC',
            width: '200px',
            hidden: true
        },
        {
            column: 'gio_thuc_hien',
            label: 'GIỜ THỰC HIỆN',
            width: '200px',
            hidden: true
        },
        {
            column: 'tien_do',
            label: 'TIẾN ĐỘ',
            width: '200px',
            hidden: true
        },
        {
            column: 'ghi_chu',
            label: 'GHI CHÚ',
            width: '200px',
            hidden: true
        },
        {
            column: 'trang_thai',
            label: 'TRẠNG THÁI',
            width: '200px',
            hidden: true
        }
        
    ],
    setting_modal: {
        selected_du_an_setting: [],
        selected_loai_cv_setting: []
    },
    DELETE_CV_DA_KH: false
}