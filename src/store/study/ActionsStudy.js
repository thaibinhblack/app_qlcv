import axios from "@/axios/study.js"
import server from "@/axios"
export default {
    CallSql({commit},payload) {
        const FormSQL = new FormData();
        FormSQL.append('sql',payload);
        return new Promise((resolve,reject) => {
            axios.post("/api/study-oracle",FormSQL).then((response) => {
            
                console.log(response.data)
                commit("SaveResut",response.data)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },

    fetchSeason({commit}){
        return new Promise((resolve,reject) => {
            server.get('/api/season').then((response)=> {
                commit("SET_SEASONS",response.data)
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    createQuestion({commit},question)
    {
        return new Promise((resolve,reject) => {
            console.log('question',question)
            const form_study = new FormData();
            form_study.append("P_ID_STUDY",question.ID_STUDY);
            form_study.append("P_NAME_QUESTION",question.NAME_QUESTION);
            form_study.append("P_CONTENT_QUESTION",question.CONTENT_QUESTION);
            form_study.append("P_SQL_QUESTION",question.SQL_QUESTION);

            server.post("/api/study",form_study).then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}