<template>
  <b-navbar :mobile-modal="false" wrapper-class="container" type='is-primary'>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <strong>Pandora</strong>
        <!-- <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
        />-->
      </b-navbar-item>
    </template>
    <template slot="start">
      <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }">Boxes</b-navbar-item> -->
      <!-- <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
      </b-navbar-dropdown>-->

      <b-navbar-item class="no-hover" v-if="this.$auth.loggedIn">
        <Search />
      </b-navbar-item>
    </template>

    <template slot="end">

      <b-navbar-item tag="div" v-if="!this.$auth.loggedIn">
        <div class="buttons">
          <nuxt-link class="button is-primary" :to="{ path: '/signin' }">
            <strong>Log in</strong>
          </nuxt-link>
        </div>
      </b-navbar-item>
      <b-navbar-dropdown :label="this.$auth.user.username" v-if="this.$auth.loggedIn">
        <b-navbar-item v-if="loggedInAdmin" href="/species">Edit species</b-navbar-item>
        <b-navbar-item href="/#" @click="logOut">Log out</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
import Search from "~/components/Search.vue";
export default {
  components: { Search },
  methods: {
    async logOut() {
      await this.$auth.logout();
      this.$buefy.toast.open("Logged out");
      this.$router.push({
        path: "/"
      });
    }
  },
  computed: {
    loggedInAdmin() {
      const admins = process.env.ADMINS.split(',')
      return admins.includes(this.$auth.user.username);
    }
  }
};
</script>

<style scoped>
.no-hover:hover,
.no-hover:focus,
.no-hover:focus-within {
  background-color: inherit !important;
}
</style>