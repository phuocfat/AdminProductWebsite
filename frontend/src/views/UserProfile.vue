<template>
  <div v-if="currentUser">
    <header class="jumbotron">
      <h3>
        Tên người quản lý
        <strong>{{ currentUser.fullname }}</strong>
      </h3>
    </header>
    <div class="row">
      <div class="col-md-8">
        <p>
          <strong>Username: </strong>
          {{ currentUser.username }}
        </p>
        <p><strong>Email: </strong>{{ currentUser.email }}</p>

        <p><strong>Địa chỉ: </strong>{{ currentUser.address }}</p>
        <p>
          <strong>Số điện thoại:</strong>
          {{ currentUser.phone }}
        </p>
      </div>
    </div>
    <ProductList :currentUser="currentUser" class="d-none" />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import Card from "./Card.vue";
import ProductList from "../components/ProductList1.vue";
export default {
  components: {
    Card,
    ProductList,
  },
  computed: {
    ...mapState(useAuthStore, {
      currentUser: "user",
    }),
  },
  created() {
    if (!this.currentUser) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
