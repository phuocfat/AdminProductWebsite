<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooterVue from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooterVue,
  },
};
</script>

<template>
  <div id="app">
    <AppHeader />
    <div class="container">
      <router-view />
    </div>
    <AppFooterVue />
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
}
.page {
  max-width: 400px;
  margin: auto;
}

.swal2-popup {
  padding: 0 0 1rem 0;
}

.swal2-close {
  padding: 0;
}

.swal2-popup.swal2-toast .swal2-title {
  margin: 1rem 1rem 0 1rem;
}

.swal2-popup.swal2-toast .swal2-html-container {
  margin: 1rem;
}
</style>
