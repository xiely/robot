<template>
  <div class="p-2">
    <h3 class="edit-title">{{ topTitleArray[showFlag] }}</h3>
    <el-card shadow="hover">
      <div v-if="showFlag == 0">
        <el-descriptions title="申请单信息">
          <el-descriptions-item label="组织">墨笛上海</el-descriptions-item>
          <el-descriptions-item label="申请单编号">2108230004</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="必填信息">
            <el-descriptions-item>
              <div style="height: 330px; max-width: 600px">
                  <el-steps direction="vertical" :active="step">
                    <el-step  class="step-item" title="主体信息" description="请填写商家的营业执照/登记证书、经营者/法人的证件等信息" @click="handleStep(1)"/>
                    <el-step class="step-item" title="经营信息" description="请填写商家的经营业务信息、售卖商品/提供服务场景信息" @click="handleStep(2)"/>
                    <el-step class="step-item" title="结算规则" description="请填写商家的结算费率规则、特殊资质等信息" @click="handleStep(3)"/>
                    <el-step class="step-item" title="结算账户" description="请填写商家提现收款的银行账户信息" @click="handleStep(4)"/>
                    <el-step class="step-item" title="超级管理员" description="请填写商家的超级管理员信息， 超级管理员需在开户后进行签约，并接收日常重要管理信息和进行资金操作，请确定其为商户法定代表人或负责人" @click="handleStep(5)"/>
                  </el-steps>
              </div>
            </el-descriptions-item>
        </el-descriptions>
        <el-button @click="handleBack()">返回</el-button>

      </div>
      <div v-else >
        <component :is="currentComponent" @back="showFlag = 0"></component>

      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import applyStep1 from './apply-step1.vue';
import applyStep2 from './apply-step2.vue';
// 引入其他组件
import applyStep3 from './apply-step3.vue';
import applyStep4 from './apply-step4.vue';
import applyStep5 from './apply-step5.vue';

const { proxy } = getCurrentInstance();
const step = ref(5)
const showFlag = ref(0)
const topTitleArray = ref(["资料填写", "主体信息", "经营信息", "结算规则", "结算账户", "超级管理员"])
const handleBack = () => {
  router.push('/order/wechatPay');
}

// 定义 currentComponent
const currentComponent = computed(() => {
  switch (showFlag.value) {
    case 1:
      return applyStep1;
    case 2:
      return applyStep2;
    case 3:
      return applyStep3;
    case 4:
      return applyStep4;
    case 5:
      return applyStep5;
    default:
      return null;
  }
});


const handleStep = (flag: number) => {
  if (flag > step.value) {
    proxy.$modal.msgWarning("请先填写上一步信息")
    return;
  }
  showFlag.value = flag

}
</script>
<style lang="scss">
.edit-title {
  font-weight: bold;
  font-size: 20px;
  color: rgba(0, 0, 0, .85);
}

.step-item {
  cursor: pointer;
}

.tip-label {

  color: rgba(0, 0, 0, .45);
}

.form-tip {
  display: block;
  color: rgba(0, 0, 0, .45);
  font-size: 13px;

  p {
    line-height: 0.8;
  }
}

.button-link {
  position: relative;
  top: -3px;
}

.link {
  color: var(--el-color-primary);
  cursor: pointer;

  &:hover {
    color: var(--el-color-primary-light-5);
  }
}
</style>
