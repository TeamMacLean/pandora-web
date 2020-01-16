import uuid from "uuid/v1";

export const state = () => ({
    user: null,//{ username: 'pagem' },
    boxes: [],
    bags: []
})

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setBoxesState(state, boxes) {
        state.boxes = boxes;
    },
    addBoxToState(state, box) {
        state.boxes.push(box)
    },
    setBagsState(state, bags) {
        state.bags = bags;
    },
    addBagToState(state, bag) {
        state.bags.push(bag)
    }
}

export const actions = {
    // async nuxtServerInit(store, context) {
    // },
    async addBox({ commit }) {

        return this.$axios.get('/boxes/new')
            .then(({ data }) => {
                commit('addBoxToState', data.box);
            })
            .catch(err => {
                console.error(err);
            })
    },
    async refreshBoxes({ commit }) {
        return this.$axios.get('/boxes')
            .then(({ data }) => {
                commit('setBoxesState', data.boxes)
            })
            .catch(err => {
                console.error(err);
            })
    },
    // async addBag({ commit }) {
    //     // return commit
    // },
    // async refreshBags({ commit }) {

    // }
}