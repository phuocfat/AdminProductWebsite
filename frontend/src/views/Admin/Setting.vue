<template>
  <div class="row">
    <div class="col-md-12"><h2>Quản trị các trang</h2></div>

    <router-link :to="{ name: 'notfound' }" class="nav-link"
      >Trang Đăng Nhập</router-link
    ><router-link :to="{ name: 'notfound' }" class="nav-link"
      >Trang Đăng Ký</router-link
    >
    <router-link :to="{ name: 'notfound' }" class="nav-link"
      >Trang Giới Thiệu
    </router-link>
    <router-link :to="{ name: 'notfound' }" class="nav-link"
      >Trang Sản phẩm
    </router-link>
  </div>
</template>