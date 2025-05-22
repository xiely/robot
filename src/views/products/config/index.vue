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
              <el-select v-model="queryParams.taskMode" clearable>
                <el-option v-for="(item) of taskModeArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="proxy.$t('products.分组')">
              <el-select v-model="queryParams.baseGoodGroupId" clearable>
                <el-option v-for="(item) of baseGoodGroupArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="proxy.$t('products.应用类别')">
              <el-select v-model="queryParams.appCode">
                <el-option v-for="(item) of appTypeArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="proxy.$t('状态')">
              <el-select v-model="queryParams.status">
                <el-option v-for="(item) of statuArr" :label="item.label" :value="item.value"></el-option>
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
            <vxe-column v-else-if="item.field == 'status'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  <el-switch v-model="row[item.field]" :active-value="1" :inactive-value="0"/>
                </template>
            </vxe-column>
            <vxe-column v-else-if="item.field == 'smallImg'" :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  <div style="width: 40px;height: 40px;margin: 0 0;">
                    <image-preview :src="row[item.field][0].url" :width="40" :height="40"></image-preview>
                  </div>
                </template>
            </vxe-column>
            <vxe-column v-else :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  {{ row[item.field] || '-' }}
                </template>
            </vxe-column>
          </template>
          <vxe-column :title="t('操作')" show-overflow width="280" >
              <template #default="{ row }">
                <el-button
                type="primary"
                link
                @click="handleMaterialConfig(row)"
              >
                {{ proxy.$t('products.料仓配置') }}
              </el-button>
              <el-button
                type="primary"
                link
                @click="handleCopy(row)"
              >
                {{ proxy.$t('products.复制') }}
              </el-button>
              <el-button
                type="primary"
                link
                @click="handleEdit(row)"
              >
                {{ proxy.$t('编辑') }}
              </el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(row)"
              >
                {{ proxy.$t('删除') }}
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
      <el-drawer v-model="showAddOrEdit"  direction="rtl" size="800px" close-on-click-modal>
        <template #header><div>{{ isEdit ? proxy.$t('编辑') : proxy.$t('新建') }}</div></template>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="120">
          <el-row>
            <el-col :span="8">
              <el-form-item prop="appCode" :label="proxy.$t('products.应用类别')">
                <el-select v-model="form.appCode" clearable>
                  <el-option v-for="(item) of appTypeArr" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="appCode" :label="proxy.$t('products.餐品分组')">
                <el-select v-model="form.baseGoodGroupId" clearable>
                  <el-option v-for="(item) of baseGoodGroupArr" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="appCode" :label="proxy.$t('products.餐品码表')">
                <el-select v-model="form.baseGoodCodeId" clearable>
                  <el-option v-for="(item) of baseGoodCodeArr" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="taskMode" :label="proxy.$t('products.任务模式')">
                <el-select v-model="form.taskMode" clearable>
                  <el-option v-for="(item) of taskModeArr" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="outCode" :label="proxy.$t('products.外部代码')">
                <el-input v-model="form.outCode"  clearable/>
                <span style="font-size: 12px;color: #ccc;font-size: 1;">用与外部系统对接</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="name" :label="proxy.$t('products.餐品名称')">
                <el-input v-model="form.name"  clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="remark" :label="proxy.$t('products.备注')">
                <el-input v-model="form.remark"  clearable/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item prop="remark" :label="proxy.$t('products.标签')">
                <el-input v-model="form.tag"  clearable/>
              </el-form-item></el-col> -->
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="originalPrice" :label="proxy.$t('products.原价')">
                <el-input v-model="form.originalPrice"  clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="price" :label="proxy.$t('products.餐品售价')">
                <el-input v-model="form.price"  clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="timeout" :label="proxy.$t('products.制作超时(秒)')">
                <el-input-number v-model="form.timeout"  clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="status" :label="proxy.$t('状态')">
                <el-select v-model="form.status" clearable>
                  <el-option v-for="(item) of statuArr" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="description" :label="proxy.$t('products.介绍')">
                <el-input v-model="form.description"  clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="goodImg" :label="proxy.$t('products.餐品图')">
                <image-upload v-model="form.goodImg" :limit="1" style="width: 100%;"   :file-type="['png']" :file-size="'200KB'" :file-width="280" :file-height="280"></image-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="smallImg" :label="proxy.$t('products.缩略图')">
                <image-upload v-model:model-value="form.smallImg" :limit="1" style="width: 100%;" :file-type="['png']" :file-size="'100KB'" :file-width="80" :file-height="80"></image-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="iconImg" :label="proxy.$t('products.餐品图标')">
                <image-upload v-model="form.iconImg" :limit="1" style="width: 100%;" :file-type="['png']" :file-size="'200KB'" :file-width="120" :file-height="120" ></image-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <!-- {{ form.coverImg }} -->
              <el-form-item prop="coverImg" :label="proxy.$t('products.封面')">
                <image-upload v-model="form.coverImg" :limit="1"  style="width: 100%;" :file-type="['png', 'jpg', 'jpeg']" :file-size="'200KB'" :file-width="400" :file-height="570"></image-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="animationUrl" :label="proxy.$t('products.动图')">
                <image-upload v-model="form.animationUrl" :limit="1"  style="width: 100%;" :file-type="['gif']" :file-size="6" :file-width="400" :file-height="570" ></image-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <el-button @click="showAddOrEdit = false">{{ proxy.$t('取消') }}</el-button>
          <el-button type="primary" @click="submitForm()">{{ proxy.$t('确认') }}</el-button>
        </template>
      </el-drawer>
      <!-- 复制餐品弹窗 -->
      <el-drawer v-model="showCopy"  direction="rtl" size="800px" close-on-click-modal>
        <template #header><div>{{ proxy.$t("products.复制餐品") }}</div></template>
        <el-form ref="copyFormRef" :model="formCopy" :rules="rulesCopy" label-position="right" label-width="200">
          <el-form-item prop="originName" :label="proxy.$t('products.原餐品名称')">
            <el-input v-model="formCopy.originName"  disabled/>
          </el-form-item>
          <el-form-item prop="originDescription" :label="proxy.$t('products.原餐品说明')">
            <el-input v-model="formCopy.originDescription"  disabled/>
          </el-form-item>
          <el-form-item prop="name" :label="proxy.$t('products.新餐品名称')">
            <el-input v-model="formCopy.name"/>
          </el-form-item>
          <el-form-item prop="description" :label="proxy.$t('products.新餐品介绍')">
            <el-input v-model="formCopy.description"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showCopy = false">{{ proxy.$t('取消') }}</el-button>
          <el-button type="primary" @click="submitFormCopy()">{{ proxy.$t('确认') }}</el-button>
        </template>
      </el-drawer>
    </el-card>
    <!-- 料仓配置弹窗 -->
    <el-drawer v-model="showMaterialBinConfig"  direction="rtl" size="800px" close-on-click-modal>
       <template #header><div>{{ proxy.$t('products.餐品料仓配置') }}：{{ selectedItemName }}</div></template>
       <component v-if="showMaterialBinConfig" :is="goodsMaterialBin" :selectedItemName="selectedItemName" :selectedItemId="selectedItemId" @close="closeDialog"></component>
      <!-- <goods-material-bin :selectedItem="selectedItem" @close="closeDialog"></goods-material-bin> -->
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { VxeTableInstance } from 'vxe-table'
import type { VxeComponentSizeType } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { posForm, itemQuery, itemVo, posFormCopy } from '@/api/products/config/types';
import { baseGoodsList, addBaseGoods, updateBaseGoods, delBaseGoods, copyBaseGoods } from '@/api/products/config/index';
import { goodsGroupList } from '@/api/products/base-config/goods-group/index';
import { goodsCodeList } from '@/api/products/base-config/goods-code/index';
import { to } from 'await-to-js';
import goodsMaterialBin from './goods-material-bin.vue';

