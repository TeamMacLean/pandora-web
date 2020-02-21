<template>
  <form @submit.prevent="postForm">
    <h2 class="title is-5">New bag</h2>
    <b-field label="Species">
      <b-input v-model="species" minlength="4" @input="updateShortName" required></b-input>
    </b-field>
    <b-field label="Accession">
      <b-input v-model="accession" minlength="4" required></b-input>
    </b-field>
    <b-field label="Short Name" message="this will be used to generate the ID">
      <p>ID:{{shortName}}</p>
    </b-field>
    <b-button
      native-type="submit"
      class="button is-success is-fullwidth"
      icon-left="check"
    >Create bag</b-button>
  </form>
</template>

<script>
export default {
  props: ["box"],
  data() {
    return {
      species: null,
      accession: null,
      shortName: null
    };
  },
  methods: {
    updateShortName() {
      this.$axios
        .get("/bags/shortname", { params: { species: this.species } })
        .then(response => {
          if (response.data && response.data.code) {
            this.shortName = response.data.code;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    postForm() {
      this.$axios
        .post("/bags/new", {
          boxID: this.box._id,
          species: this.species,
          accession: this.accession
        })
        .then(result => {
          this.$buefy.toast.open({
            message: "Bag created!",
            type: "is-success"
          });
          this.$emit("onComplete");
        })
        .catch(err => {
          console.error(err);
          this.$buefy.dialog.alert({
            title: "Error",
            message: err.message,
            type: "is-danger",
            hasIcon: false
          });
        });
    }
  }
};
</script>
