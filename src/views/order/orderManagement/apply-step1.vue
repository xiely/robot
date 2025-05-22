<template>
  <div class="p-2">
    <el-form ref="formRef" :model="applyForm" :rules="formRules" :label-width="200" label-position="left">
      <el-form-item prop="主体类型" label="主体类型">
         <el-select v-model="applyForm.主体类型" placeholder="请选择" clearable >
            <el-option v-for="item in subjectTypeList" :label="item.label" :value="item.value" >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
              >
                {{ item.explain }}
              </span>
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'">
        <template #label>
          <div class="tip-label">| 营业执照</div>
        </template>
        <span class="form-tip">请上传"营业执照"，需年检章齐全，当年注册除外</span>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'" prop="营业执照照片">
        <template #label>
          <div>营业执照照片
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="top-start"
              content="<div><div>1.请上传三证合一的主体证照彩色照片、彩色扫描件或加盖公章鲜章的复印件（暂不支持电子章）。个体工商户类型商户证照如为复印件，应加盖公章鲜章或有经营者的签字捺印。</div><div>2.若有水印或用途说明，仅限与申请微信支付业务相关水印（如微信支付认证）。</div><div>3.需正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。</div><div>4.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div></div>"
                  raw-content>
              <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        <div>
          <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          <div class="form-tip">1.请上传彩色照片 or 彩色扫描件 or 加盖公章鲜章的复印件，要求正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。<br/>
            2.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div>
          </div>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'">
        <template #label>
          <div class="tip-label">| 登记证书</div>
        </template>
        <span class="form-tip">请上传相关部门颁发的证书，如：事业单位法人证书、统一社会信用代码证书</span>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'" prop="登记证书照片">
        <template #label>
          <div>登记证书照片
          </div>
        </template>
        <div>
          <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          </div>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'"  prop="证书号" label="证书号">
        <el-input v-model="applyForm.证书号"></el-input>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'"  prop="注册号" label="注册号">
        <el-input v-model="applyForm.注册号"></el-input>
      </el-form-item>
      <el-form-item prop="商户名称" label="商户名称">
        <el-input v-model="applyForm.商户名称"></el-input>
        <div class="form-tip">
          若营业执照上商户名称为空或为“无”，请填写“个体户+经营者姓名”，如“个体户张三”
        </div>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0'" prop="经营者姓名" label="经营者姓名">
        <el-input v-model="applyForm.经营者姓名"></el-input>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '1' || applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'" prop="法定代表人姓名" label="法定代表人姓名">
        <el-input v-model="applyForm.法定代表人姓名"></el-input>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'" prop="注册地址" label="注册地址">
        <el-input v-model="applyForm.注册地址"></el-input>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '1'" prop="类型" label="类型">
        <div style="display: block;width: 100%;">
          <el-radio-group v-model="applyForm.类型">
            <el-radio value="1" >已三证合一</el-radio>
            <el-radio value="2">未三证合一</el-radio>
          </el-radio-group>
        </div>
        <div class="form-tip">
            若营业执照注册号为18位统一社会信用代码，请选择“已三证合一”，否则请选择“未三证合一”
        </div>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'"  prop="营业执照注册地址" label="营业执照注册地址">
        <el-input v-model="applyForm.营业执照注册地址"></el-input>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'" prop="执照有效期类型" label="执照有效期类型">
        <el-radio-group v-model="applyForm.执照有效期类型">
          <el-radio value="1" >定期</el-radio>
          <el-radio value="2">长期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'" prop="有效期类型" label="有效期类型">
        <el-radio-group v-model="applyForm.有效期类型">
          <el-radio value="1" >定期</el-radio>
          <el-radio value="2">长期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'" prop="证书生效日期" label="证书生效日期">
        <el-date-picker
            v-model="applyForm.证书生效日期"
            value-format="YYYY-MM-DD"
            type="date"
          ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="(applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4') && applyForm.有效期类型 == '1'" prop="证书失效日期" label="证书失效日期">
        <el-date-picker
            v-model="applyForm.证书失效日期"
            value-format="YYYY-MM-DD"
            type="date"
          ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '3'">
        <template #label>
          <div class="tip-label">身份验证</div>
        </template>
        <span class="form-tip">为确保你已获得贵单位的开户授权，需进行身份验证</span>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '3'" prop="验证方式" label="验证方式">
        <el-radio-group v-model="applyForm.验证方式" style="width: 100%;">
          <el-radio value="1" >汇款验证</el-radio>
          <el-radio value="2">单位证明函</el-radio>
        </el-radio-group>
        <div class="form-tip">审核通过后，需用开户名称与结算账户名称一致的银行账户，汇款指定金额（1元以下）至指定银行账户 查看账户验证指引<el-button type="primary" link><a class="button-link" href="https://kf.qq.com/faq/200703V3If6J200703bYrQBR.html" target="_blank">查看账户验证指引</a></el-button></div>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'"  prop="执照生效日期" label="执照生效日期">
        <el-date-picker
            v-model="applyForm.执照生效日期"
            value-format="YYYY-MM-DD"
            type="date"
          ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0' || applyForm.主体类型 == '1'" prop="执照失效日期" label="执照失效日期">
        <el-date-picker
            v-model="applyForm.执照失效日期"
            value-format="YYYY-MM-DD"
            type="date"
          ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '0'">
        <template #label>
          <div class="tip-label">| 经营者证件</div>
        </template>
        <span class="form-tip">请上传经营者的证件信息</span>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '1' || applyForm.主体类型 == '2' || applyForm.主体类型 == '3' || applyForm.主体类型 == '4'">
        <template #label>
          <div class="tip-label">| 法定代表人证件</div>
        </template>
        <span class="form-tip">请上传法定代表人的证件信息</span>
      </el-form-item>
      <el-form-item prop="证件类型" label="证件类型">
         <el-select v-model="applyForm.证件类型" placeholder="请选择" clearable >
            <el-option v-for="item in cardTypeList" :label="item.label" :value="item.value" >
              <span style="float: left">{{ item.label }}</span>
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="身份证人像面照片">
        <template #label>
          <div >身份证人像面照片
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="top-start"
              content="<div><div>1.请上传彩色照片、彩色扫描件或加盖公章鲜章的复印件（暂不支持电子章）。</div><div>2.若有水印或用途说明，仅限与申请微信支付业务相关水印（如微信支付认证）。</div><div>3.需正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。</div><div>4.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div><div>5.暂不支持电子版身份证件及临时身份证。</div></div>"
                  raw-content>
              <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        <div>
          <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          <div class="form-tip">1.请上传彩色照片 or 彩色扫描件 or 加盖公章鲜章的复印件，要求正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。<br/>
            2.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div>
          </div>
      </el-form-item>
      <el-form-item prop="身份证国徽面照片">
        <template #label>
          <div >身份证国徽面照片
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="top-start"
              content="<div><div>1.请上传彩色照片、彩色扫描件或加盖公章鲜章的复印件（暂不支持电子章）。</div><div>2.若有水印或用途说明，仅限与申请微信支付业务相关水印（如微信支付认证）。</div><div>3.需正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。</div><div>4.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div><div>5.暂不支持电子版身份证件及临时身份证。</div></div>"
                  raw-content>
              <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        <div>
          <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          <div class="form-tip">1.请上传彩色照片 or 彩色扫描件 or 加盖公章鲜章的复印件，要求正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。<br/>
            2.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div>
          </div>
      </el-form-item>
      <el-form-item prop="身份证姓名" label="身份证姓名">
        <el-input v-model="applyForm.身份证姓名"></el-input>
      </el-form-item>
      <el-form-item prop="身份证件号码" label="身份证件号码">
        <el-input v-model="applyForm.身份证件号码"></el-input>
      </el-form-item>
      <el-form-item prop="身份证居住地址" label="身份证居住地址">
        <el-input v-model="applyForm.身份证居住地址"></el-input>
      </el-form-item>
      <el-form-item prop="证件有效期类型" label="证件有效期类型">
        <el-radio-group v-model="applyForm.证件有效期类型">
          <el-radio value="1" >定期</el-radio>
          <el-radio value="2">长期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="证件生效日期" label="证件生效日期">
        <el-date-picker
            v-model="applyForm.证件生效日期"
            value-format="YYYY-MM-DD"
            type="date"
          ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="applyForm.证件有效期类型 == '1'" prop="证件失效日期" label="证件失效日期">
        <el-date-picker
            v-model="applyForm.证件失效日期"
            value-format="YYYY-MM-DD"
            type="date"
          ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="applyForm.主体类型 == '1'" prop="是否为受益所有人" label="是否为受益所有人">
        <el-radio-group v-model="applyForm.是否为受益所有人">
          <el-radio value="1" >是</el-radio>
          <el-radio value="2">否，非经营者</el-radio>
        </el-radio-group>
        <el-tooltip
              class="box-item"
              effect="dark"
              placement="top-start"
              content="<div><div>根据国家相关法律法规，您需要提供公司受益所有人信息。受益所有人需符合至少以下条件之一：</div><div>1. 直接或者间接拥有超过25%公司股权或者表决权的自然人；</div><div>2. 通过人事、财务等其他方式对公司进行控制的自然人；</div><div>3. 公司的高级管理人员，包括公司的经理、副经理、财务负责人，上市公司董事会秘书和公司章程规定的其他人员</div></div>"
                  raw-content>
              <el-icon style="margin-left: 6px"><QuestionFilled /></el-icon>
            </el-tooltip>
      </el-form-item>
    </el-form>
    <el-button @click="handleBack()">返回</el-button>
    <el-button type="primary" @click="submitForm">下一步</el-button>
    </div>
