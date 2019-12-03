<template>
    <section>

        <b-modal :active.sync="isComponentModalActive"
                 parent
                 trap-focus 
                 aria-role="dialog"
                 aria-modal>
            <div class="modal-user">
                <b-field label="Username">
                    <b-input></b-input>
                </b-field>
                <b-field label="Email">
                    <b-input></b-input>
                </b-field>
                <b-field label="Gender">
                    <b-input></b-input>
                </b-field>
                <b-field label="Phone">
                    <b-input></b-input>
                </b-field>
            </div>
        </b-modal>
    </section>
</template>

<script>
    export default {
        props: ["isComponentModalActive"],
        data() {
            return {
                formProps: {
                    email: 'evan@you.com',
                    password: 'testing'
                }
            }
        }
    }
</script>

<style scoped>
.modal-user {width: 450px;background: #fff;}
</style>