<template>
  <div class="field">
    <b-tag 
        close-type='is-danger'
        attached
        closable
        aria-close-label="Close tag"
        @close="handleDelete"
      >
        {{species.name}}
    </b-tag>
  </div>
</template>

<script>

export default {
  props: ["species"],
  methods: {
    handleDelete() {
      this.$emit('deactivateSpecies', this.species.id);
    }
  }
};

</script>

<style scoped>

</style>