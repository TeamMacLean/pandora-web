<template>
  <form @submit.prevent="postForm">
    <h2 class="title is-5">New bag</h2>
    <section>
      <b-field label="Select a species">
        <b-autocomplete
          rounded
          v-model="selectSpeciesUserSearchText"
          :data="filteredDataArray"
          placeholder="Select a species here"
          icon="magnify"
          clearable
          required
          @select="onSelectOption"
        >
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </b-field>
      <p class="content"><b>Selected Species:</b> {{ selectedSpecies || 'None selected' }}</p>
    </section>
    <br>
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
      :disabled="isSubmitDisabled ? true : false"
    >Create bag</b-button>
  </form>
</template>

<script>
export default {
  // TODO see if species can be not passed down as prop
  props: ["box", "fullSpeciesList"],
  data() {
    return {
      selectedSpecies: null,
      accession: null,
      shortName: null,
      selectSpeciesUserSearchText: ''
    };
  },
  fetch({ store }) {
    return store.dispatch("refreshSpecies");
  },
  computed: {
    isSubmitDisabled() {
      if (!this.selectedSpecies || !this.accession || this.accession.length < 4){
        return true;
      } else {
        return false;
      }
    },
    activeSpeciesList() {
      return this.fullSpeciesList.filter(spe => spe.isActive).map(spe => spe.name);
    },
    filteredDataArray() {
      return this.activeSpeciesList.filter((option) => {
          return option
              .toString()
              .toLowerCase()
              .indexOf(this.selectSpeciesUserSearchText.toLowerCase()) >= 0
      })
    }
    
  },
  methods: {
    onSelectOption(option) {
      this.selectedSpecies = option;
      this.updateShortName();
    },
    updateShortName() {
      if (!this.selectedSpecies){
        this.shortName = null;
      } else {
        this.$axios
          .get("/bags/shortname", { params: { species: this.selectedSpecies } })
          .then(response => {
            if (response.data && response.data.code) {
              this.shortName = response.data.code;
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    postForm() {
      this.$axios
        .post("/bags/new", {
          boxID: this.box._id,
          // TODO remove selectedSpecies, it should be called species
          species: this.selectedSpecies,
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
