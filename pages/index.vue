<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title is-4">Boxes</h2>
        </div>
        <div class="is-pulled-right">
          <b-button
            @click="isCardModalActive = true"
            icon-left="qrcode-scan"
          >Scan QR</b-button>
          <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <QR />
          </b-modal>
          <b-button
            icon-left="plus"
            @click="isNewBoxModalActive = true"
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
import QR from "~/components/QR";
export default {
  middleware: "auth",
  components: { BoxCard, QR, NewBox },
  data() {
    return {
      isCardModalActive: false,
      isNewBoxModalActive: false,
      boxes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    };
  },
  fetch({ store }) {
    return store.dispatch("refreshBoxes");
  }
};
</script>
