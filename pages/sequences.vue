<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title">Sequences</h2>
        </div>
        <div class="is-pulled-right">

          <b-button
            icon-left="plus"
            @click="isNewSequenceModalActive = true"
            type="is-primary"
          >New sequence</b-button>
          <b-modal :active.sync="isNewSequenceModalActive" :width="320" scroll="keep">
            <div class="card">
              <div class="card-content">
                <NewSequence @closeAddNewSequenceModal="isNewSequenceModalActive = false" />
              </div>
            </div>
          </b-modal>
        </div>
        <div class="is-clearfix" />
      </div>
    </section>
    <section  class="section">
      <div v-if="sortedActiveSequences.length" class="container">
        <div class="columns" v-for="i in Math.ceil(sortedActiveSequences.length / 3)" :key="i">
          <div
            class="column is-4"
            v-for="sortedActiveSequence in sortedActiveSequences.slice((i - 1) * 3, i * 3)"
            :key="sortedActiveSequence.id"
          >
            {{/* George, do a directive so they're sorted in alphabetical order, at the very least */}}
            <SequenceCard :sequence="sortedActiveSequence" @deactivateSequence="handleDeactivateSequence" />
          </div>
        </div>
      </div>
      <div v-else>
        No sequences found.
      </div>
    </section>
  </div>
</template>

<script>
import SequenceCard from "~/components/SequenceCard";
import NewSequence from "~/components/NewSequence";
import SigninCard from "~/components/SigninCard";
export default {
  middleware: "auth",
  components: { SequenceCard, NewSequence, SigninCard },
  data() {
    return {
      isNewSequenceModalActive: false
    };
  },
  fetch({ store }) {
    return store.dispatch("refreshSequences");
  },
  computed: {
    sortedActiveSequences: function () {
      const sequences = this.$store.state.sequences.slice();
      const activeSequences = sequences.filter(seq => seq.isActive);
      // nice to be alphabetically-ordered
      return activeSequences.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
  },
  methods: {
    handleDeactivateSequence: function (sequenceId) {      
      this.$buefy.dialog.confirm({
          message: 'Are you sure you wish to remove sequence from list?',
          onConfirm: () => {
            this.$store.dispatch("toggleActivateSequence", {sequenceId, newStatus: false});
            this.$buefy.toast.open({
              message: "Sequence removed from list",
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