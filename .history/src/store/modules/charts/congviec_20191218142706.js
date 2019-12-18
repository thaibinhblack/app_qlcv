const state = {
    dataset: []
}

const getters = {
    getDataset_congviec: (state) => {
        return state.dataset
    }
}

const mutations = {
    update_dataset_congviec: (state,payload) => {
        state.dataset = payload
    }
}

const actions = {
    commit_dataset_congviec: ({commit},payload) => {
        commit("update_dataset_congviec",payload)
    }
}

export default {
    state, getters, mutations, actions
}