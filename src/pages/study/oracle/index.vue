<template>
    <div class="row">
        <div class="col-sm-12 col-md-6">
        <button @click="CallSql()" class="btn btn-primary">Run</button>
            <div class="editor">
              <textarea id="froala-editor" v-model="sql">
              </textarea>
            {{sql}}
            </div>
        </div>
         <div class="col-sm-12 col-md-6">
         
            <table id="result">
                <tr v-for="(result,index) in getResult" :key="index">
                    <td v-for="(value,index) in Object.entries(result)" :key="index">
                       {{value[1]}}
                    </td>
                 
                </tr>
            </table>
         </div>
    </div>
</template>

<script>
import  {mapGetters} from 'vuex'
export default {
    data()
    {
        return {
            sql: ""
        }
    },
    computed: {
        ...mapGetters(["getResult"])
    },
   methods: {
       CallSql()
       {
           if(this.sql == "")
           {
               alert("Bạn chưa nhập câu truy vấn")
           }
            else {
                 this.$store.dispatch("CallSql",this.sql).catch((err) => {
                     alert("Câu truy vấn không hợp lệ!")
                 });
            }
       }
   } 
}
</script>

<style>
#result {min-width: 100%;table-layout: fixed;overflow-x: scroll}
#result tr td {border: 1px solid #e2e2e2;min-width: 100px;}

</style>