const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();
const isEdit = ref(false);
const initForm: posForm = {
  "appCode": null,
  "baseGoodGroupId": null,
  "baseGoodCodeId": null,
  "name": "",
  "remark": "",
  "originalPrice": null,
  "price": null,
  "timeout": null,
  "status": null,
  "description": "",
  "goodImg": [],
  "smallImg": [],
  "iconImg": [],
  "coverImg": [],
  "animationUrl": [],
  "outCode": "",
  "taskMode": null
};
const initFormCopy: posFormCopy = {
  id: null,
  name: "",
  description: "",
  originName: "",
  originDescription: ""
};
const initQUeryParams: itemQuery = {
  current: 1,
  size: 10,
  name: "",
  code: null,
  taskMode: null,
  appCode: null, //应用类别(1咖啡、2冰激凌、3餐食)
  status: null, // 状态
  baseGoodGroupId: "",
}
const data = reactive<PageData<posForm, itemQuery>>({
  form: { ...initForm },
  queryParams: {
    ...initQUeryParams
  },
  rules: {
    appCode: [{ required: true, trigger: 'blur', message: t('请选择') }],
    baseGoodGroupId: [{ required: true, trigger: 'blur', message: t('请选择') }],
    baseGoodCodeId: [{ required: true, trigger: 'blur', message: t('请选择') }],
    taskMode: [{ required: true, trigger: 'blur', message: t('请选择') }],
    outCode: [{ required: true, trigger: 'blur', message: t('请输入') }],
    name: [{ required: true, trigger: 'blur', message: t('请输入') }],
    remark: [{ required: true, trigger: 'blur', message: t('请输入') }],
    originalPrice: [{ required: true, trigger: 'blur', message: t('请输入') }],
    price: [{ required: true, trigger: 'blur', message: t('请输入') }],
    timeout: [{ required: true, trigger: 'blur', message: t('请输入') }],
    status: [{ required: true, trigger: 'blur', message: t('请选择') }],
  }
});
interface PageDataCopy<T> {
  formCopy: T;
  rulesCopy: ElFormRules;
}
const dataCopy = reactive<PageDataCopy<posFormCopy>>({
  formCopy: { ...initFormCopy },
  rulesCopy: {
    id: [{ required: true, trigger: 'blur', message: t('请输入') }],
    name: [{ required: true, trigger: 'blur', message: t('请输入') }],
    description: [{ required: true, trigger: 'blur', message: t('请输入') }],
  }
});
const { formCopy, rulesCopy } = toRefs(dataCopy);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const showSearch = ref(true);
const { form, queryParams, rules } = toRefs(data);
const showAddOrEdit = ref(false)
const formRef = ref();
const copyFormRef = ref();
const appTypeArr = ref([
  { label: t("products.冰淇淋"), value: 1 },
  { label: t("products.咖啡"), value: 2 },
  { label: t("products.餐食"), value: 3 },
]);
const showCopy = ref(false);
const taskModeArr = ref([
  { label: t("products.双臂"), value: 1 },
  { label: t("products.左臂"), value: 2 },
  { label: t("products.右臂"), value: 3 },
])
const statuArr = ref([
  { label: t("下架"), value: 0 },
  { label: t("上架"), value: 1 },
])
const baseGoodGroupArr = ref([
  { label: "冰淇淋", value: 1 },
  { label: "热拿铁", value: 2 }
])
const baseGoodCodeArr = ref([
  { label: "hot_latte", value: 1 },
  { label: "hot_milk", value: 2 }
])
const showMaterialBinConfig = ref(false)
const selectedItemId = ref()
const selectedItemName = ref()

