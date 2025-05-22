<template>
  <div class="p-2">
    <organize-select></organize-select>
     <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true>
            <el-form-item label="商户名称" prop="roleKey">
              <el-input v-model="queryParams.roleKey" placeholder="请输入" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="签约状态" prop="deviceName">
              <el-select v-model="queryParams.deviceName" placeholder="请选择" clearable style="width: 240px">
                <el-option v-for="item in deviceList"  :label="item.label" :value="item.value" />
              </el-select>
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
          <!-- <div style="vertical-align: middle;margin-top: -8px;">
          </div> -->
          <el-col :span="24" style="text-align: right;">
            <el-button icon="Plus" type="primary" @click="handleAdd()">新建</el-button>
          </el-col>
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
            <vxe-column v-if="item.field == 'parentNameList'"  :field="item.field" :title="item.title" show-overflow  :width="item?.width as number">
              <template #default="{ row }">
              {{ row.parentNameList.join('/') }}
            </template>
            </vxe-column>
            <vxe-column v-else-if="item.field == 'makeEndTime'"  :field="item.field" :title="item.title" show-overflow  :width="item.width as number">
              <template #default="{ row }">
              {{ proxy.parseTime(row.makeEndTime) }}
            </template>
            </vxe-column>
            <vxe-column  v-else :field="item.field" :title="item.title" show-overflow  :width="item?.width as number"></vxe-column>
          </template>
          <vxe-column title="操作" show-overflow width="140">
              <template #default="{ row }">
              <el-button type="primary" link>编辑</el-button>
              <el-button type="primary" link>撤销申请</el-button>
              <!-- <el-button type="primary" link>查看申请</el-button> -->
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
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { VxeToolbarInstance, VxeTableInstance } from 'vxe-table'
import organizeSelect from '@/views/organize-select.vue';
import type { VxeComponentSizeType } from 'vxe-table';
import { ElMessageBoxOptions } from 'element-plus/es/components/message-box/src/message-box.type.mjs';
import { ref, onMounted } from 'vue'
import { DeviceForm, DeviceQuery } from '@/api/order/order/types';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';

const userStore = useUserStore();

const tableRef = ref<VxeTableInstance>()
const deviceList = [{ label: "直营", value: "直营" }, { label: "无锡云机第一台", value: "无锡云机第一台" }]
const size = ref<VxeComponentSizeType>("medium");
const total = ref(10)
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const queryFormRef = ref<ElFormInstance>();
const initForm: DeviceForm = {
  roleId: undefined,
  roleSort: 1,
  status: '0',
  deviceName: '',
  roleKey: '',
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: '',
  dataScope: '1',
  menuIds: [],
  deptIds: []
};
const data = reactive<PageData<DeviceForm, DeviceQuery>>({
  form: { ...initForm },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    deviceName: '',
    roleKey: '',
    status: ''
  },
  rules: {
    deviceName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
    roleKey: [{ required: true, message: '权限字符不能为空', trigger: 'blur' }],
    roleSort: [{ required: true, message: '角色顺序不能为空', trigger: 'blur' }]
  }
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const showSearch = ref(true);
const { form, queryParams, rules } = toRefs(data);
const showDetail = ref(false)

/**
 * 搜索按钮操作
 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置 */
const resetQuery = () => {
  dateRange.value = ['', ''];
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
  parentNameList: string[]
  equipmentSn: string
  orderCode: string
  tradeName: string
  price: number
  discount: number
  payment: number
  receipts: null
  refunds: number
  makeEndTime: number
}
const loading = ref(false)
const tableData = ref<RowVO1[]>([{
  id: 10,
  parentNameList: [
    "xbot",
    "直营",
    "工厂设备"
  ],
  equipmentSn: "1303000000003",
  orderCode: "20250514140322-561",
  tradeName: "热牛奶",
  price: 0.0,
  discount: 0.0,
  payment: null,
  receipts: null,
  refunds: null,
  makeEndTime: 1747202602,
},
{
  id: 10,
  parentNameList: [
    "xbot",
    "直营",
    "工厂设备"
  ],
  equipmentSn: "1303000000003",
  orderCode: "20250514140322-561",
  tradeName: "热牛奶",
  price: 0.0,
  discount: 0.0,
  payment: null,
  receipts: null,
  refunds: null,
  makeEndTime: 1747202602,
},
{
  id: 10,
  parentNameList: [
    "xbot",
    "直营",
    "工厂设备"
  ],
  equipmentSn: "1303000000003",
  orderCode: "20250514140322-561",
  tradeName: "热牛奶",
  price: 0.0,
  discount: 0.0,
  payment: null,
  receipts: null,
  refunds: null,
  makeEndTime: 1747202602,
},
{
  id: 10,
  parentNameList: [
    "xbot",
    "直营",
    "工厂设备"
  ],
  equipmentSn: "1303000000003",
  orderCode: "20250514140322-561",
  tradeName: "热牛奶",
  price: 0.0,
  discount: 0.0,
  payment: null,
  receipts: null,
  refunds: null,
  makeEndTime: 1747202602,
},
{
  id: 10,
  parentNameList: [
    "xbot",
    "直营",
    "工厂设备"
  ],
  equipmentSn: "1303000000003",
  orderCode: "20250514140322-561",
  tradeName: "热牛奶",
  price: 0.0,
  discount: 0.0,
  payment: null,
  receipts: null,
  refunds: null,
  makeEndTime: 1747202602,
}
])

const columnList = ref([
  { field: "parentNameList", title: "组织名称", visible: true, width: 180 },
  { field: "equipmentSn", title: "SN", visible: true, width: 120 },
  { field: "orderCode", title: "商户单号", visible: true, width: 160 },
  { field: "子单号", title: "子单号", visible: true, width: 120 },
  { field: "tradeName", title: "餐品名称", visible: true, width: 120 },
  { field: "price", title: "售价", visible: true },
  { field: "抵扣", title: "抵扣", visible: true },
  { field: "付款", title: "付款", visible: true },
  { field: "实收", title: "实收", visible: true },
  { field: "退款金额", title: "退款金额", visible: true },
  { field: "来源", title: "来源", visible: true },
  { field: "币种", title: "币种", visible: true },
  { field: "订单状态", title: "订单状态", visible: true },
  { field: "制作状态", title: "制作状态", visible: true },
  { field: "支付状态", title: "支付状态", visible: true },
  { field: "makeEndTime", title: "创建时间", visible: true, width: 160 },
])


// 新建申请
const handleAdd = async () => {
  router.push('/order/apply');
  return;
  await ElMessageBox.confirm(`<h3>您确认为组织(${userStore.organize})创建新的商户吗？？</h3>
    `,
    '提示',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
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