</template>
<script lang="ts" setup>
import { applyData1 } from '@/api/order/apply/types';
import { useI18n } from 'vue-i18n';

const emits = defineEmits(["back"])
const formRef = ref<ElFormInstance>();
const { t } = useI18n();
const applyForm = ref<applyData1>({
  "主体类型": "",
  "营业执照照片": "",
  "注册号": "",
  "商户名称": "",
  "经营者姓名": "",
  "营业执照注册地址": "",
  "执照有效期类型": "",
  "执照生效日期": "",
  "执照失效日期": "",
  "证件类型": "",
  "身份证人像面照片": "",
  "身份证国徽面照片": "",
  "身份证姓名": "",
  "身份证件号码": "",
  "身份证居住地址": "",
  "证件有效期类型": "",
  "证件生效日期": "",
  "证件失效日期": "",
  "法定代表人姓名": "",
  "类型": "",
  "登记证书照片": "",
  "证书号": "",
  "注册地址": "",
  "有效期类型": "",
  "验证方式": "",
  "是否为受益所有人": "",
  "证书生效日期": "",
  "证书失效日期": "",
} as applyData1);

const formRules: ElFormRules = {
  "主体类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "营业执照照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
  "登记证书照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
  "注册号": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "证书号": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "商户名称": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "经营者姓名": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "营业执照注册地址": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "注册地址": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "有效期类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "执照有效期类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "执照生效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "执照失效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "证书生效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "证书失效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "证件类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "身份证人像面照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
  "身份证国徽面照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
  "身份证姓名": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "身份证件号码": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "身份证居住地址": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "证件有效期类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "证件生效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "证件失效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "法定代表人姓名": [{ required: true, trigger: 'blur', message: t('请输入') }],
  "类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
  "验证方式": [{ required: true, trigger: 'blur', message: t('请选择') }],
};
const subjectTypeList = [
  { label: "个体工商户", explain: "营业执照上的主体类型一般为个体户、个体工商户、个体经营", value: 0 },
  { label: "企业", explain: "营业执照上的主体类型一般为有限公司、有限责任公司", value: 1 },
  { label: "政府机关", explain: "包括各级、各类政府机关，如机关党委、税务、民政、人社、工商、商务、市监等", value: 2 },
  { label: "事业单位", explain: "包括国内各类事业单位，如：医疗、教育、学校等单位", value: 3 },
  { label: "社会组织", explain: "包括社会团体、民办非企业、基金会、基层群众性自治组织、农村集体经济组织等组织", value: 4 },
]
const cardTypeList = [
  { label: "中国大陆居民-身份证", value: "中国大陆居民-身份证" },
  { label: "中国香港居民-来往内地通行证", value: "中国香港居民-来往内地通行证" },
  { label: "中国台湾居民-来往大陆通行证", value: "中国台湾居民-来往大陆通行证" },
  { label: "中国澳门居民-来往内地通行证", value: "中国澳门居民-来往内地通行证" },
  { label: "中国港澳居民-港澳居民证", value: "中国港澳居民-港澳居民证" },
  { label: "中国台湾居民-台湾居民证", value: "中国台湾居民-台湾居民证" },
  { label: "其他国家或地区居民-护照", value: "其他国家或地区居民-护照" },
  { label: "其他国家或地区居民-外国人居留证", value: "其他国家或地区居民-外国人居留证" },
]

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
<style lang="scss"></style>
