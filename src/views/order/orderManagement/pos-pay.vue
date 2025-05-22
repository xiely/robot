<template>
  <div class="p-2">
    <organize-select></organize-select>
     <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true>
            <el-form-item label="组织名称" prop="组织名称">
              <el-input v-model="queryParams.组织名称"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>
    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col><el-button icon="Plus" type="primary" @click="handleAdd()">新建</el-button></el-col>
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
            <vxe-column v-if="item.field == '组织名称'"  :field="item.field" :title="item.title" show-overflow  :width="item?.width as number">
              <template #default="{ row }">
              {{ row.组织名称.join('/') }}
            </template>
            </vxe-column>
            <vxe-column v-else-if="item.field == '创建时间' || item.field == '更新时间'"  :field="item.field" :title="item.title" show-overflow  :width="item.width as number">
              <template #default="{ row }">
              {{ proxy.parseTime(row[item.field]) }}
            </template>
            </vxe-column>
            <vxe-column  v-else :field="item.field" :title="item.title" show-overflow  :width="item?.width as number">
            <template #default="{ row }">
              {{ row[item.field] || '-' }}
            </template>
            </vxe-column>
          </template>
          <vxe-column title="操作" show-overflow >
              <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="handleButton(row)"
              >
                编辑
              </el-button>
            </template>
          </vxe-column>
      </vxe-table>
      <pagination
        v-show="total > 0"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        :total="total"
        @pagination="getList"
      />
      <el-drawer v-model="showAddOrEdit"  direction="rtl" size="600px" close-on-click-modal>
        <template #header><div>{{ isEdit ? '编辑' : '新建' }}</div></template>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="70">
          <el-form-item prop="组织名称" label="组织名称">
            <el-tree-select
                v-model="form.组织名称"
                lazy
                :disabled="isEdit"
                :load="load"
                :props="props"
                :cache-data="cacheData"
                :check-strictly=true
              />
          </el-form-item>
          <el-form-item prop="名称" label="名称">
            <el-input v-model="form.名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="渠道" label="渠道">
            <el-select v-model="form.渠道" placeholder="请选择" clearable >
                <el-option v-for="item in subjectTypeList" :label="item.label" :value="item.value" >
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="商户号" label="商户号">
            <el-input v-model="form.商户号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="终端号" label="终端号">
            <el-input v-model="form.终端号" clearable></el-input>
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
import { VxeToolbarInstance, VxeTableInstance } from 'vxe-table'
import organizeSelect from '@/views/organize-select.vue';
import type { VxeComponentSizeType } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import { ElMessageBoxOptions } from 'element-plus/es/components/message-box/src/message-box.type.mjs';
import { ref, onMounted } from 'vue'
import { posForm, DeviceQuery } from '@/api/order/pos-pay/types';

const { t } = useI18n();
const tableRef = ref<VxeTableInstance>()
const download = ref(false);
const total = ref(10);
const size = ref<VxeComponentSizeType>("medium");
const queryFormRef = ref<ElFormInstance>();
// const title = ref("");
const isEdit = ref(false);
const initForm: posForm = {
    组织名称: ["aa"],
    渠道: "",
    名称: "",
    商户号: null,
    终端号: null,
};
const data = reactive<PageData<posForm, DeviceQuery>>({
    form: { ...initForm },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        组织名称: '',
    },
    rules: {
        名称: [{ required: true, trigger: 'blur', message: t('请输入') }],
        渠道: [{ required: true, trigger: 'blur', message: t('请选择') }],
        商户号: [{ required: true, trigger: 'blur', message: t('请输入') }],
        终端号: [{ required: true, trigger: 'blur', message: t('请输入') }],

    }
});
const subjectTypeList = [
    { label: "慧银POS机|USD", value: "慧银POS机|USD" }
]
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const showSearch = ref(true);
const { form, queryParams, rules } = toRefs(data);
const showAddOrEdit = ref(false)
const formRef = ref();

const cacheData = [{ value: 5, label: '节点5' }]
const props = {
    label: 'label',
    children: 'children',
    isLeaf: 'isLeaf',
}
let id = 0;

const load = (node, resolve) => {
    if (node.isLeaf) return resolve([])
    setTimeout(() => {
        resolve([
            {
                value: ++id,
                label: `节点${id}`,
            },
            {
                value: ++id,
                label: `节点${id}`,
                isLeaf: true,
            },
        ])
    }, 400)
}

/**
 * 搜索按钮操作
 */
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
};

/** 重置 */
const resetQuery = () => {
    queryFormRef.value?.resetFields();
    handleQuery();
};

/**
 * 查询列表
 */
const getList = () => {
    loading.value = true;
};

interface RowVO1 {
    id: number
    组织名称: string[];
    申请单编号: string;
    渠道: string;
    名称: string;
    绑定组织数量: number;
    更新时间: number;
    创建时间: number;
}
const loading = ref(false)
const tableData = ref<RowVO1[]>([{
    id: 10,
    组织名称: [
        "xbot",
        "直营",
        "工厂设备"
    ],
    申请单编号: "1303000000003",
    渠道: "慧银POS机|USD",
    名称: "慧银POS收款",
    绑定组织数量: null,
    更新时间: 1747202602,
    创建时间: 1747202602,
}
])



const columnList = ref([
    { field: "组织名称", title: "组织名称" },
    { field: "申请单编号", title: "申请单编号" },
    { field: "渠道", title: "渠道" },
    { field: "名称", title: "名称" },
    { field: "绑定组织数量", title: "绑定组织数量", visible: true },
    { field: "更新时间", title: "更新时间", width: 160 },
    { field: "创建时间", title: "创建时间", width: 160 },
])

const handleButton = async (row: any) => {
    console.log(row, "ITTTTTTTTT")
    isEdit.value = true;
    showAddOrEdit.value = true;
}

const handleAdd = () => {
    isEdit.value = false;
    formRef.value?.resetFields();
    showAddOrEdit.value = true;
}

const submitForm = () => {
    formRef.value.validate(async (valid: boolean, fields: any) => {
        if (valid) {

        }
        else {
            console.log('error submit!', fields);
        }
    });
}


onMounted(() => {
})
</script>
<style lang="scss">
.detail-item {
    margin-bottom: 10px;
}
</style>
