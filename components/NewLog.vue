<template>
  <div class="card">
    <div class="card-content">
      <form @submit.prevent="postForm">
        <b-field label="Amount taken">
          <b-input v-model="count" type="number" min="1"></b-input>
        </b-field>
        <b-field grouped position="is-right">
          <b-button
            native-type="submit"
            type="is-success"
            class="is-fullwidth"
            icon-left="check"
          >Save</b-button>
        </b-field>
      </form>
      <hr />
      <a href="#" @click="postTakeAll" class="has-text-centered is-block">I am taking the whole bag</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bag"],
  data() {
    return {
      count: null,
      bag: null
    };
  },
  methods: {
    postTakeAll() {
      this.$buefy.dialog.confirm({
        message: "Are you sure?",
        onConfirm: () => {
          this.$axios
            .post("/logs/new", { bagID: this.bag._id, all: true })
            .then(result => {
              this.$buefy.toast.open({
                message: "Log created!",
                type: "is-success"
              });
              this.$emit("onComplete");
            })
            .catch(err => {
              console.error(err);
              this.$buefy.dialog.alert({
                title: "Error",
                message: err.message,
                type: "is-danger"
              });
            });
        }
      });
    },
    postForm() {
      this.$buefy.dialog.confirm({
        message: "Are you sure?",
        onConfirm: () => {
          this.$axios
            .post("/logs/new", { bagID: this.bag._id, count: this.count })
            .then(result => {
              this.$buefy.toast.open({
                message: "Log created!",
                type: "is-success"
              });
            })
            .catch(err => {
              console.error(err);
              this.$buefy.dialog.alert({
                title: "Error",
                message: err.message,
                type: "is-danger"
              });
            });
        }
      });
    }
  }
};
</script>