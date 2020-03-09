import axios from '@/axios'
import https from 'axios'
import store from '@/store'
export default {
    fetchCongViec({commit},time)
    {
        return new Promise((resolve, reject) => {
            var time_start = new Date().getFullYear() +'-'+new Date().getMonth()+'-01'
            var time_end = new Date().toISOString().substr(0,10);
            if(time != null)
            {
                    time_start = time.time_start
                    time_end = time.time_end
            }
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+time_start+'&time_end='+time_end).then((response) => {
                commit("SET_CONGVIEC",response.data)
                // console.log('cong việc',response.data)
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    fetchCongViecPhanCong({commit},filter)
    {
        return new Promise((resolve,reject) => 
        {
            var query = "&id_du_an="+filter.id_du_an+"&id_du_an_kh="+filter.id_du_an_kh+'&nguoi_nhan_viec='+filter.nguoi_nhan_viec+"&P_ID_LOAI_CV="+filter.id_loai_cv;
            axios.get('/api/cong-viec-phan-cong?api_token='+axios.defaults.params.api_token
                +'&time_start='+filter.time_start+'&time_end='
                +filter.time_end+query).then((response) => {
                commit("SET_CONG_VIEC_PC",response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    fetchCongViecTrongNgay({commit})
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/cong_viec_trong_ngay?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_CONGVIEC_TRONG_NGAY",response.data)
                // console.log('cong việc',response.data)
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    fetchCongViecTD({commit},search)
    {
        return new Promise((resolve, reject) => {
            var time_start = new Date().getFullYear() +'-'+new Date().getMonth()+'-01'
            var time_end = new Date().toISOString().substr(0,10);
            if(search.time != null)
            {
                    time_start = search.time.time_start
                    time_end = search.time.time_end
            }
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+time_start+'&time_end='+time_end+'&P_TRANG_THAI_TD='+search.P_TRANG_THAI_TD).then((response) => {
                if(search.P_TRANG_THAI_TD == 1)
                {
                    commit("SET_CONGVIEC_CTD",response.data)
                }
                else
                {
                    commit("SET_CONGVIEC_DTD",response.data)
                }
                // console.log('cong việc',response.data)
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    createCongViec({commit},cong_viec)
    {
        return new Promise((resolve,reject) => {
            const form_cong_viec = new FormData();
            
            form_cong_viec.append("P_ID_CV_DA",0)
            form_cong_viec.append("P_ID_DU_AN",cong_viec.id_du_an)
            form_cong_viec.append("P_TEN_CV",cong_viec.ten_cv)
            form_cong_viec.append("P_NOI_DUNG_CV",cong_viec.noi_dung_cv)
            form_cong_viec.append("P_NGAY_TIEP_NHAN",cong_viec.ngay_tiep_nhan)
            form_cong_viec.append("P_NGAY_GIAO_VIEC", cong_viec.ngay_giao_viec)
            form_cong_viec.append("P_NGAY_HOAN_THANH", cong_viec.ngay_hoan_thanh)
            form_cong_viec.append("P_NGAY_CAM_KET", cong_viec.ngay_cam_ket)
            form_cong_viec.append("P_GIO_THUC_HIEN",cong_viec.gio_thuc_hien)
            form_cong_viec.append("P_DO_UU_TIEN",cong_viec.do_uu_tien)
            form_cong_viec.append("P_MA_JIRA",cong_viec.ma_jira)
            form_cong_viec.append("P_NGUOI_GIAO_VIEC",cong_viec.nguoi_giao_viec)
            form_cong_viec.append("P_NGUOI_NHAN_VIEC",cong_viec.nguoi_nhan_viec)
            form_cong_viec.append("P_TIEN_DO",cong_viec.tien_do)
            form_cong_viec.append("P_GHI_CHU",cong_viec.ghi_chu)
            form_cong_viec.append("P_LY_DO",cong_viec.ly_do)
            form_cong_viec.append("P_THAM_DINH_TGIAN",cong_viec.tham_dinh_tgian)
            form_cong_viec.append("P_THAM_DINH_KHOI_LUONG",cong_viec.tham_dinh_khoi_luong)
            form_cong_viec.append("P_THAM_DINH_CHAT_LUONG",cong_viec.tham_dinh_chat_luong)
            form_cong_viec.append("P_TRANG_THAI_LTRINH",cong_viec.trang_thai_ltrinh)
            form_cong_viec.append("P_TRANG_THAI",cong_viec.trang_thai)
            form_cong_viec.append("P_ID_LOAI_CV",cong_viec.id_loai_cv)
            form_cong_viec.append("P_NGUOI_YEU_CAU",cong_viec.nguoi_yeu_cau)
            form_cong_viec.append("P_ACTION",1)
            form_cong_viec.append("P_TIME_NHAN_VIEC", JSON.stringify(cong_viec.time_nhan_viec))
            form_cong_viec.append("P_TIME_HOAN_THANH", JSON.stringify(cong_viec.time_hoan_thanh))
            form_cong_viec.append("P_NGUOI_NHAP",cong_viec.nguoi_nhap)
            form_cong_viec.append("P_TYPE",cong_viec.type_cv)
            form_cong_viec.append("P_HAN_HOAN_THANH",cong_viec.han_hoan_thanh)
            if(cong_viec.trang_thai == 3 && cong_viec.tien_do < 100)
            {
                resolve({
                    success: false,
                    message: 'Tiến độ chưa đạt 100%',
                    result: null,
                    status: 500
                })
            }
            else
            {
                axios.post('/api/cong-viec?api_token='+axios.defaults.params.api_token,form_cong_viec).then((response) => {
                    cong_viec.id_cv_da = response.data
                    if(cong_viec.thong_bao == true)
                    {
                        https.post("https://api.telegram.org/bot984384864:AAHL9TTvMytHSHiRJA4eEd5O3fv4njLCbK8/sendMessage",{
                            'chat_id': '-1001463887834', //808314484
                            'text':   cong_viec.noi_dung_thong_bao
                        });
                    }
                    if(cong_viec.thong_bao_private == true)
                    {
                        https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                            'chat_id': cong_viec.id_telegram, //808314484
                            'text':   cong_viec.noi_dung_thong_bao
                        });
                    }
                    if(cong_viec.thong_bao_rieng == true)
                    {
                        https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                            'chat_id': cong_viec.user_thongbao, //808314484
                            'text':  cong_viec.noi_dung_thong_bao
                        });
                    }
                    if(cong_viec.nguoi_giao_viec == cong_viec.nguoi_nhap && cong_viec.notify_telegram == 1 && cong_viec.trang_thai == 3 && cong_viec.trang_thai_td == 0)
                    {
                        // console.log(cong_viec)
                        https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                            'chat_id': cong_viec.id_telegram_giaoviec, //808314484
                            'text':   cong_viec.ten_nnv + ' Báo cáo hoàn thành công việc '+ cong_viec.ten_cv
                        });
                    }
                    commit("ADD_CONGVIEC",cong_viec)
                    resolve(response.data)
                }).catch(() => {
                    reject(false)
                })
            }
        })
    },
    updateCongViec({commit},cong_viec)
    {   
        // console.log(cong_viec)
        return new Promise((resolve,reject) => {
            const form_cong_viec = new FormData();
            // console.log(cong_viec,store.state.module_congviec.task_edit)
            form_cong_viec.append("P_ID_CV_DA",cong_viec.id_cv_da)
            form_cong_viec.append("P_ID_DU_AN",cong_viec.id_du_an)
            form_cong_viec.append("P_TEN_CV",cong_viec.ten_cv)
            form_cong_viec.append("P_NOI_DUNG_CV",cong_viec.noi_dung_cv)
            form_cong_viec.append("P_NGAY_TIEP_NHAN",cong_viec.ngay_tiep_nhan)
            form_cong_viec.append("P_NGAY_GIAO_VIEC", cong_viec.ngay_giao_viec)
            form_cong_viec.append("P_NGAY_HOAN_THANH", cong_viec.ngay_hoan_thanh)
            form_cong_viec.append("P_NGAY_CAM_KET", cong_viec.ngay_cam_ket)
            form_cong_viec.append("P_GIO_THUC_HIEN",cong_viec.gio_thuc_hien)
            form_cong_viec.append("P_DO_UU_TIEN",cong_viec.do_uu_tien)
            form_cong_viec.append("P_MA_JIRA",cong_viec.ma_jira)
            form_cong_viec.append("P_NGUOI_GIAO_VIEC",cong_viec.nguoi_giao_viec)
            form_cong_viec.append("P_NGUOI_NHAN_VIEC",cong_viec.nguoi_nhan_viec)
            form_cong_viec.append("P_TIEN_DO",cong_viec.tien_do)
            form_cong_viec.append("P_GHI_CHU",cong_viec.ghi_chu)
            form_cong_viec.append("P_LY_DO",cong_viec.ly_do)
            form_cong_viec.append("P_THAM_DINH_TGIAN",cong_viec.tham_dinh_tgian)
            form_cong_viec.append("P_THAM_DINH_KHOI_LUONG",cong_viec.tham_dinh_khoi_luong)
            form_cong_viec.append("P_THAM_DINH_CHAT_LUONG",cong_viec.tham_dinh_chat_luong)
            form_cong_viec.append("P_TRANG_THAI_LTRINH",cong_viec.trang_thai_ltrinh)
            form_cong_viec.append("P_TRANG_THAI",cong_viec.trang_thai)
            form_cong_viec.append("P_ID_LOAI_CV",cong_viec.id_loai_cv)
            form_cong_viec.append("P_NGUOI_YEU_CAU",cong_viec.nguoi_yeu_cau)
            form_cong_viec.append("P_ACTION",2)
            form_cong_viec.append("P_NGUOI_NHAP",cong_viec.nguoi_nhap)
            form_cong_viec.append("P_TYPE",cong_viec.type)
            form_cong_viec.append("P_TIME_NHAN_VIEC", JSON.stringify(cong_viec.time_nhan_viec))
            form_cong_viec.append("P_TIME_HOAN_THANH", JSON.stringify(cong_viec.time_hoan_thanh))
            form_cong_viec.append("P_HAN_HOAN_THANH",cong_viec.han_hoan_thanh)

            if(cong_viec.trang_thai == 3 && parseInt(cong_viec.tien_do) < 100)
            {
                resolve({
                    success: false,
                    message: 'Công việc ' +  cong_viec.ten_cv +' tiến độ chưa đạt 100%!',
                    result: null,
                    status: 500
                })
            }
            else
            {
                axios.post('/api/capnhat_congviec/'+cong_viec.id_cv_da+'?api_token='+axios.defaults.params.api_token,form_cong_viec).then(() => {
                    // commit("UPDATE_CONG_VIEC",cong_viec)
                    resolve({
                        success: true,
                        message: 'Bạn vừa cập nhật công viêc '+ cong_viec.ten_cv,
                        result: cong_viec,
                        status: 200
                    })
                    if(cong_viec.thong_bao == true)
                    {
                        https.post("https://api.telegram.org/bot984384864:AAHL9TTvMytHSHiRJA4eEd5O3fv4njLCbK8/sendMessage",{
                            'chat_id': '-1001463887834', //808314484
                            'text':   cong_viec.noi_dung_thong_bao
                        });
                    }
                    if(cong_viec.thong_bao_private == true)
                    {

                        https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                            'chat_id': cong_viec.id_telegram, //808314484
                            'text':   cong_viec.noi_dung_thong_bao
                        });
                    }
                    console.log(cong_viec)
                    if(cong_viec.thong_bao_rieng == true)
                    {
                        https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                            'chat_id': cong_viec.user_thongbao, //808314484
                            'text':  cong_viec.noi_dung_thong_bao
                        });
                    }

                    if(cong_viec.nguoi_giao_viec == cong_viec.nguoi_nhap && cong_viec.notify_telegram == 1 && cong_viec.trang_thai == 3 && cong_viec.trang_thai_td == 0)
                    {
                        // console.log(cong_viec)
                        https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                            'chat_id': cong_viec.id_telegram_giaoviec, //808314484
                            'text':   cong_viec.ten_nnv + ' Báo cáo hoàn thành công việc '+ cong_viec.ten_cv
                        });
                    }
                   
                   
                    }).catch(() => {
                        reject({
                            success: false,
                            message: 'Lỗi server!'
                        })
                    })
                }
           
        })
    },
    insertCongViecDAKH({commit},params)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/du-an-kh-insert-delete/'+params.ID_CV_DA+'/'+params.ID_DA_KH+'?action=1&api_token='+axios.defaults.params.api_token)
            .then((response) => {
                commit("UPDATE_DELETE_CV",false)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    deleteCongViecDAKH({commit},params)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/du-an-kh-insert-delete/'+params.ID_CV_DA+'/'+params.ID_DA_KH+'?action=2&api_token='+axios.defaults.params.api_token)
            .then((response) => {
                commit("UPDATE_DELETE_CV",true)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    deleteCongViec({commit},ID_CV_DA)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/cong-viec-delete/'+ID_CV_DA+'?api_token='+axios.defaults.params.api_token).then((response) => {
                commit('DELETE_CONG_VIEC',response.data)
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    //GỬI THẨM DỊNH 
    sendThamDinh({commit},array_cv)
    {
        var $sql = "";
        var index = 1;
        var end = array_cv.list_cv.length;
        var arr_user = [];
    
        array_cv.list_cv.forEach((cv) => {
            var $check = 0;
            arr_user.forEach((user) => {
                // console.log(user,cv.ten_nnv)
                if(cv.ten_nnv == user)
                {
                    $check = 1;
                    return;
                }
            })
            // console.log($check)
            if($check == 0)
            {
                arr_user.push(cv.ten_nnv)
            }
            if(index != end)
            {
                $sql = $sql + cv.id_cv_da +","
               
            }
           else
           {
            $sql = $sql + cv.id_cv_da 
           }
           index = index + 1;
        })

        return new Promise((resolve,reject) => {
            const form_tham_dinh = new FormData();
            form_tham_dinh.append("ARR_CV_DA",$sql)
            form_tham_dinh.append("P_ACTION_TD",array_cv.tham_dinh)
            axios.post('/api/gui-tham-dinh?api_token='+axios.defaults.params.api_token,form_tham_dinh)
            .then((response) => {
                resolve(response.data)
                // console.log(store.state)
                var content = " ";
                if(array_cv.tham_dinh == 0)
                {   
                    content = ' YÊU CẦU THẨM ĐINH CÔNG VIỆC!'
                }
                else
                {
                    content = ' Hủy thẩm định công viêc của ';
                    arr_user.forEach((user) => {
                        if(user != null)
                        {
                            content = content + " ,"+user;
                        }
                    })
                }
                commit("UPDATE_CV_TD",{
                    list_tham_dinh: array_cv.list_cv,
                    action_tham_dinh: array_cv.tham_dinh
                })
                https.post("https://api.telegram.org/bot1011574544:AAE6pfGCqY0f1fm9_qhDvtK8vGWvHYBrY9A/sendMessage",{
                    'chat_id': '808314484', //-1001463887834
                    'text':   store.state.module_users.info_user.display_name + content
                });
            })
            .catch((err) => {
                reject(err)
            })

        })
    },
    createThamDinhChiTiet({commit},tham_dinh)
    {
        const form_tham_dinh = new FormData();
        form_tham_dinh.append("ARRAY_LIST",tham_dinh.array_list)
        form_tham_dinh.append("ARRAY_TG_TD", tham_dinh.array_tgian)
        return new Promise((resolve,reject) => {
            axios.post('/api/tham-dinh-list-cv?api_token='+axios.defaults.params.api_token,form_tham_dinh)
            .then((response) => {
                commit("UPDATE_CV_DTD",tham_dinh.data)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createThamDinhListCV({commit},tham_dinh)
    {
        const form_tham_dinh = new FormData();
        form_tham_dinh.append("ARRAY_LIST",tham_dinh.array_list)
        form_tham_dinh.append("ARRAY_TG_TD", tham_dinh.array_tgian)
        return new Promise((resolve,reject) => {
            axios.post('/api/tham-dinh-list-cv?api_token='+axios.defaults.params.api_token,form_tham_dinh)
            .then((response) => {
                if(tham_dinh.trang_thai_td == 1)
                {
                    commit("UPDATE_CV_DTD",tham_dinh)
                }
                else
                {
                    commit("UPDATE_TGIAN_TD",tham_dinh)
                }
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createThamDinhCV({commit},thamdinh)
    {
        return new Promise((resolve,reject) => {
            const form_tham_dinh = new FormData()
            form_tham_dinh.append("P_THAM_DINH_TGIAN",thamdinh.tham_dinh_tgian)
            form_tham_dinh.append("P_THAM_DINH_CHAT_LUONG",thamdinh.tham_dinh_chat_luong)
            form_tham_dinh.append("P_THAM_DINH_KHOI_LUONG",thamdinh.tham_dinh_khoi_luong)
            axios.post('/api/tham-dinh-cong-viec/'+axios.defaults.params.id_cv_da +'?api_token='+axios.defaults.params.api_token,form_tham_dinh).then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject(false)
            })
        })
    },
    //SETTING
    SELECT_SETTING({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/setting-cai-dat-list-cv?api_token='+axios.defaults.params.api_token).then((response) => {
                // console.log(Object.entries(response.data))
                commit("SET_SETTING",response.data[0].value_setting)
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    SETTING_HIENTHI({commit},P_VALUE_SETTING)
    {
        return new Promise((resolve,reject) => {
            const form_setting = new FormData();
            form_setting.append("P_VALUE_SETTING",JSON.stringify(P_VALUE_SETTING))
            axios.post('/api/setting-cai-dat-list-cv?api_token='+axios.defaults.params.api_token,form_setting).then((response) => {
                commit("UPDATE_SETTING",P_VALUE_SETTING)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    SETTING_MODAL_CV({commit},P_VALUE_SETTING)
    {
        return new Promise((resolve,reject) => {
            const form_setting = new FormData()
            form_setting.append("P_VALUE_SETTING",JSON.stringify(P_VALUE_SETTING))
            axios.post('/api/cong-viec-setting-modal?api_token='+axios.defaults.params.api_token,form_setting)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })  
    },
    SELECT_SETTING_MODAL_CV({commit})
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/cong-viec-setting-modal?api_token='+axios.defaults.params.api_token)
            .then((response) => {
                commit("SET_SETTING_MODAL",response.data[0])
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })  
    },
//UPLOAD FILE CONG VIỆC
    uploadFile({commit},form_file)
    {   
        // console.log(form_file)
        return new Promise((resolve,reject) => {
            form_file.FILE_CV.forEach((file) => {
                const form = new FormData();
                form.append("FILE_CV",file)
                form.append("P_ID_CV_DA", form_file.P_ID_CV_DA)
                axios.post('/api/file-cv?api_token='+axios.defaults.params.api_token,form).then((response) => {
                    commit("ADD_FILE",{
                        id: response.data,
                        name: file.name,
                        id_cv_da: form_file.P_ID_CV_DA
                    })
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    },
    getFile({commit},ID_CV_DA)
    {
        return new Promise((resolve,reject) => {
            axios.get('/api/file-cv/'+ID_CV_DA+'?api_token='+axios.defaults.params.api_token).then((response) => {
                commit("SET_FILES", response.data.result)
                resolve(response.data)
            }).catch((error) => {
                reject({
                    success: false,
                    message: 'Lỗi server!',
                    result: error,
                    status: 500
                })
            })
        })
    },
    
//BÁO CÁO TIẾN ĐỘ
    fetchBaoCaoTienDoById({commit},id_cv_da)
    {   
       return new Promise((resolve,reject) => {
        axios.get('/api/bao-cao/'+id_cv_da+'?api_token='+axios.defaults.params.api_token).then((response) => {
            commit('SET_BAOCAO',response.data)
            resolve(true)
        }).catch(() => {
            reject(false)
        })
       })
    },
    createBaoCaoTienDo({commit},baocao)
    {
        return new Promise((resolve,reject) => {
            const form_baocao = new FormData()
            form_baocao.append("P_ID_CV", baocao.id_cv_da)
            form_baocao.append("P_ID_ND",baocao.id_nd)
            form_baocao.append("P_NOI_DUNG_BAOCAO", baocao.noidung)
            form_baocao.append("P_TRANG_THAI",baocao.trang_thai)
            form_baocao.append("P_TIEN_DO",baocao.tien_do)
            axios.post('/api/cong-viec/'+baocao.id_cv_da+'/baocao?api_token='+axios.defaults.params.api_token,form_baocao).then((response) => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
// CÔNG VIỆC DỰ ÁN KHÁCH HÀNG
    createCongViecKH({commit},form_cong_viec)
    {
        axios.post('/api/cong-viec-da?api_token='+axios.defaults.params.api_token,form_cong_viec)
    },
//công việc dự án
    FilterCongViecTD({commit},filter)
    {
        var query = "&id_du_an="+filter.id_du_an+"&id_du_an_kh="+filter.id_du_an_kh+'&nguoi_nhan_viec='+filter.nguoi_nhan_viec+"&P_ID_LOAI_CV="+filter.id_loai_cv+'&P_TRANG_THAI_TD='+filter.trang_thai_td;
        return new Promise((resolve,reject) => {
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+filter.time_start+'&time_end='+filter.time_end+query).then((response) => {
                if(filter.trang_thai_td == 1)
                {
                    commit("SET_CONGVIEC_CTD",response.data)
                }
                else
                {
                    commit("SET_CONGVIEC_DTD",response.data)
                }
                resolve(response.data)
            }).catch(() => {
                reject(false)
            })
        })
    },

    FilterCongViec({commit},filter)
    {
        var query = "&id_du_an="+filter.id_du_an+"&id_du_an_kh="+filter.id_du_an_kh+'&nguoi_nhan_viec='+filter.nguoi_nhan_viec+"&P_ID_LOAI_CV="+filter.id_loai_cv;
        return new Promise((resolve,reject) => {
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+filter.time_start+'&time_end='+filter.time_end+query).then((response) => {
                commit("SET_CONGVIEC",response.data)
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },
    FilterCongViecDuAn({commit},time)
    {
        return new Promise((resolve,reject) => {
            var time_start = new Date().toISOString().substr(0,10);
            var time_end = time_start
            if(time != null)
            {
                    time_start = time.time_start
                    time_end = time.time_end
            }
            axios.get('/api/cong-viec?api_token='+axios.defaults.params.api_token+'&time_start='+time_start+'&time_end='+time_end).then((response) => {
                commit("SET_CONGVIEC",response.data)
                // console.log('cong việc',response.data)
                resolve(true)
                }).catch(() => {
                reject(false)
            })
        })
        // commit("FILTER_CONGVIEC",id_du_an)
    },
    resetCongViecEdit({commit})
    {
        commit("RESET_CONGVIEC_EDIT")
    },
    openTask({commit},id_task)
    {
        commit("UPDATE_MODAL_EDIT",true)
        commit("SEARCH_TASK",id_task)
    },
    openTaskTD({commit},id_task)
    {
        commit("UPDATE_MODAL_EDIT",true)
        commit("SEARCH_TASK_TD",id_task)
    },
    openTaskDTD({commit},id_task)
    {
        commit("UPDATE_MODAL_EDIT",true)
        commit("SEARCH_TASK_DTD",id_task)
    },
    openBaoCao({commit},id_task)
    {
        commit("UPDATE_MODAL_BAOCAO",true)
        commit("SEARCH_TASK",id_task)
    },
    updateModalBaoCao({commit},boolean)
    {
        commit("UPDATE_MODAL_BAOCAO",boolean)
    },
    updateModalEdit({commit},boolean)
    {
        commit("UPDATE_MODAL",boolean)
    }
}