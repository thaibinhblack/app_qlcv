<template>
    <section>
        <b-field grouped group-multiline>
            
        </b-field>

         <b-table
            :data="data"
            :columns="columns"
            :checked-rows.sync="checkedRows"
            checkable
            :checkbox-position="checkboxPosition">

            <template slot-scope="props">
                <b-table-column field="ID_USER" label="ID_USER" width="40">
                    {{props.row.ID_USER}}
                </b-table-column>
                <b-table-column field="ID_RULE" label="Quyền" width="40">
                    <b-field label="Simple">
                        <b-select placeholder="Select a name">
                            <option
                                v-for="rule in rules"
                                :value="rule.ID_RULE"
                                :key="rule.ID_RULE">
                                {{ rule.NAME_RULE }}
                            </option>
                        </b-select>
                    </b-field>
                </b-table-column>
                    <b-table-column field="USERNAME" label="Username" width="100">
                    {{props.row.USERNAME}}
                </b-table-column>
                    <b-table-column field="EMAIL" label="Email" width="100">
                    {{props.row.EMAIL}}
                </b-table-column>
                    <b-table-column label="Thao tác" width="100">
                    <b-button @click="edit(props.row.ID_USER)"><b-icon icon="pencil"></b-icon></b-button>
                    <b-button style="margin-left: 5px" @click="next(props.row.ID_USER)"><b-icon icon="chevron-right"></b-icon></b-button>
                </b-table-column>
            </template>
        </b-table>
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
                checkedRows: [],
                edit_rule: '',
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
                    
                ],
                rules: []
            }
        },
        methods:
        {
            api_rules()
            {
                this.$http.get(this.$store.state.config.API_URL + 'rules').then((response) => {
                    this.rules = response.data.results
                })
            },
            api_users()
            {
                this.$http.get(this.$store.state.config.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                    this.data = response.data.result
                })
            },
            edit(ID)
            {
                alert(ID)
            },
            next()
            {

            }
        },
        created()
        {
            this.api_users()
            this.api_rules()
        }
    }
</script>

