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
                <b-menu-item icon="account" label="Users" @click="$router.push('/user')"></b-menu-item>
                <b-menu-item @click="$router.push('/rules')" icon="account-key" label="Quyền hệ thống"></b-menu-item>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list>
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
                <b-menu-item icon="" label="Danh sách sự án" @click="$router.push('/projects')"></b-menu-item>
                
            </b-menu-item>
        </b-menu-list>
       

        <b-menu-list>
            <b-menu-item
                icon="room"
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
            ...mapGetters(["getView","getCreate","getEdit","getDelete"])
        },
        methods: {
            logout()
            {
                this.$session.destroy();
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
#sidebar {position: fixed;width: 215px;height: 100%;background: #e9ebee;font-size: 13px;}
#sidebar .menu-list a.is-active {background: #0051e9 !important;}
#sidebar .menu-list a.is-active:hover {color: #fff !important;}
</style>