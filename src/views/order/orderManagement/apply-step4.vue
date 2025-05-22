<template>
    <div class="p-2">
      <el-form ref="formRef" :model="applyForm" :rules="formRules" :label-width="200" label-position="left">
        <el-form-item  prop="账户类型" label="账户类型">
          <div style="display: block;width: 100%;">
            <el-radio-group v-model="applyForm.账户类型">
              <el-radio value="1" >对公银行账户</el-radio>
              <el-radio value="2">个人银行卡账户</el-radio>
            </el-radio-group>
          </div>
          <div class="form-tip">
              请务必填写开户名称与企业资质一致的银行账户
          </div>
        </el-form-item>
        <el-form-item prop="开户名称" label="开户名称">
          <el-input v-model="applyForm.开户名称"></el-input>
        </el-form-item>
        <el-form-item prop="开户行省市" label="开户行省市">
          <el-input v-model="applyForm.开户行省市"></el-input>
        </el-form-item>
        <el-form-item prop="开户支行" label="开户支行">
          <el-input v-model="applyForm.开户支行"></el-input>
        </el-form-item>
        <el-form-item prop="银行账号" label="银行账号">
          <el-input v-model="applyForm.银行账号"></el-input>
          <span class="form-tip"><a class="link" href="https://kf.qq.com/faq/140225MveaUz150819mYFjuE.html" target="_blank">常用银行账号位数参考</a></span>
        </el-form-item>
      </el-form>
      <el-button @click="handleBack()">返回</el-button>
      <el-button type="primary" @click="submitForm">下一步</el-button>
    </div>
</template>
<script lang="ts" setup>
import { applyData4 } from '@/api/order/apply/types';
import { useI18n } from 'vue-i18n';

const emits = defineEmits(["back"])
const formRef = ref<ElFormInstance>();
const { t } = useI18n();
const applyForm = ref<applyData4>({
    "账户类型": "",
    "开户名称": "",
    "开户行省市": "",
    "开户支行": "",
    "银行账号": "",
} as applyData4);

const formRules: ElFormRules = {
    "账户类型": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "开户名称": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "开户行省市": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "开户支行": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "银行账号": [{ required: true, trigger: 'blur', message: t('请输入') }],
}

const handleBack = () => {
    emits("back")
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
</script>
