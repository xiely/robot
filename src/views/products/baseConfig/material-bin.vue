<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true :label-width="100">
            <el-form-item :label="proxy.$t('products.名称')">
              <el-input v-model="queryParams.name"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item :label="proxy.$t('products.物料种类')">
            <el-select v-model="queryParams.baseMaterialTypeId">
                <el-option v-for="(item) of materialTypeArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="proxy.$t('products.缺料警告阀值')" >
              <el-input v-model="queryParams.alertThreshold"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item prop="status" :label="proxy.$t('状态')">
            <el-select v-model="queryParams.status">
              <el-option v-for="item of statuArr" :label="item.label" :value="item.value"></el-option>
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
            <!-- <el-tag type="success">Tag 2</el-tag> -->
             <vxe-column v-else-if="item.field == 'status'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  <el-tag v-if="row[item.field] == 1" type="success">{{ proxy.$t('上架') }}</el-tag>
                  <el-tag v-else type="danger">{{ proxy.$t('下架') }}</el-tag>
                </template>
            </vxe-column>
            <vxe-column v-else-if="item.field == 'countWay'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  <span v-if="row[item.field] == 0" >{{ proxy.$t('products.手动计数') }}</span>
                  <span v-else-if="row[item.field] == 1">{{ proxy.$t('products.自动计数') }}</span>
                  <span v-else-if="row[item.field] == 2"">{{ proxy.$t('products.半自动计数') }}</span>
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
        <template #header><div>{{ isEdit ? '编辑' : '新建' }}</div></template>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100">
          <el-form-item prop="name" :label="proxy.$t('products.种类')">
            <el-select v-model="form.baseMaterialTypeId" :disabled="isEdit">
              <el-option v-for="(item) of materialTypeArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name" :label="proxy.$t('products.名称')">
            <el-input v-model="form.name"  clearable/>
          </el-form-item>
          <el-form-item prop="code" :label="proxy.$t('products.码表')">
            <el-input v-model="form.code"  clearable :disabled="isEdit"/>
          </el-form-item>
          <el-form-item prop="unit" :label="proxy.$t('products.单位')">
            <el-input v-model="form.unit"  clearable :disabled="isEdit"/>
          </el-form-item>
          <el-form-item prop="status" :label="proxy.$t('状态')">
            <el-select v-model="form.status">
              <el-option v-for="item of statuArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="类型" :label="proxy.$t('products.计量方式')">
            <el-radio-group v-model="form.countWay">
              <el-radio v-for="(item) of countWayArr" :value="item.value" >{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="默认总容量" :label="proxy.$t('products.默认总容量')">
            <el-input-number v-model="form.capacity"  clearable/>
          </el-form-item>
          <el-form-item prop="alertThreshold" :label="proxy.$t('products.缺料警告阀值')">
            <el-input-number v-model="form.alertThreshold"  clearable/>
          </el-form-item>

          <el-form-item prop="stopThreshold" :label="proxy.$t('products.缺料停止阀值')">
            <el-input-number v-model="form.stopThreshold"  clearable/>
          </el-form-item>
          <el-form-item prop="imgUrl" :label="proxy.$t('products.图片')">
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          </el-form-item>
          <el-form-item prop="videoUrl" :label="proxy.$t('products.视频')">
            <file-upload :file-type="['mp4']" :file-size="200" :isShowTip="false"></file-upload>
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
import organizeSelect from '@/views/organize-select.vue';
import type { VxeComponentSizeType } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { posForm, itemQuery, itemVo } from '@/api/products/base-config/material-bin/types';
import { materialBinList, addMaterialBin, updateMaterialBin, delMaterialBin } from '@/api/products/base-config/material-bin/index';
import { materialTypeList } from '@/api/products/base-config/material-type/index';
import { to } from 'await-to-js';
import { ro } from 'element-plus/es/locale/index.mjs';

const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();
const statuArr = ref([
  { label: t("下架"), value: 0 },
  { label: t("上架"), value: 1 },
])
const isEdit = ref(false);
const initForm: posForm = {
  "name": "",
  "code": "",
  "unit": "",
  "status": 0,
  "capacity": 82,
  "countWay": 96,
  "alertThreshold": 49,
  "stopThreshold": 93,
  "imgUrl": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "videoUrl": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "baseMaterialTypeId": 36
};
const data = reactive<PageData<posForm, itemQuery>>({
  form: { ...initForm },
  queryParams: {
    current: 1,
    size: 10,
    name: "",
    status: null,
    baseMaterialTypeId: null,
    alertThreshold: null
  },
  rules: {
    name: [{ required: true, trigger: 'blur', message: t('请输入') }],
    unit: [{ required: true, trigger: 'blur', message: t('请输入') }],
    code: [{ required: true, trigger: 'blur', message: t('请输入') }],
    status: [{ required: true, trigger: 'blur', message: t('请选择') }],
  }
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const showSearch = ref(true);
const { form, queryParams, rules } = toRefs(data);
const showAddOrEdit = ref(false)
const formRef = ref();
const materialTypeArr = ref([
  { label: "牛奶", value: 1 }
]);
const countWayArr = ref([
  { label: t("products.手动计数"), value: 0 },
  { label: t("products.自动计数"), value: 1 },
  { label: t("products.半自动计数"), value: 2 }
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
  const res = await materialBinList(queryParams.value);
  // loading.value = false;
  // tableData.value = res.rows;
  // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVo[]>([{
  id: "1",
  "name": "左豆仓(L)",
  "code": "left",
  "unit": "g",
  "status": 0,
  "capacity": 1000,
  "countWay": 0,
  "alertThreshold": 49,
  "stopThreshold": 93,
  "imgUrl": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "videoUrl": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "baseMaterialTypeId": 36,
  updateTime: 1747202602,
  createTime: 1747202602,
}
])

const columnList = ref([
  { field: "name", title: t("products.名称") },
  { field: "code", title: t("products.料仓编号") },
  { field: "baseMaterialTypeName", title: t("products.物料种类") },
  { field: "unit", title: t("products.单位") },
  { field: "capacity", title: t("products.默认总容量") },
  { field: "countWay", title: t("products.计量方式"), width: 125 },
  { field: "alertThreshold", title: t("products.缺料警告阀值") },
  { field: "stopThreshold", title: t("products.缺料停止阀值") },
  { field: "status", title: t("状态") },
  { field: "updateTime", title: t("更新时间"), width: 160 },
  // { field: "createTime", title: t("创建时间"), width: 160 },
])

// 编辑
const handleEdit = async (row: any) => {
  formRef.value?.resetFields();
  form.value = {
    id: row.id,
    "name": row.name,
    "code": row.code,
    "unit": row.unit,
    "status": row.status,
    "capacity": row.capacity,
    "countWay": row.countWay,
    "alertThreshold": row.alertThreshold,
    "stopThreshold": row.stopThreshold,
    "imgUrl": row.imgUrl,
    "videoUrl": row.videoUrl,
    "baseMaterialTypeId": row.baseMaterialTypeId,
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
    "unit": "",
    "status": null,
    "capacity": null,
    "countWay": null,
    "alertThreshold": null,
    "stopThreshold": null,
    "imgUrl": "",
    "videoUrl": "",
    "baseMaterialTypeId": null,
  }
  showAddOrEdit.value = true;
}

const handleDelete = async (row: itemVo) => {
  const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.name + t('的数据项？')) as any);
  if (!err) {
    await delMaterialBin(row.id);
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
      form.value.id ? await updateMaterialBin(obj) : await addMaterialBin(obj);
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
  let res = await materialTypeList()
  for (let item of res.rows) {
    let obj = { label: item.name, value: item.id }
    materialTypeArr.value.push(obj);
  }
}


onMounted(() => {
  // getList();
  // getMaterialTypeList
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
