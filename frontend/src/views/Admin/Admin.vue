<template>
  <div class="row">
    <div class="col-md-2">
      <div class="list-group">
        <button class="btn" @click="selectedComponent = 'appProductCRUD'">
          Product
        </button>
        <button class="btn" @click="selectedComponent = 'appDashBroad'">
          Dashbroad
        </button>
        <button class="btn" @click="selectedComponent = 'appSetting'">
          Setting
        </button>
      </div>
    </div>
    <div class="col-md-10">
      <keep-alive>
        <component :is="selectedComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import ProductCRUD from "./ProductCRUD.vue";
import Dashbroad from "./Dashbroad.vue";
import Setting from "./Setting.vue";
export default {
  data: function () {
    return {
      selectedComponent: "ProductCRUD",
    };
  },
  components: {
    appProductCRUD: ProductCRUD,
    appDashBroad: Dashbroad,
    appSetting: Setting,
  },
};
</script>