<template>
  <div class="page">
    <div>
      <h4>Thêm Liên hệ</h4>
      <ProductForm
        :product="{}"
        :resetAfterSubmit="false"
        @submit:product="saveProduct"
      />
    </div>
  </div>
</template>

<script>
import { swtoast } from "@/mixins/swal.mixin";
import ProductForm from "@/components/ProductForm.vue";
import ContactService from "@/services/product.service";

export default {
  
  components: {
    ProductForm,
  },
  methods: {
    async saveProduct(data) {
      try {
        console.log(data);

        await ContactService.create(data);
        swtoast.success({
          text: "Sản phẩm đã được thêm.",
        });
        data.id = "";
        data.name = "";
        data.description = "";
        data.size = "";
        data.price = "";
        data.img = "";
      } catch (error) {
        console.log(error);
        swtoast.error({
          text: "Đã có lỗi xảy ra.",
        });
      }
    },
  },
};
</script>
