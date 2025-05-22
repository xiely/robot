<template>
  <div class="p-2">
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

            <vxe-column v-else-if="item.field == 'status'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  <el-tag v-if="row[item.field] == 1" type="success">{{ proxy.$t('上架') }}</el-tag>
                  <el-tag v-else type="danger">{{ proxy.$t('下架') }}</el-tag>
                </template>
            </vxe-column>
            <vxe-column v-else-if="item.field == 'patternUrl'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  <div style="width: 40px;height: 40px;margin: 0 0;">
                    <img style="width: 40px;height:40px;" :src=row[item.field] alt="图片" @click="handlePicShow(row)">

                  </div>
                </template>
            </vxe-column>
            <vxe-column v-else :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  {{ row[item.field] || '-' }}
                </template>
            </vxe-column>
          </template>
          <vxe-column :title="t('操作')" show-overflow width="160" >
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
      <el-dialog  v-model="showAddOrEdit"  direction="rtl" size="600px" close-on-click-modal>
        <template #header><div>{{ proxy.$t('sidebar.餐品配置') }}: {{ props.name }}</div></template>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100">
          <el-form-item prop="name" :label="proxy.$t('products.名称')">
            <el-input v-model="form.name"  clearable/>
          </el-form-item>
          <el-form-item prop="patternUrl" :label="proxy.$t('products.打印拉花图')">
            <image-upload style="width: 100%;" :file-type="['png']" :file-size="'500KB'" :file-width="600" :file-height="600"></image-upload>
          </el-form-item>
          <el-form-item prop="sort" :label="proxy.$t('products.排序')">
            <el-input-number v-model="form.sort"  clearable />
          </el-form-item>
          <el-form-item :label="proxy.$t('状态')" prop="status">
            <el-select v-model="form.status">
              <el-option v-for="(item) of statuArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showAddOrEdit = false">{{ proxy.$t('取消') }}</el-button>
          <el-button type="primary" @click="submitForm()">{{ proxy.$t('确认') }}</el-button>
        </template>
      </el-dialog>
      <!-- 图片弹窗 -->
      <el-dialog
        v-model="showPicVisible"
        :title="selectedItem.name"
        width="500">
        <div style="width: 300px;height: 300px;margin: 0 auto;">
          <el-image style="width: 300px; height: 300px" :src="selectedItem.patternUrl" />
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="showPicVisible = false">
              {{ proxy.$t('关闭') }}
            </el-button>
          </div>
        </template>
      </el-dialog>

  </div>
</template>
<script lang="ts" setup>
import { VxeTableInstance } from 'vxe-table'
import type { VxeComponentSizeType } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { posFormPrintPattern, itemQueryPrintPattern, itemVoPrintPattern } from '@/api/products/base-config/print/print-pattern/types';
import { printPatternList, addPrintPattern, updatePrintPattern, delPrintPattern } from '@/api/products/base-config/print/print-pattern/index';
import { to } from 'await-to-js';


const props = defineProps({
  "basePrintId": {
    type: Number,
    required: true
  },
  "name": {
    type: String,
    required: true
  }
})
const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();

const isEdit = ref(false);
const initForm: posFormPrintPattern = {
  basePrintId: props.basePrintId,
  name: "喜",
  sort: 1,
  patternUrl: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  status: 1,
};
const data = reactive<PageData<posFormPrintPattern, itemQueryPrintPattern>>({
  form: { ...initForm },
  queryParams: {
    basePrintId: props.basePrintId,
    current: 1,
    size: 10,
  },
  rules: {
    name: [{ required: true, trigger: 'blur', message: t('请输入') }],
    sort: [{ required: true, trigger: 'blur', message: t('请输入') }],
    status: [{ required: true, trigger: 'blur', message: t('请选择') }],
  }
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { form, queryParams, rules } = toRefs(data);
const showAddOrEdit = ref(false)
const formRef = ref();
const statuArr = ref([
  { label: t("下架"), value: 0 },
  { label: t("上架"), value: 1 },
])
const showPicVisible = ref(false);
const showPrintPattern = ref(false)
const selectedItemId = ref();

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
  const res = await printPatternList(queryParams.value);
  // loading.value = false;
  // tableData.value = res.rows;
  // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVoPrintPattern[]>([{
  basePrintId: null,
  id: 1,
  name: "喜",
  sort: 1,
  patternUrl: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  status: 1,
  updateTime: 1747202602,
  createTime: 1747202602,
}
])
const selectedItem = ref({
  name: "",
  patternUrl: ""
});

const columnList = ref([
  { field: "name", title: t("products.名称") },
  { field: "patternUrl", title: t("products.打印拉花图") },
  { field: "sort", title: t("products.排序") },
  { field: "status", title: t("状态") },
  { field: "updateTime", title: t("更新时间"), width: 160 },
  { field: "createTime", title: t("创建时间"), width: 160 },
])

// 印花图
const handlePrint = (id: string | number) => {
  selectedItemId.value = Number(id);
  showPrintPattern.value = true;
}

// 编辑
const handleEdit = async (row: any) => {
  formRef.value?.resetFields();
  form.value = {
    basePrintId: props.basePrintId,
    id: row.id,
    name: row.name,
    sort: row.sort,
    patternUrl: row.patternUrl,
    status: row.status,
  }
  isEdit.value = true;
  showAddOrEdit.value = true;
}

// 新增
const handleAdd = () => {
  isEdit.value = false;
  formRef.value?.resetFields();
  form.value = {
    basePrintId: props.basePrintId,
    name: "",
    sort: null,
    patternUrl: "",
    status: null,
  }
  showAddOrEdit.value = true;
}

// 删除
const handleDelete = async (row: itemVoPrintPattern) => {
  const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.name + t('的数据项？')) as any);
  if (!err) {
    await delPrintPattern(row.id);
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
      form.value.id ? await updatePrintPattern(obj) : await addPrintPattern(obj);
      proxy.$modal.msgSuccess('操作成功');
      showAddOrEdit.value = false;
      await getList();
    }
    else {
      console.log('error submit!', fields);
    }
  });
}

const handlePicShow = (row: itemVoPrintPattern) => {
  showPicVisible.value = true;
  selectedItem.value = {
    name: row.name,
    patternUrl: row.patternUrl
  };
}



onMounted(() => {
  getList();
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
