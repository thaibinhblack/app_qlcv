const state = {
    update: false,
    action_danhmuc: {
        xem: '1.1',
        them: '1.0',
        sua: '1.0',
        xoa: '1.0',
        xuat: '1.0'
    }
}

const getters = {
    getAction_danhmuc: (state) => {
        return state.action_danhmuc
    }
}

const mutations = {
    updateAction_danhmuc: (state,payload) => {
        state.action_danhmuc = payload
    }
}

const actions = {
    commitAction_danhmuc: ({commit},payload) => {
        commit('updateAction_danhmuc',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}