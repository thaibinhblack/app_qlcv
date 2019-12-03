<template>
    <b-menu id="sidebar">
        <b-menu-list>
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
                <b-menu-item v-if="getAction_rule.xem == '1.1' || getAction_rule.them == '1.3'" @click="$router.push('/rules')" icon="account-key" label="Quyền hệ thống"></b-menu-item>
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
                <b-menu-item icon="" label="Quản lý loại dự án" @click="$router.push('/loai-du-an')"></b-menu-item>
                <b-menu-item icon="" label="Quản lý dự án" @click="$router.push('/du-an')"></b-menu-item>
                <b-menu-item icon="" label="Quản lý sự án khách hàng" @click="$router.push('/projects')"></b-menu-item>
                
            </b-menu-item>
        </b-menu-list>
       

        <b-menu-list>
            <b-menu-item
                icon="home-city"
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
                icon="home-city"
               >
                <template slot="label" slot-scope="props">
                    Quản lý công việc
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="" label="Danh mục loại công việc" @click="$router.push('/loai-cv')"></b-menu-item>
                <b-menu-item icon="" label="Danh sách công việc" @click="$router.push('/project')"></b-menu-item>
                
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
            ...mapGetters(["getAction_user", "getAction_rule", "getAction_customers"])
        },
        watch:
        {
            getAction_rule(newVal)
            {
                console.log(newVal)
            }
        },
        methods: {
            logout()
            {
                this.$session.destroy();
                this.$router.push('/login');
            }
        },
        created()
        {
            console.log(this.getAction_rule)
        }
    }
</script>

<style scoped>
#sidebar {position: fixed;width: 215px;height: 100%;background: #e9ebee;font-size: 13px;}
#sidebar .menu-list a.is-active {background: #0051e9 !important;}
#sidebar .menu-list a.is-active:hover {color: #fff !important;}
</style>