<template>
  <b-autocomplete
    rounded
    :data="data"
    icon="magnify"
    placeholder="e.g. Arabadopsis"
    field="species"
    :loading="isFetching"
    @typing="getAsyncData"
    @select="option =>goToBox(option)"
  >
    <template slot-scope="props">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <b-icon icon="seed-outline" size="is-medium" />
            <span />
            <strong>{{ props.option.species }} {{ props.option.accession }}</strong>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-icon icon="package-variant-closed" size="is-medium" />
            <span />
            <strong>{{props.option.box.code}}</strong>
          </div>
        </div>
      </div>
    </template>
  </b-autocomplete>
</template>


<script>
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  },
  methods: {
    goToBox(option) {
      if (option && option.box && option.box.code) {
        this.$router.push({
          name: "boxes-show",
          params: { show: option.box.code }
        });
      }
    },
    getAsyncData: debounce(function(name) {
      if (!name.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      this.$axios
        .get("/search", { params: { search: name } })
        .then(({ data }) => {
          this.data = [];
          data.bags.forEach(item => this.data.push(item));
        })
        .catch(error => {
          this.data = [];
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500)
  }
};
</script>