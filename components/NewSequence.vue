<template>
  <form @submit.prevent="postForm">
    <h2 class="title is-5">New sequence</h2>
    <b-field label="Name">
      <b-input v-model="name" minlength="4" required></b-input>
    </b-field>
    <b-button
      native-type="submit"
      class="button is-success is-fullwidth"
      icon-left="check"
    >Create sequence</b-button>
  </form>
</template>

<script>
export default {
  props: ["sequence"],
  data() {
    return {
      name: null,
      error: null,
      success: null,
    };
  },
  methods: {
    postForm() {

      // clean whitespace off the end of name
      // TODO

      // is this already a sequence?
      if (this.$store.state.sequences.map(s => s.name).includes(this.name)){
        const existingSequence = this.$store.state.sequences.find(s => s.name === this.name);

        // active check
        if (existingSequence.isActive){
          // name already isActive
          const error = "Submitted name '" + this.name + "' already exists.";

          this.$buefy.dialog.alert({
            title: "Error",
            message: error,
            type: "is-danger",
            hasIcon: false
          });
          this.$emit('closeAddNewSequenceModal');

        } else {
          // re-enable name
          this.$store.dispatch("toggleActivateSequence", {sequenceId: existingSequence.id, newStatus: true});

          this.$buefy.toast.open({
            message: "Sequence activated!", // deliberately different, helps debug
            type: "is-success"
          });
          this.$emit('closeAddNewSequenceModal');
        }
      
      } else {
        this.$axios
          .post("/sequences/new", {
            name: this.name,
          })
          .then(result => {
            this.$emit('closeAddNewSequenceModal');
            this.$store.dispatch("refreshSequences");
            return this.$buefy.toast.open({
              message: "Sequence created!",
              type: "is-success"
            });
          })
          .catch(err => {
            console.error(err);
            this.$buefy.dialog.alert({
              title: "Error",
              message: err.message,
              type: "is-danger",
              hasIcon: false
            });
          }
        );
      }
    }
  }
};
</script>
