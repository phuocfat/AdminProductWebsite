<template>
  <nav class="navbar navbar-expand">
    <a href="/admin" class="navbar-brand">ShoppPN</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item ml-5">
        <router-link :to="{ name: 'Admin' }" class="nav-link">
          Quản lý
        </router-link>
      </li>
      <li class="nav-item ml-5">
        <router-link :to="{ name: 'home' }" class="nav-link">
          Trang Chủ
        </router-link>
      </li>
      <li class="nav-item ml-5">
        <router-link :to="{ name: 'home' }" class="nav-link">
          Sản phẩm
        </router-link>
      </li>
      <li class="nav-item ml-5">
        <router-link :to="{ name: 'notfound' }" class="nav-link">
          Giới thiệu
        </router-link>
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link :to="{ name: 'register' }" class="nav-link text-dark"
          >Đăng ký</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'login' }" class="nav-link text-dark"
          >Đăng nhập</router-link
        >
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link :to="{ name: 'profile' }" class="nav-link">{{
          currentUser.fullname
        }}</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="handleLogout">Đăng xuất</a>
      </li>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
  computed: {
    ...mapState(useAuthStore, {
      currentUser: "user",
    }),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout", "loadAuthState"]),

    handleLogout() {
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
  created() {
    this.loadAuthState();
  },
};
</script>
<style scoped>
.navbar {
  font-size: 25px;
  font-weight: 600;
  cursor: pointer;
}
.navbar-brand {
  font-size: 50px;
  background-image: linear-gradient(to right, #d6d8f9c4, #2d3b44e0, #000000c2);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-family: fantasy;
}
.nav-link {
  font-weight: 600;
  color: black;
}
.nav-item {
  margin-left: 3px;
}
</style>