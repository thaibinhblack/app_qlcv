<template>
    <section>

        <b-modal :active.sync="isComponentModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
           
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