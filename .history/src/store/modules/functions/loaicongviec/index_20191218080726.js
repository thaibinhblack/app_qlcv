const state = {
    update: false,
    action_loaicv: {
        xem: '1.1',
        them: '1.0',
        sua: '1.0',
        xoa: '1.0',
        xuat: '1.0'
    }
}

const getters = {
    getAction_loaicv: (state) => {
        return state.action_loaicv
    }
}

const mutations = {
    updateAction_loaicv: (state,payload) => {
        state.action_loaicv = payload
    }
}

const actions = {
    commitAction_laoicv: ({commit},payload) => {
        commit('updateAction_loaicv',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}