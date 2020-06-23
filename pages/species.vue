<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title">Species</h2>
          <h4><i>Use browser find command to search current list of species</i></h4>
        </div>
        <div class="is-pulled-right">

          <b-button
            icon-left="plus"
            @click="isNewSpeciesModalActive = true"
            type="is-primary"
          >New species</b-button>
          <b-modal :active.sync="isNewSpeciesModalActive" :width="320" scroll="keep">
            <div class="card">
              <div class="card-content">
                <NewSpecies @closeAddNewSpeciesModal="isNewSpeciesModalActive = false" />
              </div>
            </div>
          </b-modal>
        </div>
        <div class="is-clearfix" />
      </div>
    </section>
    <section  class="section">
      <div v-if="sortedActiveSpecies.length" class="container">
        <div class="columns" v-for="i in Math.ceil(sortedActiveSpecies.length / 4)" :key="i">
          <div
            class="column is-3"
            v-for="sortedActiveSpecies in sortedActiveSpecies.slice((i - 1) * 4, i * 4)"
            :key="sortedActiveSpecies.id"
          >
            <SpeciesCard :species="sortedActiveSpecies" @deactivateSpecies="handleDeactivateSpecies" />
          </div>
        </div>
      </div>
      <div v-else>
        No species found.
      </div>
    </section>
  </div>
</template>

<script>
import SpeciesCard from "~/components/SpeciesCard";
import NewSpecies from "~/components/NewSpecies";
import SigninCard from "~/components/SigninCard";
export default {
  middleware: "auth",
  components: { SpeciesCard, NewSpecies, SigninCard },
  data() {
    return {
      isNewSpeciesModalActive: false
    };
  },
  fetch({ store }) {
    return store.dispatch("refreshSpecies");
  },
  computed: {
    sortedActiveSpecies: function () {
      const allSpecies = this.$store.state.species.slice();
      // console.log(species.map(s => s.name))
      const activeSpecies = allSpecies.filter(spe => spe.isActive);
      // nice to be alphabetically-ordered
      return activeSpecies.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
  },
  methods: {
    handleDeactivateSpecies: function (speciesId) {      
      this.$buefy.dialog.confirm({
          message: 'Are you sure you wish to remove species from list?',
          onConfirm: () => {
            this.$store.dispatch("toggleActivateSpecies", {speciesId, newStatus: false});
            this.$buefy.toast.open({
              message: "Species removed from list",
              type: "is-success"
            });
          }
      })
    }
  }
};
</script>


<style scoped>
.is-button:hover {
  cursor: pointer;
}
</style>