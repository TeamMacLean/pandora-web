<template>
  <form @submit.prevent="postForm">
    <h2 class="title is-5">New bag</h2>
    <b-field label="Species">
      <b-input v-model="species" minlength="3" required></b-input>
    </b-field>
    <button type="submit" class="button is-success is-fullwidth">Create bag</button>
  </form>
</template>

<script>
export default {
  props: ["box"],
  data() {
    return {
      species: null
    };
  },
  methods: {
    postForm() {
      this.$axios
        .post("/bags/new", { boxID: this.box._id, species: this.species })
        .then(result => {
          this.$buefy.toast.open({
            message: "Bag created!",
            type: "is-success"
          });
          this.$emit('onComplete')
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