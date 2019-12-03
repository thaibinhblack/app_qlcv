<template>
    <section>

        <b-modal :active.sync="isComponentModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <form action="">
                <v-field label="Username">
                     <b-input></b-input>
                </v-field>
            </form>
        </b-modal>
    </section>
</template>

<script>

    export default {
        components: {
            ModalForm
        },
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