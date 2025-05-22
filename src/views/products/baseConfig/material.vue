<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true >
            <el-form-item :label="proxy.$t('products.名称')" prop="name">
              <el-input v-model="queryParams.name"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item :label="proxy.$t('products.物料种类')">
            <el-select v-model="queryParams.baseMaterialTypeId">
                <el-option v-for="(item) of materialTypeArr" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
            <vxe-column v-else :field="item.field" :title="item.title" show-overflow :width="item?.width">
                <template #default="{ row }">
                  {{ row[item.field] || '-' }}
                </template>
            </vxe-column>
          </template>
          <vxe-column :title="t('操作')" show-overflow >
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
          <el-form-item prop="code" :label="proxy.$t('products.代码')">
            <el-input v-model="form.code"  clearable :disabled="isEdit"/>
          </el-form-item>
          <el-form-item prop="description" :label="proxy.$t('products.说明')">
            <el-input v-model="form.description"  clearable/>
          </el-form-item>
          <el-form-item prop="processMode" :label="proxy.$t('products.参数')">
            <el-input v-model="form.processMode"  clearable/>
          </el-form-item>
          <el-form-item prop="status" :label="proxy.$t('状态')">
            <el-select v-model="form.status">
              <el-option v-for="item of statuArr" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="capacity" :label="proxy.$t('products.包装')">
            <el-input v-model="form.capacity"  clearable/>
          </el-form-item>
          <el-form-item prop="imgUrl" :label="proxy.$t('products.图片')">
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
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
import { posForm, itemQuery, itemVo } from '@/api/products/base-config/material/types';
import { materialList, addMaterial, updateMaterial, delMaterial } from '@/api/products/base-config/material/index';
import { materialTypeList } from '@/api/products/base-config/material-type/index';
import { to } from 'await-to-js';

const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();
const statuArr = ref([
    { label: t("下架"), value: "0" },
    { label: t("上架"), value: "1" },
])
const isEdit = ref(false);
const initForm: posForm = {
    "name": "牛奶",
    "code": "milk",
    "capacity": 2000,
    "baseMaterialTypeId": 1,
    "description": "",
    "status": "1",
    "processMode": "mode",
    "imgUrl": "http://vlguxhv.tm/rouvkcvvq"
};
const data = reactive<PageData<posForm, itemQuery>>({
    form: { ...initForm },
    queryParams: {
        current: 1,
        size: 10,
        name: "",
        baseMaterialTypeId: null,
        status: "",
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
    const res = await materialList(queryParams.value);
    // loading.value = false;
    // tableData.value = res.rows;
    // total.value = res.total;
};

const loading = ref(false)
const tableData = ref<itemVo[]>([{
    id: "1",
    "name": "牛奶",
    "code": "milk",
    "capacity": 2000,
    "baseMaterialTypeId": 1,
    "baseMaterialTypeName": "牛奶",
    "description": "",
    "status": "1",
    "processMode": "mode",
    "imgUrl": "http://vlguxhv.tm/rouvkcvvq",
    updateTime: 1747202602,
    createTime: 1747202602,
}
])

const columnList = ref([
    { field: "name", title: t("products.名称") },
    { field: "code", title: t("products.码表") },
    { field: "baseMaterialTypeName", title: t("products.物料种类") },
    { field: "description", title: t("products.说明") },
    { field: "processMode", title: t("products.物料工艺") },
    { field: "capacity", title: t("products.包装") },
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
        "capacity": row.capacity,
        "baseMaterialTypeId": row.baseMaterialTypeId,
        "description": row.description,
        "status": row.status,
        "processMode": row.processMode,
        "imgUrl": row.imgUrl,
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
        "capacity": null,
        "baseMaterialTypeId": null,
        "description": "",
        "status": "0",
        "processMode": "",
        "imgUrl": "",
    }
    showAddOrEdit.value = true;
}

const handleDelete = async (row: itemVo) => {
    const [err] = await to(proxy?.$modal.confirm(t('是否确认删除名称为') + row.name + t('的数据项？')) as any);
    if (!err) {
        await delMaterial(row.id);
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
            form.value.id ? await updateMaterial(obj) : await addMaterial(obj);
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
