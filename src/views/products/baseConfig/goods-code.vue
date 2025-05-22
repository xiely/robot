<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true :label-width="100">
            <el-form-item :label="proxy.$t('products.名称')">
              <el-input v-model="queryParams.name"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item :label="proxy.$t('products.码表')">
              <el-input v-model="queryParams.code"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item :label="proxy.$t('products.任务模式')">
              <el-select v-model="queryParams.taskMode">
                <el-option v-for="(item) of taskModeArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="proxy.$t('products.应用类别')">
              <el-select v-model="queryParams.appCode">
                <el-option v-for="(item) of appTypeArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">{{ t('查询') }}</el-button>
              <el-button icon="Refresh" @click="resetQuery">{{ t('重置') }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>
    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col><el-button icon="Plus" type="primary" @click="handleAdd()">{{ t('新建') }}</el-button></el-col>
          <right-toolbar v-model:show-search="showSearch" @query-table="getList"
          :download="download" :size="''"
          ></right-toolbar>
        </el-row>
      </template>

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
      <el-drawer v-model="showAddOrEdit"  direction="rtl" size="600px" close-on-click-modal>
        <template #header><div>{{ isEdit ? proxy.$t('编辑') : proxy.$t('新建') }}</div></template>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100">
          <el-form-item prop="appCode" :label="proxy.$t('products.应用类别')">
            <el-select v-model="form.appCode" :disabled="isEdit">
              <el-option v-for="(item) of appTypeArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name" :label="proxy.$t('products.名称')">
            <el-input v-model="form.name"  clearable/>
          </el-form-item>
          <el-form-item prop="code" :label="proxy.$t('products.码表')">
            <el-input v-model="form.code"  clearable :disabled="isEdit"/>
          </el-form-item>
          <el-form-item prop="taskMode" :label="proxy.$t('products.任务模式')">
            <el-select v-model="form.taskMode" :disabled="isEdit">
              <el-option v-for="(item) of taskModeArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showAddOrEdit = false">取消</el-button>
          <el-button type="primary" @click="submitForm()">确认</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { VxeTableInstance } from 'vxe-table'
import type { VxeComponentSizeType } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { posForm, itemQuery, itemVo } from '@/api/products/base-config/goods-code/types';
import { goodsCodeList, addGoodsCode, updateGoodsCode, delGoodsCode } from '@/api/products/base-config/goods-code/index';
import { to } from 'await-to-js';

const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();

const isEdit = ref(false);
const initForm: posForm = {
  "name": "热拿铁",
  "code": "hot_latte",
  "taskMode": 1,
  "appCode": 1
};
const data = reactive<PageData<posForm, itemQuery>>({
  form: { ...initForm },
  queryParams: {
    current: 1,
    size: 10,
    name: "",
    code: "",
    taskMode: null,
    appCode: null,
  },
  rules: {
    appCode: [{ required: true, trigger: 'blur', message: t('请输入') }],
    name: [{ required: true, trigger: 'blur', message: t('请输入') }],
    code: [{ required: true, trigger: 'blur', message: t('请输入') }],
    taskMode: [{ required: true, trigger: 'blur', message: t('请选择') }],
  }
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const showSearch = ref(true);
const { form, queryParams, rules } = toRefs(data);
const showAddOrEdit = ref(false)
const formRef = ref();
const appTypeArr = ref([
  { label: t("products.冰淇淋"), value: 1 },
  { label: t("products.咖啡"), value: 2 },
  { label: t("products.餐食"), value: 3 },
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
  const res = await goodsCodeList(queryParams.value);
  // loading.value = false;
  // tableData.value = res.rows;
  // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVo[]>([{
  id: "1",
  "name": "热拿铁",
  "code": "hot_latte",
  "taskMode": 1,
  "appCode": 1,
  updateTime: 1747202602,
  createTime: 1747202602,
}
])

const columnList = ref([
  { field: "name", title: t("products.名称") },
  { field: "code", title: t("products.码表") },
  { field: "taskMode", title: t("products.任务模式") },
  { field: "appCode", title: t("products.应用类别") },
  { field: "updateTime", title: t("更新时间"), width: 160 },
  { field: "createTime", title: t("创建时间"), width: 160 },
])

// 编辑
const handleEdit = async (row: any) => {
  formRef.value?.resetFields();
  form.value = {
    id: row.id,
    "name": row.name,
    "code": row.code,
    "taskMode": row.taskMode,
    "appCode": row.appCode
  }
  isEdit.value = true;
  showAddOrEdit.value = true;
}

// 新增
const handleAdd = () => {
  isEdit.value = false;
  formRef.value?.resetFields();
  form.value = {
    "name": "",
    "code": "",
    "taskMode": null,
    "appCode": null
  }
  showAddOrEdit.value = true;
}

const handleDelete = async (row: itemVo) => {
  const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.name + t('的数据项？')) as any);
  if (!err) {
    await delGoodsCode(row.id);
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
      form.value.id ? await updateGoodsCode(obj) : await addGoodsCode(obj);
      proxy.$modal.msgSuccess('操作成功');
      showAddOrEdit.value = false;
      await getList();
    }
    else {
      console.log('error submit!', fields);
    }
  });
}



onMounted(() => {
  // getList();
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
