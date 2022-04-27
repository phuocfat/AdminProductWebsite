<template>
  <div v-if="product" class="page">
    <h4>Chỉnh sữa thông tin sản phẩm</h4>
    <ProductForm
      :product="product"
      @submit:product="updateProduct"
      @delete:product="deleteProduct"
    />
  </div>
</template>

<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ProductForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      product: null,
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.product = await ProductService.get(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: { pathMatch: this.$route.path.split("/").slice(1) },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    async updateProduct(data) {
      try {
        await ProductService.update(this.product._id, data);
        swtoast.success({
          text: "Sản phẩm đã được chỉnh sữa.",
        });
        this.$router.push({
          name: "Admin",
        });
      } catch (error) {
        console.log(error);
        swtoast.error({
          text: "Đã có lỗi xảy ra.",
        });
      }
    },

    async deleteProduct() {
      swalert
        .fire({
          title: "Xóa sản phẩm",
          icon: "warning",
          text: "Bạn muốn xóa sản phẩm này này?",
          showCloseButton: true,
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await ProductService.delete(this.product._id);
              swtoast.success({
                text: "Sản phẩm được xóa thành công.",
              });
              this.$router.push({ name: "Admin" });
            } catch (error) {
              console.log(error);
              swtoast.error({
                text: "Đã có lỗi xảy ra.",
              });
            }
          }
        });
    },
  },
  created() {
    this.getProduct(this.id);
  },
};
</script>
