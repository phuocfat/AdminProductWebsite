<template>
  <Form
    ref="productForm"
    @submit="submitProduct"
    :validation-schema="producttFormSchema"
  >
    <div class="form-group">
      <label for="id">Id</label>
      <Field
        name="id"
        type="text"
        class="form-control"
        v-model="productLocal.id"
      />
      <ErrorMessage name="id" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="name">Tên sản phẩm</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="productLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="description">Mô tả</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        name="description"
        type="texarea"
        v-model="productLocal.description"
      ></textarea>

      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="size">Size</label>
      <Field
        name="size"
        type="text"
        class="form-control"
        v-model="productLocal.size"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Giá</label>
      <Field
        name="price"
        type="text"
        class="form-control"
        v-model="productLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="img">Link hình ảnh</label>
      <Field
        name="img"
        type="text"
        class="form-control"
        v-model="productLocal.img"
      />
      <ErrorMessage name="img" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button
        v-if="productLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteProduct"
      >
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:product", "delete:product"],
  props: {
    product: { type: Object, required: true },
    resetAfterSubmit: { type: Boolean, default: false },
  },
  data() {
    const producttFormSchema = yup.object().shape({
      id: yup.string(),
      description: yup.string(),
      size: yup.string(),
      price: yup.string(),
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      img: yup.string(),
    });
    return {
      productLocal: this.product,
      producttFormSchema,
    };
  },
  methods: {
    submitProduct() {
      this.$emit("submit:product", this.productLocal);

      if (this.resetAfterSubmit) {
        this.$refs.productForm.resetForm();
      }
    },
    deleteProduct() {
      this.$emit("delete:product", this.productLocal._id);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
