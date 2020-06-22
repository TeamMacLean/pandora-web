import uuid from "uuid/v1";

export const state = () => ({
    user: null,//{ username: 'pagem' },
    boxes: [],
    bags: [],
    sequences: [],
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
    },
    setSequencesState(state, sequences) {
        state.sequences = sequences;
    },
    addSequenceToState(state, sequence) {
        state.sequences.push(sequence)
    },
    updateSequenceStatusInState(state, { modifiedSequenceId, newIsActiveValue }) {
        const targetIndex = state.sequences.findIndex(seq => seq.id === modifiedSequenceId);
        state.sequences[targetIndex].isActive = newIsActiveValue;
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

    async addSequence({ commit }) {
        return this.$axios.get('/sequences/new')
            .then(({ data }) => {
                commit('addSequenceToState', data.sequence);
            })
            .catch(err => {
                console.error(err);
            })
    },
    async refreshSequences({ commit }) {
        return this.$axios.get('/sequences')
            .then(({ data }) => {
                commit('setSequencesState', data.sequences)
            })
            .catch(err => {
                console.error(err);
            })
    },
    async toggleActivateSequence(state, {sequenceId, newStatus}) {
        return this.$axios.put('/sequence/', {
            id: sequenceId,
            isActive: newStatus,
        }).then(function (response) {
            state.commit('updateSequenceStatusInState', {
                modifiedSequenceId: response.data.id, 
                newIsActiveValue: response.data.isActive, 
            })
        }).catch(function (error) {
            console.log(error)
        })
    }
}