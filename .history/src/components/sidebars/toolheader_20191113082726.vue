<template>
<div class="tool-header">
            <b-navbar>
                <template slot="brand">
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <img
                            src="@/assets/images/logo/vnpt.png"
                            alt="Lightweight UI components for Vue.js based on Bulma"
                        >
                    </b-navbar-item>
                </template>
                <template slot="start">
                    <b-navbar-item href="#">
                        Home
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Documentation
                    </b-navbar-item>
                    <b-navbar-dropdown label="Info">
                        <b-navbar-item href="#">
                            About
                        </b-navbar-item>
                        <b-navbar-item href="#">
                            Contact
                        </b-navbar-item>
                    </b-navbar-dropdown>
                </template>

                <template slot="end">
                    <b-navbar-item tag="div">
                       <nav>
                           <ul>
                               <li>{{user.USERNAME}}</li>
                           </ul>
                       </nav>
                    </b-navbar-item>
                </template>
            </b-navbar>
        </div>
</template>

<script>
export default {
    props: ["user"]
}
</script>