// 搜索
const handleQuery = () => {
  queryParams.value.current = 1;
  getList();
};

// 重置
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryParams.value = { ...initQUeryParams }
  handleQuery();
};

// 查询列表
const getList = async () => {
  // loading.value = true;
  const res = await baseGoodsList(queryParams.value);
  // loading.value = false;
  // tableData.value = res.rows;
  // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVo[]>([{
  id: "1",
  "appCode": 1,
  "baseGoodGroupId": 1,
  "baseGoodCodeId": 1,
  "name": "0519麦咖啡",
  "remark": "test设备餐品",
  "originalPrice": 47,
  "price": 79,
  "timeout": 3,
  "status": 1,
  "description": "",
  "goodImg": [{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }],
  "smallImg": [{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }],
  "iconImg": [{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }],
  "coverImg": [{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  }],
  "animationUrl": [{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }],
  "outCode": "红他快月热切什时派队",
  "taskMode": 1,
  updateTime: 1747202602,
}
])

const columnList = ref([
  { field: "name", title: t("products.名称") },
  { field: "remark", title: t("products.备注") },
  { field: "smallImg", title: t("products.缩略图") },
  { field: "baseGoodCodeId", title: t("products.码表") },
  { field: "taskMode", title: t("products.任务模式") },
  { field: "baseGoodGroupId", title: t("products.分组") },
  { field: "price", title: t("products.售价") },
  { field: "appCode", title: t("products.应用类型") },
  { field: "updateTime", title: t("更新时间"), width: 160 },
  { field: "status", title: t("状态"), width: 160 },
])

