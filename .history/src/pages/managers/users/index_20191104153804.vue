<template>
    <section>
         <b-field grouped group-multiline>
            <div v-for="(column, index) in columnsVisible"
                 :key="index"
                 class="control">
                <b-checkbox v-model="column.display">
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>

         <b-table
            :data="data"
            :columns="columns"
            :checked-rows.sync="checkedRows"
            checkable
            :checkbox-position="checkboxPosition">

            <template slot-scope="props">
                <b-table-column field="ID_USER" label="ID_USER" width="40" :visible="columnsVisible['ID_USER'].display">
                    {{props.row.ID_USER}}
                </b-table-column>
                <b-table-column field="ID_RULE" label="Quyền" width="100" :visible="columnsVisible['ID_RULE'].display" >
                    <b-field  v-if="edit_user == props.row.ID_USER">
                        <b-select placeholder="Quyền hệ thống" v-model="props.row.ID_RULE">
                            <option
                                v-for="rule in rules"
                                :value="rule.ID_RULE"
                                :key="rule.ID_RULE">
                                {{ rule.NAME_RULE }}
                            </option>
                        </b-select>
                    </b-field>
                    <span v-else>{{props.row.NAME_RULE}}</span>
                </b-table-column>
                <b-table-column field="USERNAME" label="Username" width="100" :visible="columnsVisible['USERNAME'].display">
                    {{props.row.USERNAME}}
                </b-table-column>
                <b-table-column field="EMAIL" label="Email" width="100" :visible="columnsVisible['EMAIL'].display" >
                    {{props.row.EMAIL}}
                </b-table-column>
                <b-table-column field="GENDER" label="Giới tính" width="40" :visible="columnsVisible['GENDER'].display" >
                    <b-icon v-if="props.row.GENDER == 0" icon="gender-male"></b-icon>
                    <b-icon v-else icon="gender-female"></b-icon>
                </b-table-column>
                 <b-table-column field="PHONE" label="SĐT" width="150" :visible="columnsVisible['PHONE'].display" >
                    {{props.row.PHONE}}
                </b-table-column>
                 <b-table-column field="NAME" label="Họ & Tên" width="150" :visible="columnsVisible['NAME'].display" >
                    {{props.row.NAME}}
                </b-table-column>
                <b-table-column field="BIRTH_DAY" label="Ngày sinh" width="150" :visible="columnsVisible['BIRTH_DAY'].display" >
                    {{props.row.BIRTH_DAY}}
                </b-table-column>
                <b-table-column field="ADDRESS" label="Địa chỉ" width="150" :visible="columnsVisible['ADDRESS'].display" >
                    {{props.row.ADDRESS}}
                </b-table-column>
                <b-table-column label="Thao tác" width="100">
                    <b-button @click="edit_user = props.row.ID_USER"><b-icon icon="pencil"></b-icon></b-button>
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
                edit_user: '',
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
                        field: 'GENDER',
                        label: 'Giới tính',
                      
                    },
                    {
                        field: 'PHONE',
                        label: 'SĐT',
                      
                    },
                    {
                        field: 'NAME',
                        label: 'Họ & Tên',
                      
                    },
                    {
                        field: 'BIRTH_DAY',
                        label: 'Ngày sinh',
                      
                    },
                    {
                        field: 'ADDRESS',
                        label: 'Địa chỉ',
                      
                    },
                    {
                        field: 'ACTION',
                        label: 'Thao tác'
                    }
                    
                ],
                columnsVisible: {
                    ID_USER: { title: 'ID_USER', display: true },
                    ID_RULE: { title: 'Quyền', display: true },
                    USERNAME: { title: 'Username', display: true },
                    EMAIL: { title: 'Email', display: true },
                    GENDER: {title: 'Giới tính' ,display: false},
                    PHONE: {title: 'SĐT', display: false},
                    NAME: {title: 'Họ & Tên', display: false},
                    BIRTH_DAY: {title: 'Ngày sinh', display: false},
                    ADDRESS: {title: 'Địa chỉ', display: false}
                },
                rules: []
            }
        },
        methods:
        {
            api_rules()
            {
                this.$http.get(this.$store.state.config.API_URL + 'rules?api_token='+this.$session.get('token')).then((response) => {
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

