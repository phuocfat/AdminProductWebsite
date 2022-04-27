<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row justify-content-end">
        <div class="col-md-4">
          <InputSearch v-model="searchText"></InputSearch>
        </div>
        <div class="col-md-0">
          <span class="badge">
            <router-link
              :to="{
                name: 'card',
              }"
            >
              <!-- <Card :items="items" /> -->
              <i class="fa-solid fa-cart-shopping"> </i
            ></router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <ProductList
        v-if="filteredContactsCount > 0"
        :products="filteredContacts"
        v-model:activeIndex="activeIndex"
        :items="items"
      >
      </ProductList>
    </div>
  </div>
</template>
<script>
import { swalert } from "@/mixins/swal.mixin";
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ProductList from "@/components/ProductList1.vue";
import ProductService from "@/services/product.service";
import Card from "./Card.vue";
export default {
  components: {
    ProductCard,
    InputSearch,
    ProductList,
    Card,
  },
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: "",
      items: {},
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
        this.products = await ProductService.getAll();
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
          title: "Xóa tất cả Liên hệ",
          icon: "warning",
          text: "Bạn muốn xóa tất cả Liên hệ?",
          showCloseButton: true,
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await ProductService.deleteAll();
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
.row {
  padding: 0 12px;
}
.fa-cart-shopping {
  font-size: 25px;
}
</style>