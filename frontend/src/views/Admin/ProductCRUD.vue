<template>
  <div class="col-md-10">
    <InputSearch v-model="searchText" />
  </div>
  <div class="row align-items-baseline mt-5">
    <h4 class="col-md-6">
      Danh sách sản phẩm được thêm<i class="fa-solid fa-shop"></i>
    </h4>

    <div class="mt-3 col-md-6 row justify-content-around align-items-center">
      <!-- <button class="btn btn-sm btn-primary" @click="refreshList()">
        <i class="fas fa-redo"></i> Làm mới
      </button> -->

      <button class="btn btn-sm btn-success" @click="goToAddContact">
        <i class="fas fa-plus"></i> Thêm mới
      </button>

      <button class="btn btn-sm btn-danger" @click="removeAllContacts">
        <i class="fas fa-trash"></i> Xóa tất cả
      </button>
    </div>
    <ProductList
      v-if="filteredContactsCount > 0"
      :products="filteredContacts"
      v-model:activeIndex="activeIndex"
    >
    </ProductList>
  </div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";
import ContactCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ContactService from "@/services/product.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ProductList,
  },
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.products.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_contact, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.products = await ContactService.getAll();
        console.log(this.products);
        this.products.sort((current, next) =>
          current.name.localeCompare(next.name)
        );
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    async removeAllContacts() {
      swalert
        .fire({
          title: "Xóa tất cả sản phẩm",
          icon: "warning",
          text: "Bạn muốn xóa tất cả sản phẩm?",
          showCloseButton: true,
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await ContactService.deleteAll();
              this.refreshList();
            } catch (error) {
              console.log(error);
            }
          }
        });
    },

    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
