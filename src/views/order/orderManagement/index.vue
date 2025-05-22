<template>
  <div class="p-2">
    <organize-select></organize-select>
     <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline=true>
            <el-form-item label="设备" prop="deviceName">
              <el-select v-model="queryParams.deviceName"  clearable style="width: 240px">
                <el-option v-for="item in deviceList"  :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
              <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="SN" prop="roleKey">
              <el-input v-model="queryParams.roleKey"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="币种" prop="roleKey">
              <el-input v-model="queryParams.roleKey"  clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="种类" prop="roleKey">
              <el-select v-model="queryParams.roleKey"  clearable filterable allow-create style="width: 240px">
                <el-option v-for="item in deviceList"  :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态" prop="roleKey">
              <el-select v-model="queryParams.roleKey"  clearable filterable allow-create style="width: 240px">
                <el-option v-for="item in deviceList"  :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="制作状态" prop="roleKey">
              <el-select v-model="queryParams.roleKey"  clearable filterable allow-create style="width: 240px">
                <el-option v-for="item in deviceList"  :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="支付状态" prop="roleKey">
              <el-select v-model="queryParams.roleKey"  clearable filterable allow-create style="width: 240px">
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
          <right-toolbar v-model:show-search="showSearch" @query-table="getList" @download="handleDownload" v-model:size="size" :download="download"></right-toolbar>
          <div style="vertical-align: middle;margin-top: -8px;">
            <vxe-toolbar ref="toolbarRef" custom ></vxe-toolbar>
          </div>
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
          <vxe-column type="seq" width="70"></vxe-column>
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
          <vxe-column title="操作" show-overflow width="290">
              <template #default="{ row }">
              <el-button
                v-for="(item) of buttonList"
                type="primary"
                link
                @click="handleButton(item, row)"
              >
                {{ item }}
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
      <el-drawer v-model="showDetail"  direction="rtl" size="800px" close-on-click-modal>
        <template #header><div>订单详情</div></template>
        <el-descriptions class="detail-item" title="订单信息" :column="2">
          <el-descriptions-item label="商户单号:">20250515113957-593</el-descriptions-item>
          <el-descriptions-item label="子单号:">593</el-descriptions-item>
          <el-descriptions-item label="餐品名称:">热牛奶</el-descriptions-item>
          <el-descriptions-item label="来源:"> PAD</el-descriptions-item>
          <el-descriptions-item label="制作状态:"> 制作中 </el-descriptions-item>
          <el-descriptions-item label="外部编号:">热牛奶</el-descriptions-item>
          <el-descriptions-item label="更新时间:">{{ proxy.parseTime(Date.now()) }}</el-descriptions-item>
          <el-descriptions-item label="创建时间:">{{ proxy.parseTime(Date.now()) }}</el-descriptions-item>
          <el-descriptions-item label="制作开始时间:">{{ proxy.parseTime(Date.now()) }}</el-descriptions-item>
          <el-descriptions-item label="制作结束时间:">{{ proxy.parseTime(Date.now()) }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="detail-item" title="支付信息" :column="3">
          <el-descriptions-item label="售价:">20250515113957-593</el-descriptions-item>
          <el-descriptions-item label="应付金额:">593</el-descriptions-item>
          <el-descriptions-item label="应收金额:">热牛奶</el-descriptions-item>
          <el-descriptions-item label="付款:">热牛奶</el-descriptions-item>
          <el-descriptions-item label="实收:">热牛奶</el-descriptions-item>
          <el-descriptions-item label="支付方式:">热牛奶</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="detail-item" title="退款信息" :column="3">
          <el-descriptions-item label="退款状态:">20250515113957-593</el-descriptions-item>
          <el-descriptions-item label="退款:">593</el-descriptions-item>
          <el-descriptions-item label="退款开始时间:">{{ proxy.parseTime(Date.now()) }}</el-descriptions-item>
          <el-descriptions-item label="退款结束时间:">{{ proxy.parseTime(Date.now()) }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="detail-item" title="其他信息" :column="3">
          <el-descriptions-item label="备注:">20250515113957-593</el-descriptions-item>
        </el-descriptions>
        <template #footer>
          <el-button type="primary" @click="showDetail = false">关闭</el-button>
        </template>
      </el-drawer>
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

const download = ref(true)
const toolbarRef = ref<VxeToolbarInstance>()
const tableRef = ref<VxeTableInstance>()
const buttonList = ["忽略", "退款", "暂停", "重做", "备注", "详情"];
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

const handleButton = async (item: string, row?: any) => {
  console.log(item, row, "ITTTTTTTTT")
  if (item == "详情") {
    showDetail.value = true;
  }
  else if (item == "忽略") {
    await ElMessageBox.confirm(`<h3>您确认忽略该订单吗？</h3>
    <div>设备名称:${row.orderCode}</div>
    <div>餐品名称:${row.orderCode}</div>
    <div>商户单号:${row.orderCode}</div>`,
      '提示',
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
  }
  else if (item == "重做") {
    await ElMessageBox.confirm(`<h3>您确认重做该订单吗？</h3>
    <div>设备名称:${row.orderCode}</div>
    <div>餐品名称:${row.orderCode}</div>
    <div>商户单号:${row.orderCode}</div>`,
      '提示',
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
  }
  else if (item == "备注") {
    await ElMessageBox.prompt(`<h4>餐品名称:${row.orderCode}</h4>
    <h5>实收：</h5>`,
      '请输入备注信息',
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      });
  }

}

// 下载
const handleDownload = () => {
  proxy?.download(
    'system/client/export',
    {
      ...queryParams.value
    },
    `client_${new Date().getTime()}.xlsx`
  );

}

onMounted(() => {
  const $table = tableRef.value
  const $toolbar = toolbarRef.value
  if ($table && $toolbar) {
    $table.connect($toolbar)
  }
})
</script>
<style lang="scss">
.detail-item {
  margin-bottom: 10px;
}
</style>
