<template>
  <div class="p-2">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane v-for="(item, index) of tabList" :label="item.label" :name="index"></el-tab-pane>
      <component :is="currentComponent" ></component>
    </el-tabs>

  </div>
</template>
<script lang="ts" setup>
import { TabsPaneContext } from 'element-plus';
import goodsCode from "./goods-code.vue"
import goodsGroup from './goods-group.vue';
import materialBin from './material-bin.vue';
import material from './material.vue';
import materialType from './material-type.vue';
import print from './print.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const tabList = ref([
  { label: t("products.餐品码表") },
  { label: t("products.餐品分组") },
  { label: t("products.料仓") },
  { label: t("products.物料") },
  { label: t("products.物料种类") },
  { label: t("products.印花库") },
])
const tabIndex = ref(5);
const activeName = ref(5);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.index)
  tabIndex.value = Number(tab.index);
}

// 定义 currentComponent
const currentComponent = computed(() => {
  switch (tabIndex.value) {
    case 0:
      return goodsCode;
    case 1:
      return goodsGroup;
    case 2:
      return materialBin;
    case 3:
      return material;
    case 4:
      return materialType;
    case 5:
      return print;
    default:
      return null;
  }
});
</script>
<style lang="scss">
.top-add {
  width: 100%;
  text-align: right;
  margin-bottom: 10px;
}
</style>
