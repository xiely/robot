<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
    </transition>
    <div class="top-add">
      <el-button  icon="Plus" type="primary" @click="handleAdd()">{{ t('新建') }}</el-button>
    </div>
    <vxe-table
      ref="tableRef"
      border
      :size="size"
      stripe
      height="400"
      :loading="loading"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
      :data="tableData">
        <template v-for="(item, index) of columnList">
          <vxe-column v-if="item.field == 'updateTime' || item.field == 'createTime'"  :field="item.field" :title="item.title" show-overflow :width="item?.width">
              <template #default="{ row }">
              {{ proxy.parseTime(row[item.field]) }}
              </template>
          </vxe-column>

          <vxe-column v-else-if="item.field == 'taskMode'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
              <template #default="{ row }">
                <span v-if="row[item.field] == 1" >{{ proxy.$t('products.双臂') }}</span>
                <span v-else-if="row[item.field] == 2">{{ proxy.$t('products.左臂') }}</span>
                <span v-else-if="row[item.field] == 3"">{{ proxy.$t('products.右臂') }}</span>
              </template>
          </vxe-column>
          <vxe-column v-else-if="item.field == 'appCode'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
              <template #default="{ row }">
                <span v-if="row[item.field] == 1" >{{ proxy.$t('products.冰淇淋') }}</span>
                <span v-else-if="row[item.field] == 2">{{ proxy.$t('products.咖啡') }}</span>
                <span v-else-if="row[item.field] == 3"">{{ proxy.$t('products.餐食') }}</span>
              </template>
          </vxe-column>
          <vxe-column v-else :field="item.field" :title="item.title" show-overflow :width="item?.width">
              <template #default="{ row }">
                {{ row[item.field] || '-' }}
              </template>
          </vxe-column>
        </template>
        <vxe-column :title="t('操作')" show-overflow width="110" >
            <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="handleEdit(row)"
            >
              {{ t('编辑') }}
            </el-button>
            <el-button
              type="primary"
              link
              @click="handleDelete(row)"
            >
              {{ t('删除') }}
            </el-button>
          </template>
        </vxe-column>
    </vxe-table>
    <pagination
      v-show="total > 0"
      v-model:page="queryParams.current"
      v-model:limit="queryParams.size"
      :total="total"
      @pagination="getList"
    />
    <!-- 编辑新增弹窗 -->
    <el-dialog v-model="showAddOrEdit" append-to-body>
      <template #header><div>{{ proxy.$t('products.料仓配置') }}：{{ selectedItemName }}</div></template>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="150">
        <el-form-item prop="baseMaterialTypeId" :label="proxy.$t('products.物料种类')">
          <el-select v-model="form.baseMaterialTypeId" @change="getMaterialList(form.baseMaterialTypeId)">
            <el-option v-for="(item) of materialTypeArr" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="baseMaterialId" :label="proxy.$t('products.物料')">
          <el-select v-model="form.baseMaterialId" >
            <el-option v-for="(item) of materialArr" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="processMode" :label="proxy.$t('products.参数')">
          <el-input v-model="form.processMode"  clearable/>
        </el-form-item>
        <el-form-item prop="quantity" :label="proxy.$t('products.数量')">
          <el-input-number v-model="form.quantity"  clearable />
          <span style="padding-left: 10px;">{{ form.unit }}</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddOrEdit = false">{{ proxy.$t('取消') }}</el-button>
        <el-button type="primary" @click="submitForm()">{{ proxy.$t('确认') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { VxeTableInstance } from 'vxe-table'
import type { VxeComponentSizeType } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { posForm, itemQuery, itemVo } from '@/api/products/config/goods-material-bin/types';
import { baseGoodsMaterialBinList, addBaseGoodsMaterialBin, updateBaseGoodsMaterialBin, delBaseGoodsMaterialBin } from '@/api/products/config/goods-material-bin/index';
import { to } from 'await-to-js';
import { materialTypeList } from '@/api/products/base-config/material-type';
import { materialList } from '@/api/products/base-config/material';

interface Item {
  id: string;
  name: string;
}
const props = defineProps({
  selectedItemId: {
    type: String,
  },
  selectedItemName: {
    type: String,
  }
})
const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();
const isEdit = ref(false);
const initForm: posForm = {
  quantity: null, // 数量
  baseGoodId: Number(props.selectedItemId), //要配置的餐品ID
  processMode: "", // 参数
  baseMaterialId: null, // 物料ID
  baseMaterialTypeId: null, //所属物料种类
  unit: '' // 物料种类单位
};
const data = reactive<PageData<posForm, itemQuery>>({
  form: { ...initForm },
  queryParams: {
    current: 1,
    size: 10,
    id: "",
  },
  rules: {
    quantity: [{ required: true, trigger: 'blur', message: t('请输入') }],
    baseGoodId: [{ required: true, trigger: 'blur', message: t('请选择') }],
    baseMaterialId: [{ required: true, trigger: 'blur', message: t('请选择') }],
    baseMaterialTypeId: [{ required: true, trigger: 'blur', message: t('请选择') }],
    processMode: [{ required: true, trigger: 'blur', message: t('请输入') }],
  }
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { form, queryParams, rules } = toRefs(data);
const showAddOrEdit = ref(false)
const formRef = ref();
const materialTypeArr = ref([
  { label: "豆仓", value: 1, unit: 'g' },
]);
const materialArr = ref([
  { label: "左豆", value: 1 },
]);
const taskModeArr = ref([
  { label: t("products.双臂"), value: 1 },
  { label: t("products.左臂"), value: 2 },
  { label: t("products.右臂"), value: 3 },
])

// 搜索
const handleQuery = () => {
  queryParams.value.current = 1;
  getList();
};

// 重置
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

// 查询列表
const getList = async () => {
  // loading.value = true;
  const res = await baseGoodsMaterialBinList(queryParams.value);
  // loading.value = false;
  // tableData.value = res.rows;
  // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVo[]>([{
  id: 1,
  quantity: 10, // 数量
  baseGoodId: Number(1), //要配置的餐品
  processMode: "espresso_d", // 参数
  baseMaterialName: "左豆", // 物料名称
  baseMaterialTypeId: 1, //所属物料种类
  baseMaterialTypeName: ""
}
])

const columnList = ref([
  { field: "baseMaterialName", title: t("products.物料") },
  { field: "quantity", title: t("products.数量") },
  { field: "processMode", title: t("products.参数") },
  { field: "baseMaterialTypeName", title: t("products.类型") },
])

// 编辑
const handleEdit = async (row: any) => {
  formRef.value?.resetFields();
  for (let key in form.value) {
    form.value[key] = row[key]
  }
  form.value.id = Number(row.id);
  form.value.baseGoodId = Number(props.selectedItemId)
  isEdit.value = true;
  showAddOrEdit.value = true;
}

// 新增
const handleAdd = () => {
  isEdit.value = false;
  formRef.value?.resetFields();
  form.value = { ...initForm }
  form.value.baseGoodId = Number(props.selectedItemId)
  showAddOrEdit.value = true;
}

const handleDelete = async (row: itemVo) => {
  const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.baseMaterialName + t('的数据项？')) as any);
  if (!err) {
    await delBaseGoodsMaterialBin(row.id);
    await getList();
    proxy?.$modal.msgSuccess('删除成功');
  }

}

