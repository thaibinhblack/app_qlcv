<template>
    <section>

        <b-modal :active.sync="isComponentModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <div class="modal-user">
                <b-field label="Username"></b-field>
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