<template>
  <form @submit.prevent="postForm">
    <h2 class="title is-5">New species</h2>
    <b-field label="Name">
      <b-input v-model="name" minlength="4" required></b-input>
    </b-field>
    <b-button
      native-type="submit"
      class="button is-success is-fullwidth"
      icon-left="check"
    >Create species</b-button>
  </form>
</template>

<script>
export default {
  props: ["species"],
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

      // is this already a species?
      if (this.$store.state.species.map(s => s.name).includes(this.name)){
        const existingSpecies = this.$store.state.species.find(s => s.name === this.name);

        // active check
        if (existingSpecies.isActive){
          // name already isActive
          const error = "Submitted name '" + this.name + "' already exists.";

          this.$buefy.dialog.alert({
            title: "Error",
            message: error,
            type: "is-danger",
            hasIcon: false
          });
          this.$emit('closeAddNewSpeciesModal');

        } else {
          // re-enable name
          this.$store.dispatch("toggleActivateSpecies", {speciesId: existingSpecies.id, newStatus: true});

          this.$buefy.toast.open({
            message: "Species activated!", // deliberately different, helps debug
            type: "is-success"
          });
          this.$emit('closeAddNewSpeciesModal');
        }
      
      } else {
        this.$axios
          .post("/species/new", {
            name: this.name,
          })
          .then(result => {
            this.$emit('closeAddNewSpeciesModal');
            this.$store.dispatch("refreshSpecies");
            return this.$buefy.toast.open({
              message: "Species created!",
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
