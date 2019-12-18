const state = {
    update: false,
    action_loaicv: {
        xem: '6.1',
        them: '6.0',
        sua: '6.0',
        xoa: '6.0',
        xuat: '6.0'
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