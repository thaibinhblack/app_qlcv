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
                    :checked-rows.sync="checkedRows"
                    :is-row-checkable="(row) => row.id !== 3"
                    checkable
                    :checkbox-position="checkboxPosition">

                    <template slot-scope="props">
                        <b-table-column field="ID_USER" label="ID_USER" width="40">
                            {{props.row.ID_USER}}
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
            const data = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ]

            return {
                data,
                checkboxPosition: 'left',
                checkedRows: [data[1], data[3]],
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

