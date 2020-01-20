<template>
  <form @submit.prevent="postForm">
    <h2 class="title is-5">New box</h2>
    <b-field label="Bay">
      <b-input v-model="bay" type="number" min="0" required></b-input>
    </b-field>
    <b-field label="Shelf">
      <b-input v-model="shelf" type="number" min="0" required></b-input>
    </b-field>
    <b-button native-type="submit" type="is-success" class="button is-fullwidth" icon-left="check">Create box</b-button>
  </form>
</template>

<script>
export default {
  data(){
    return {
      shelf:null,
      bay:null,
    }
  },
  methods: {
    postForm() {
      this.$axios
        .post("/boxes/new", { bay: this.bay, shelf: this.shelf })
        .then(result => {
          console.log('result', result);
          this.$buefy.toast.open({
            message: "Box created!",
            type: "is-success"
          });
          this.$router.push({
            name: "boxes-show",
            params: { show: result.data.box.code }
          });
          return this.$store.dispatch("refreshBoxes");
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