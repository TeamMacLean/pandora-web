<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title is-4">
            <b-icon icon="seed-outline" size="is-medium" />
            {{bag.code}}
          </h2>
          <h3 class="subtitle">{{bag.species}}</h3>
          <p>
            <b-icon icon="package-variant" />
            {{bag.box.code}}
          </p>

          <p></p>
        </div>
        <div class="is-pulled-right">
          <b-button class="button" icon-left="printer-pos" @click="printLabel">Print label</b-button>
        </div>
        <div class="is-clearfix" />
      </div>
    </section>
  </div>
</template>

<script>
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import NewBag from "~/components/NewBag";
import BagCard from "~/components/BagCard";
export default {
  middleware: "auth",
  components: { NewBag, BagCard },
  asyncData({ route, $axios, error, store }) {
    return $axios
      .get("/bag", { params: { code: route.params.show } })
      .then(res => {
        if (res.status === 200 && res.data.bag) {
          // res.data.project.samples = [];
          return {
            isNewBagModalActive: false,
            bag: res.data.bag,
            QRData: ""
          };
        } else {
          error({ statusCode: 501, message: "bag not found" });
        }
      })
      .catch(err => {
        console.error(err);
        error({ statusCode: 501, message: "bag not found" });
      });
  },
  methods: {
    refreshbag() {
      this.$axios
        .get("/bag", { params: { code: this.bag.code } })
        .then(res => {
          if (res.status === 200 && res.data.bag) {
            this.bag = res.data.bag;
          } else {
            error({ statusCode: 501, message: "bag not found" });
          }
        })
        .catch(err => {
          console.error(err);
          error({ statusCode: 501, message: "bag not found" });
        });
    },
    onComplete() {
      this.isNewBagModalActive = false;
      this.refreshbag();
    },
    printLabel() {
      return;
      var labelDiv = document.getElementById("label");
      var w = labelDiv.offsetWidth;
      var h = labelDiv.offsetHeight;
      const bag = this.bag;

      html2canvas(labelDiv).then(function(canvas) {
        var doc = new jsPDF("l", "px", [w * 1.4, h * 1.4]);
        var imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 0, 0, w, h);
        doc.save(`${bag.id}-label.pdf`);
      });
    }
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