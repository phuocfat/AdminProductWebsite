<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
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
};
</script>

<template>
  <ul class="list-group col-md-12 mx-0 my-0">
    <div class="row justify-content-around">
      <li
        class="list-group-item mt-3 col-md-3"
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
        <h4>{{ contact.size }}</h4>
        <h4>{{ contact.price }}đ</h4>
        <div v-if="activeContact" class="text-center">
          <ContactCard :contact="activeContact" />
          <router-link
            :to="{
              name: 'contact.edit',
              params: { id: activeContact._id },
            }"
          >
            <span class="mt-2 badge position-absolute">
              <i class="fas fa-edit"></i>Chỉnh sữa</span
            >
          </router-link>
        </div>
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
span {
  background: black;
  color: white;
  padding: 9px 103px;
  bottom: 17px;
  right: 23px;
}
</style>
