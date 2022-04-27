<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import authService from "../services/auth.service";
export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
  computed: {
    contactStrings() {
      return this.products.map((contact) => {
        const { img, name, size, price } = contact;
        return [img, name, size, price].join("");
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
};
</script>

<template>
  <ul class="list-group col-md-12 mx-0 my-0">
    <div class="row justify-content-around">
      <li
        class="list-group-item mt-3 col-md-3 position-relative"
        v-for="(contact, index) in products"
        :class="{ active: index === activeIndex }"
        :key="contact._id"
        @click="updateActiveIndex(index)"
      >
        <img
          v-bind:src="contact.img"
          alt=""
          class="item-img"
          width="270"
          height="250"
        />
        <h3>{{ contact.name }}</h3>
        <div class="d-flex justify-content-between">
          <h4>{{ contact.size }}</h4>
          <h4>{{ contact.price }}đ</h4>
        </div>
        <button
          class="btn btn-sm btn-success position-absolute"
          @click="addItem(contact)"
        >
          <i class="fas fa-plus"></i> Thêm mới vào giỏ hàng
        </button>
      </li>
    </div>
  </ul>
</template>
<style scoped>
.list-group-item {
  border-radius: 4px;
}
.list-group-item.active {
  z-index: 2;
  color: #000;
  background-color: #f1eded;
  transition: all 0.2s ease-in;

  border: none;
}
.list-group-item {
  background: white;
  border: 3px solid #b9b9b961;
  transition: all 0.2s ease-in;
  padding-bottom: 55px;
}
li.list-group-item:hover {
  transform: translateY(-36px) scale(1.05);
  transition: all 0.3 ease-out;
  z-index: 99;
}
button {
  bottom: 13px;
  left: 92px;
}
</style>
