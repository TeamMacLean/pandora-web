<template>
  <div class="field">
    <b-tag 
        close-type='is-danger'
        attached
        closable
        aria-close-label="Close tag"
        @close="handleDelete"
      >
        {{sequence.name}}
    </b-tag>
  </div>
</template>

<script>

export default {
  props: ["sequence"],
  methods: {
    handleDelete() {
      this.$emit('deactivateSequence', this.sequence.id);
    }
  }
};

</script>

<style scoped>

</style>