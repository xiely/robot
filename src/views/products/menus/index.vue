<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true :label-width="100">
            <el-form-item :label="proxy.$t('products.名称')">
              <el-input v-model="queryParams.name"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item :label="proxy.$t('products.设备型号')">
              <el-input v-model="queryParams.deviceSeriesName"  clearable @keyup.enter="handleQuery" />
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
            <vxe-column v-else :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  {{ row[item.field] || '-' }}
                </template>
            </vxe-column>
          </template>
          <vxe-column :title="t('操作')" show-overflow width="410" >
              <template #default="{ row }">
              <el-button
                type="primary"
                link
              >
                {{ t('products.餐品配置') }}
              </el-button>
              <el-button
                type="primary"
                link
              >
                {{ t('products.印花库') }}
              </el-button>
              <el-button
                type="primary"
                link
              >
                {{ t('products.复制') }}
              </el-button>
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
      <el-drawer v-model="showAddOrEdit"  direction="rtl" size="800px" close-on-click-modal>
        <template #header><div>{{ isEdit ? proxy.$t('编辑') : proxy.$t('新建') }}</div></template>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="180">
          <el-form-item prop="name" :label="proxy.$t('products.菜单名称')">
            <el-input v-model="form.name"  clearable/>
          </el-form-item>
          <el-form-item prop="deviceSeriesIds" :label="proxy.$t('products.设备型号')">
            <el-select v-model="form.deviceSeriesIds" multiple>
              <el-option v-for="(item) of deviceArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="tagImg" :label="proxy.$t('products.点餐徽标')">
            <image-upload v-model="form.tagImg" :limit="1" style="width: 100%;"   :file-type="['png', 'jpg', 'jpeg']" :file-size="1" :file-width="624" :file-height="775"></image-upload>
          </el-form-item>
          <el-form-item prop="banner" :label="proxy.$t('products.广告Banner')">
            <image-upload v-model="form.banner" :limit="1" style="width: 100%;"   :file-type="['png', 'jpg', 'jpeg']" :file-size="2" :file-width="1500" :file-height="400"></image-upload>
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
import { posForm, showForm, itemQuery, itemVo } from '@/api/products/menus/types';
import { baseMenuTemplateList, addBaseMenuTemplate, updateBaseMenuTemplate, delBaseMenuTemplate } from '@/api/products/menus/index';
import { to } from 'await-to-js';

const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();

const isEdit = ref(false);
const initForm: showForm = {
  name: "", //名称
  deviceSeriesIds: [], //设备型号(逗号分割)
  banner: "",
  tagImg: "" //点餐徽标
};
const data = reactive<PageData<showForm, itemQuery>>({
  form: { ...initForm },
  queryParams: {
    current: 1,
    size: 10,
    name: "",
    deviceSeriesName: ""
  },
  rules: {
    name: [{ required: true, trigger: 'blur', message: t('请输入') }],
    deviceSeriesIds: [{ required: true, trigger: 'blur', message: t('请选择') }],
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
const deviceArr = ref([
  { label: "P系列", value: 1 },
  { label: "T系列", value: 2 },
  { label: "厨房机系列", value: 3 },
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
  // const res = await baseMenuTemplateList(queryParams.value);
  // loading.value = false;
  // tableData.value = res.rows;
  // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVo[]>([{
  id: "1",
  name: "T系列测试菜单", //名称
  deviceSeriesName: "inCafeT,inCafeP",
  deviceSeriesIds: "1,2", //设备型号(逗号分割)
  tagImg: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100", //点餐徽标
  banner: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  updateTime: 1747202602,
  createTime: 1747202602,
}
])

const columnList = ref([
  { field: "name", title: t("products.名称") },
  { field: "deviceSeriesName", title: t("products.设备型号") },
  { field: "updateTime", title: t("更新时间"), width: 160 },
  { field: "createTime", title: t("创建时间"), width: 160 },
])

// 编辑
const handleEdit = async (row: any) => {
  formRef.value?.resetFields();
  for (let key in form.value) {
    form.value[key] = row[key]
  }
  let arr = row.deviceSeriesIds.split(",");
  form.value.deviceSeriesIds = arr.map(item => Number(item))
  console.log(form.value.deviceSeriesIds, "IIIIIIIIII")
  form.value.id = row.id;
  console.log(form.value, "FFFFFFFFFFFFFFFFFF")
  isEdit.value = true;
  showAddOrEdit.value = true;
}

// 新增
const handleAdd = () => {
  isEdit.value = false;
  formRef.value?.resetFields();
  form.value = { ...initForm }
  showAddOrEdit.value = true;
}

const handleDelete = async (row: itemVo) => {
  const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.name + t('的数据项？')) as any);
  if (!err) {
    await delBaseMenuTemplate(row.id);
    await getList();
    proxy?.$modal.msgSuccess('删除成功');
  }

}

// 提交编辑或新增
const submitForm = () => {
  formRef.value.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      const obj = JSON.parse(JSON.stringify(form.value));
      if (!obj.id) {
        delete obj.id
      }
      obj.deviceSeriesIds = form.value.deviceSeriesIds.join(',');
      form.value.id ? await updateBaseMenuTemplate(obj) : await addBaseMenuTemplate(obj);
      proxy.$modal.msgSuccess('操作成功');
      showAddOrEdit.value = false;
      await getList();
    }
    else {
      console.log('error submit!', fields);
    }
  });
}

const getDeviceList = () => {
  // let query = {
  //   current: 1,
  //   size: 999999999
  // }
  // baseGoodGroupArr.value = [];
  // const res = await goodsGroupList(query);
  // for (let item of res.rows) {
  //   let obj = { label: item.name, value: Number(item.id) }
  //   deviceArr.value.push(obj)
  // }
}


onMounted(() => {
  // getList();
  //getDeviceList()
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
