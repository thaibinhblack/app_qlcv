<template>
    <b-menu id="sidebar">
        <b-menu-list>
            <b-menu-item>
                <template slot="label" slot-scope="props">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="avatar" style="width: 50px;height:50px;border-radius:50%;background:#e2e2e2;">

                            </div>
                        </div>
                        <div class="col-sm-8">
                             <h3 style="line-height:50px;font-size:15px;">{{getUser.display_name}}</h3>
                        </div>
                    </div>
                </template>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list v-if="getAction_user.xem == '2.1' || getAction_user.them == '2.2' || getAction_user.sua == '2.3' || getAction_user.xoa == '2.4' || getAction_user.xuat == '2.5' ||
        getAction_rule.xem == '1.1' || getAction_rule.them == '1.2' || getAction_rule.sua == '1.3' || getAction_rule.xoa == '1.4' || getAction_rule.xuat == '1.5'">
            <b-menu-item
                icon="settings"
                :active="isActive"
                :expanded="isActive"
                @click="isActive = !isActive">
                <template slot="label" slot-scope="props">
                    Administrator
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item v-if="getAction_user.xem == '2.1' || getAction_user.them == '2.2' || getAction_user.sua == '2.3' || getAction_user.xoa == '2.4' || getAction_user.xuat == '2.5'" icon="account" label="Users" @click="$router.push('/user')"></b-menu-item>
                <!-- v-if="getAction_rule.xem == '1.1' || getAction_rule.them == '1.3'" -->
                <b-menu-item v-if="getAction_rule.xem == '1.1' || getAction_rule.them == '1.2' || getAction_rule.sua == '1.3' || getAction_rule.xoa == '1.4' || getAction_rule.xuat == '1.5'" @click="$router.push('/rules')" icon="account-key" label="Quyền hệ thống"></b-menu-item>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list v-if="getAction_customers.xem == '4.1'">
            <b-menu-item
                icon="account"
                :active="active.KH"
                :expanded="active.KH"
                @click="active.KH = !active.KH">
                <template slot="label" slot-scope="props">
                    Quản lý khách hàng
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="account" label="Danh sách khách hàng" @click="$router.push('/khach-hang')"></b-menu-item>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list>
            <b-menu-item
                icon="link"
               >
                <template slot="label" slot-scope="props">
                    Quản lý dự án
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item  icon="" label="Quản lý loại dự án" @click="$router.push('/loai-du-an')"></b-menu-item>
                <b-menu-item  icon="" label="Quản lý dự án" @click="$router.push('/du-an')"></b-menu-item>
                <b-menu-item icon="" label="Quản lý sự án khách hàng" @click="$router.push('/projects')"></b-menu-item>
                
            </b-menu-item>
        </b-menu-list>
       

        <b-menu-list v-if="getAction_danhmuc.xem == '5.1' || getAction_danhmuc.them == '5.2' || getAction_danhmuc.sua == '5.3' || getAction_danhmuc.xoa == '5.4' || getAction_danhmuc.xuat == '5.5'">
            <b-menu-item
                icon="home-outline"
               >
                <template slot="label" slot-scope="props">
                    Quản lý trung tâm
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="" label="Danh sách trung tâm" @click="$router.push('/ds-trung-tam')"></b-menu-item>
                <b-menu-item icon="" label="Danh sách phòng ban" @click="$router.push('/ds-phong-ban')"></b-menu-item>
                
            </b-menu-item>
        </b-menu-list>

        <b-menu-list>
            <b-menu-item
                icon="briefcase"
               >
                <template slot="label" slot-scope="props">
                    Quản lý công việc
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item v-if="getAction_loaicv.xem == '6.1'" icon="" label="Danh mục loại công việc" @click="$router.push('/loai-cv')"></b-menu-item>
                <b-menu-item icon="" label="Danh sách công việc" @click="$router.push('/cong-viec')"></b-menu-item>
                
            </b-menu-item>
        </b-menu-list>


        <b-menu-list>
            <b-menu-item
                @click="logout()"
                label="Đăng xuất">
                
            </b-menu-item>
        </b-menu-list>
    </b-menu>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                isActive: true,
                active:{
                    KH: false
                }
            }
        },
        computed: {
            ...mapGetters(["getAction_user", "getAction_rule", "getAction_customers", "getAction_danhmuc", "user", "getAction_loaicv", "getUser" ])
        },
        methods: {
            logout()
            {
                this.$cookies.remove('token');
                this.$router.push('/login');
            }
        },
    }
</script>

<style scoped>
#sidebar {position: fixed;width: 215px;height: 100%;background: #e9ebee;font-size: 13px;}
#sidebar .menu-list a.is-active {background: #0051e9 !important;}
#sidebar .menu-list a.is-active:hover {color: #fff !important;}
</style>