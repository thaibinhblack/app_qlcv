<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <p>Tên bài toán</p>
            <b-input placeholder="Tên bài" v-model="question.NAME_QUESTION" />
            <p>Nội dung bài toán</p>
            <vue-editor  v-model="question.CONTENT_QUESTION" />
            <p style="margin: 15px 0;display: block;width: 100%;">Kết quả bài toán
                 <button @click="callSQL()"  style="float:right;" class="btn brn-primary btn-success"> Run Code </button> </p>
            <b-input type="textarea"   v-model="question.SQL_QUESTION" />

            <table id="result">
                <tr v-for="(result,index) in getResult" :key="index">
                    <td v-for="(value,index) in Object.entries(result)" :key="index">
                       {{value[1]}}
                    </td>
                 
                </tr>
            </table>

            <button @click="createQuestion()" style="margin-top:15px;" class="btn btn-info"> Thêm mới </button>
        </div>
        <div class="col-sm-12 col-md-4">
            <h3>Quản lý chương</h3>
            {{question}}
            <ul>
        
               <li v-for="(season,index) in LIST_SEASON" :key="index">
                 <b-radio  v-model="question.ID_STUDY" :native-value="season.id_study" :key="season.id_study" >
                       {{season.name_study}}
                    </b-radio  >
                     
               </li>
            </ul>
        </div>
    </div>
</template>

<script>
import  {mapGetters} from 'vuex'
export default {
    data(){
        return {
            question: {
                NAME_QUESTION: "",
                ID_STUDY: 1,
                CONTENT_QUESTION: "",
                SQL_QUESTION: ""
            },
            disable: false
        }
    },
    computed: {
        ...mapGetters(["getResult", "LIST_SEASON"])
    },
    methods: {
        initValue()
        {
            this.question = {
                NAME_QUESTION: "",
                ID_STUDY: 1,
                CONTENT_QUESTION: "",
                SQL_QUESTION: ""
            }
            this.disable = false
        },
        callSQL()
        {
            var app = this;
            if(this.question.sql == "")
           {
                app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Chưa nhập câu truy vấn thực thi',
                        position: 'is-bottom-left',
                        type: 'is-warning',
                        hasIcon: true
                    })
           }
            else {
                 this.$store.dispatch("CallSql",this.question.SQL_QUESTION)
                 .then((response) => {
                    this.disable = true
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Truy vấn thành công',
                        position: 'is-bottom-left',
                        type: 'is-success',
                        hasIcon: true
                    })
                 })
                 .catch((err) => {
                    app.$buefy.notification.open({
                        duration: 1500,
                        message: 'Lỗi không thực thi được câu SQL',
                        position: 'is-bottom-left',
                        type: 'is-danger',
                        hasIcon: true
                    })
                 });
            }
        },
        createQuestion()
        {
            console.log('question')
            this.$store.dispatch("createQuestion",this.question)
        }
    },
    created() {
        this.$store.dispatch("fetchSeason")
    },
}
</script>

<style>
#result {min-width: 100%;table-layout: fixed;overflow-x: scroll;margin-top: 15px;   }
#result tr td {border: 1px solid #e2e2e2;min-width: 100px;}

</style>