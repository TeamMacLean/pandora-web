<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>-->
        <div class="media-content">
          <b-icon icon="seed-outline" class="is-centered-block" />
          <br/>
          <p class="title is-4 has-text-centered">{{bag.species}}</p>
          <p class="subtitle has-text-centered">{{bag.code}}</p>
          <!-- <p class="subtitle is-6">@johnsmith</p> -->
        </div>
      </div>

      <div class="content">
        <!-- <ul>
          <li></li>
          <li></li>
        </ul>-->

        <img class="is-centered-block" :src="QRData" alt="bag QR code" />

        <nuxt-link :to="{name:'bags-show', params:{show:bag.code}}" class="button is-fullwidth">Open</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  props: ["bag"],
  data: function() {
    return {
      QRData: ""
    };
  },
  created: async function() {
    try {
      this.QRData = await QRCode.toDataURL(this.bag.id);
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
.is-centered-block {
  display: block;
  margin: 0 auto;
}
</style>