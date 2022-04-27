<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <img v-bind:src="product.img" alt="" width="356" height="200" />
    </div>
    <div class="p-1">
      <strong>Id:</strong>
      {{ product.id }}
    </div>
    <div class="p-1">
      <strong>Tên sản phẩm</strong>
      {{ product.name }}
    </div>
    <div class="p-1">
      <strong>Mô tả:</strong>
      {{ product.description }}
    </div>
    <div class="p-1">
      <strong>Size: </strong>
      {{ product.size }}
    </div>
    <div class="p-1">
      <strong>Giá</strong>
      {{ product.price }}
    </div>
    <div class="p-1">
      <strong>Link hình ảnh</strong>
      {{ product.img }}
    </div>
  </div>
</template>
