<template>
    <b-menu id="sidebar">
        <b-menu-list>
            <b-menu-item
                icon="settings"
                :active="isActive"
                :expanded="isActive"
                @click="isActive = !isActive">
                <template slot="label" slot-scope="props">
                    Administrator {{getView}}
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item v-if="getView == '1.1'" icon="account" label="Users" @click="$router.push('/user')"></b-menu-item>
                <b-menu-item @click="$router.push('/rules')" icon="account-key" label="Quyền hệ thống"></b-menu-item>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list>
            <b-menu-item
                label="Quản lý dự án"
                icon="link"
                tag="router-link"
                to="/projects">
                
            </b-menu-item>
        </b-menu-list>
    </b-menu>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                isActive: true
            }
        },
        computed: {
            ...mapGetters(["getView","getCreate","getEdit","getDelete"])
        }
    }
</script>

<style scoped>
#sidebar {position: absolute;width: 100%;height: 100%;overflow: scroll}
</style>