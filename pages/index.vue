<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title">Boxes</h2>
        </div>
        <div class="is-pulled-right">

          <b-button
            icon-left="plus"
            @click="isNewBoxModalActive = true"
            type="is-primary"
          >New box</b-button>
          <b-modal :active.sync="isNewBoxModalActive" :width="320" scroll="keep">
            <div class="card">
              <div class="card-content">
                <NewBox />
              </div>
            </div>
          </b-modal>
        </div>
        <div class="is-clearfix" />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns" v-for="i in Math.ceil($store.state.boxes.length / 6)" :key="i">
          <div
            class="column is-2"
            v-for="box in $store.state.boxes.slice((i - 1) * 6, i * 6)"
            :key="box.id"
          >
            <BoxCard :box="box" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BoxCard from "~/components/BoxCard";
import NewBox from "~/components/NewBox";
import SigninCard from "~/components/SigninCard";
export default {
  middleware: "auth",
  components: { BoxCard, NewBox, SigninCard },
  data() {
    return {
      isNewBoxModalActive: false
    };
  },
  fetch({ store }) {
    return store.dispatch("refreshBoxes");
  }
};
</script>


<style scoped>
.is-button:hover {
  cursor: pointer;
}
</style>