// 提交编辑或新增
const submitForm = () => {
  formRef.value.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      const obj = { ...form.value };
      if (!obj.id) {
        delete obj.id
      }
      form.value.id ? await updateBaseGoodsMaterialBin(obj) : await addBaseGoodsMaterialBin(obj);
      proxy.$modal.msgSuccess('操作成功');
      showAddOrEdit.value = false;
      await getList();
    }
    else {
      console.log('error submit!', fields);
    }
  });
}
const getMaterialTypeList = async () => {
  let query = {
    size: 100000,
    current: 1
  }
  materialTypeArr.value = []
  let res = await materialTypeList(query)
  for (let item of res.rows) {
    let obj = { label: item.name, value: Number(item.id), unit: item.unit }
    materialTypeArr.value.push(obj);
  }
}

const getMaterialList = async (id) => {
  for (let item of materialTypeArr.value) {
    if (item.value == form.value.baseMaterialTypeId) {
      form.value.unit = item.unit;
    }
  }
  let query = {
    size: 100000,
    current: 1,
    materialTypeId: id
  }
  materialArr.value = []
  let res = await materialList(query)
  for (let item of res.rows) {
    let obj = { label: item.name, value: Number(item.id) }
    materialArr.value.push(obj);
  }
}

onMounted(() => {
  console.log(props.selectedItemId, "SSSSSSSSSSSSSS")
  queryParams.value.id = props.selectedItemId;
  // getList();
  // getMaterialTypeList()
})


</script>
<style lang="scss">
.detail-item {
  margin-bottom: 10px;
}

.form-tip {
  display: block;
  color: rgba(0, 0, 0, .45);
  font-size: 13px;
}
</style>