// 编辑
const handleEdit = async (row: any) => {
  formRef.value?.resetFields();
  for (let key in form.value) {
    form.value[key] = row[key];
  }
  form.value.id = row.id
  isEdit.value = true;
  showAddOrEdit.value = true;
}

// 新增
const handleAdd = () => {
  isEdit.value = false;
  formRef.value?.resetFields();
  form.value = {
    ...initForm
  }
  showAddOrEdit.value = true;
}

const handleDelete = async (row: itemVo) => {
  const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.name + t('的数据项？')) as any);
  if (!err) {
    await delBaseGoods(row.id);
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
      form.value.id ? await updateBaseGoods(obj) : await addBaseGoods(obj);
      proxy.$modal.msgSuccess('操作成功');
      showAddOrEdit.value = false;
      await getList();
    }
    else {
      console.log('error submit!', fields);
    }
  });
}

// 提交复制餐品
const submitFormCopy = () => {
  copyFormRef.value.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      const obj = { ...formCopy.value };
      console.log(obj, "OOOOOOOOOOOOOOO")
      delete obj.originName;
      delete obj.originDescription
      await copyBaseGoods(obj);
      proxy.$modal.msgSuccess('操作成功');
      showCopy.value = false;
      await getList();
    }
    else {
      console.log('error submit!', fields);
    }
  });
}

// 料仓配置
const handleMaterialConfig = (row: itemVo) => {
  selectedItemId.value = row.id;
  selectedItemName.value = row.name;
  showMaterialBinConfig.value = true;

}
const closeDialog = () => {
  showMaterialBinConfig.value = false;
}

// 复制
const handleCopy = (row: itemVo) => {
  showCopy.value = true;
  formCopy.value = {
    id: Number(row.id),
    name: row.name,
    description: row.remark + '-copy',
    originName: row.name,
    originDescription: row.description
  }
  console.log(formCopy.value, "VVVVVVVVVVVVVV")
}

// 查询餐品分组列表
const getGroudList = async () => {
  let query = {
    current: 1,
    size: 999999999
  }
  baseGoodGroupArr.value = [];
  const res = await goodsGroupList(query);
  for (let item of res.rows) {
    let obj = { label: item.name, value: Number(item.id) }
    baseGoodGroupArr.value.push(obj)
  }
};

// 查询餐品码表列表
const getGroudCodeList = async () => {
  let query = {
    current: 1,
    size: 999999999
  }
  baseGoodGroupArr.value = [];
  const res = await goodsCodeList(query);
  for (let item of res.rows) {
    let obj = { label: item.name, value: Number(item.id) }
    baseGoodCodeArr.value.push(obj)
  }
};



onMounted(() => {
  // getList();
  //getGroudList();
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

.top-add {
  width: 100%;
  text-align: right;
  margin-bottom: 10px;
}
</style>
