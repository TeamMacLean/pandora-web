import uuid from "uuid/v1";

export const state = () => ({
    user: null,//{ username: 'pagem' },
    boxes: [],
    bags: [],
    species: [],
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
    setSpeciesState(state, species) {
        state.species = species;
    },
    addSpeciesToState(state, species) {
        state.species.push(species)
    },
    updateSpeciesStatusInState(state, { modifiedSpeciesId, newIsActiveValue }) {
        const targetIndex = state.species.findIndex(spe => spe.id === modifiedSpeciesId);
        state.species[targetIndex].isActive = newIsActiveValue;
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

    async addSpecies({ commit }) {
        return this.$axios.get('/species/new')
            .then(({ data }) => {
                commit('addSpeciesToState', data.species);
            })
            .catch(err => {
                console.error(err);
            })
    },
    async refreshSpecies({ commit }) {
        return this.$axios.get('/species')
            .then(({ data }) => {
                commit('setSpeciesState', data.species)
            })
            .catch(err => {
                console.error(err);
            })
    },
    async toggleActivateSpecies(state, {speciesId, newStatus}) {
        return this.$axios.put('/species/', {
            id: speciesId,
            isActive: newStatus,
        }).then(function (response) {
            state.commit('updateSpeciesStatusInState', {
                modifiedSpeciesId: response.data.id, 
                newIsActiveValue: response.data.isActive, 
            })
        }).catch(function (error) {
            console.log(error)
        })
    }
}