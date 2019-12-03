<template>
    <section>
        <b-field grouped group-multiline>
            <button class="button field is-danger" @click="checkedRows = []"
                :disabled="!checkedRows.length">
                <b-icon icon="close"></b-icon>
                <span>Clear checked</span>
            </button>
            <b-select v-model="checkboxPosition">
                <option value="left">Checkbox at left</option>
                <option value="right">Checkbox at right</option>
            </b-select>
        </b-field>

        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="data"
                    :columns="columns"
                    checkable
                    :checkbox-position="checkboxPosition">

                    <template slot-scope="props">
                        <b-table-column field="ID_USER" label="ID_USER" width="40" numeric>
                            <b-button>{{props.ID_USER}}</b-button>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Checked rows">
                <pre>{{ checkedRows }}</pre>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                checkboxPosition: 'left',
                columns: [
                    {
                        field: 'ID_USER',
                        label: 'ID_USER',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'ID_RULE',
                        label: 'ID_RULE',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'USERNAME',
                        label: 'Username',
                    },
                    {
                        field: 'EMAIL',
                        label: 'Email',
                      
                    },
                    {
                        field: 'ACTION',
                        label: 'Thao tác'
                    }
                    
                ]
            }
        },
        methods:
        {
            api_users()
            {
                this.$http.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                    this.data = response.data.result
                })
            }
        },
        created()
        {
            this.api_users()
        }
    }
</script>

