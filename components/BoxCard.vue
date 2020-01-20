<template>
  <div class="card" @click="onClick">
    <div class="card-content">
      <div class="media">
        <!-- <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>-->
        <div class="media-content">
          <p class="title is-4 has-text-centered">
            <b-icon icon="package-variant-closed" />
            {{box.code}}
          </p>
          <!-- <p class="subtitle is-6">@johnsmith</p> -->
        </div>
      </div>

      <div class="content">
        <!-- <ul>
          <li></li>
          <li></li>
        </ul>-->

        <!-- <img class="is-centered-block" :src="QRData" alt="box QR code" /> -->

        <nuxt-link
          :to="{name:'boxes-show', params:{show:box.code}}"
          class="button is-fullwidth"
        >Open</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
// import QRCode from "qrcode";

export default {
  props: ["box"]
};
</script>