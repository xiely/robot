<template>
    <div class="p-2">
      <el-form ref="formRef" :model="applyForm" :rules="formRules" :label-width="200" label-position="left">
        <el-form-item >
        <template #label>
          <div>超级管理员信息</div>
        </template>
        <span class="form-tip">超级管理员将接收开户信息及完成签约，并可进行商户号的日常重要管理及资金操作。请确定超级管理员为商户法定代表人或经办人再进行操作。</span>
      </el-form-item>
        <el-form-item  prop="超管身份" label="超管身份">
          <div style="display: block;width: 100%;">
            <el-radio-group v-model="applyForm.超管身份">
              <el-radio value="1" >法定代表人/经营者
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    placement="bottom">
                    <template #content>
                      若超管为法定代表人/经营者，则该商户入驻流程为：提交申请 - 平台审核 - 超管签约 - 完成入驻
                    </template>
                    <el-icon style="margin-left: 6px;position: relative;top:4px"><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-radio>
              <el-radio value="2">经办人
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    placement="bottom">
                    <template #content>
                      若超管为经办人，则该商户入驻流程为：提交申请 - 平台审核 -账户验证- 超管签约 - 完成入驻
                    </template>
                    <el-icon style="margin-left: 6px;position: relative;top:4px"><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item v-if="applyForm.超管身份 == '1'" prop="超管姓名" label="超管姓名">
          <el-input v-model="applyForm.超管姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="applyForm.超管身份 == '1'" prop="超管资料类型" label="超管资料类型">
          <div style="display: block;width: 100%;">
            <el-radio-group v-model="applyForm.超管资料类型">
              <el-radio value="1" >证件号码
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item v-if="applyForm.超管身份 == '2'" prop="证件类型" label="证件类型">
          <el-select v-model="applyForm.证件类型" clearable>
            <el-option v-for="item in cardTypeList" :label="item.label" :value="item.value" >
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="applyForm.超管身份 == '2' && applyForm.证件类型 !== '其他国家或地区居民-护照'" prop="身份证人像面照片">
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
        <el-form-item v-if="applyForm.超管身份 == '2' && applyForm.证件类型 !== '其他国家或地区居民-护照'" prop="身份证国徽面照片">
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
        <el-form-item v-if="applyForm.超管身份 == '2' && applyForm.证件类型 == '其他国家或地区居民-护照'" prop="证件照片" label="证件照片">
          <div>
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
            <div class="form-tip">1.请上传彩色照片 or 彩色扫描件 or 加盖公章鲜章的复印件，要求正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。<br/>
              2.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div>
            </div>
        </el-form-item>
        <el-form-item v-if="applyForm.超管身份 == '2' && applyForm.证件类型 == '其他国家或地区居民-护照'" prop="证件姓名" label="证件姓名">
          <el-input v-model="applyForm.证件姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="applyForm.超管身份 == '1'" prop="证件号码" label="证件号码">
          <el-input v-model="applyForm.证件号码"></el-input>
          <span class="form-tip">请填写超级管理员的证件号码，可传身份证、来往内地通行证、来往大陆通行证、护照等证件号码</span>
        </el-form-item>
        <el-form-item v-else-if="applyForm.超管身份 == '2'" prop="证件号码" label="证件号码">
          <el-input v-model="applyForm.证件号码"></el-input>
        </el-form-item>
        <el-form-item prop="持证人姓名" label="持证人姓名">
          <el-input v-model="applyForm.持证人姓名"></el-input>
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
      <el-form-item  prop="业务办理授权函">
        <template #label>
          <div>业务办理授权函
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="top-start"
              content="<div><div>超管非法定代表人时，请参照下图打印并上传授权函：</div><div>1、 扫描件或照片大小不得超过2M，所有材料均需清晰可见，不支持截图、翻拍、镜像照片；</div><div>2、 授权函的信息全部需打印，除经营者签字外，其余不支持手写商户信息；</div><div>3、 右下角单位名称和盖章日期请勿留空；</div><div>4、 商户均应当在“单位（盖章）”处加盖主体公章鲜章，个体户应由经营者本人手写正楷签字并加盖手印。如个体户未刻制公章的，则以第5条规则为准；</div><div>5、个体户未刻制公章的，应在“经营者（签字捺印）”处，说明“无公章”并由经营者本人手写正楷签字及加盖手印；</div><div>6、 业务办理授权函盖章有效期需为90天内。</div></div>"
                  raw-content>
              <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        <div>
          <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          <div class="form-tip"><div>1. 超级管理员非法定代表人/负责人时，需要提供业务办理授权函</div><div>2. 请打印并上传加盖公章的业务办理授权函扫描件（<a class="link" href="https://kf.qq.com/faq/220509Y3Yvym220509fQvYR7.html" target="_blank">下载模板</a>），图片要求2M以内。</div></div>
          </div>
      </el-form-item>
        <el-form-item prop="手机号码" label="手机号码">
          <el-input v-model="applyForm.手机号码">
            <template #prepend>
              <span style="color:black">+86</span>
            </template>
          </el-input>
          <span class="form-tip"><p>用于接收微信支付的重要管理信息及日常操作验证码，超管签约时可自助修改手机号，并进行短信验证<a class="link" href="https://kf.qq.com/faq/200703rEFN3U200703zeaeQN.html" target="_blank">超管修改手机号指引</a></p></span>
        </el-form-item>
        <el-form-item prop="邮箱" label="邮箱">
          <el-input v-model="applyForm.邮箱"></el-input>
          <span class="form-tip">用于接收微信支付的开户邮件及日常业务通知</span>
        </el-form-item>
      </el-form>
      <el-button @click="handleBack()">返回</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
</template>
<script lang="ts" setup>
import { applyData5 } from '@/api/order/apply/types';
import { useI18n } from 'vue-i18n';

const emits = defineEmits(["back"])
const formRef = ref<ElFormInstance>();
const { t } = useI18n();
const applyForm = ref<applyData5>({
    "超管身份": "",
    "超管姓名": "",
    "超管资料类型": "",
    "证件号码": "",
    "手机号码": "",
    "邮箱": "",
    "证件类型": "",
    "证件照片": [""],
    "证件姓名": "",
    "身份证人像面照片": "",
    "身份证国徽面照片": "",
    "持证人姓名": "",
    "证件有效期类型": "",
    "证件生效日期": "",
    "证件失效日期": "",
    "业务办理授权函": [""],
} as applyData5);
const checkCardValid = (rule: any, value: string, callback: any) => {
    if (applyForm.value.超管身份 == '2' && applyForm.value.证件类型 !== '其他国家或地区居民-护照') {
        let reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dX]$/;
        let flag = reg.test(value)
        console.log(flag, "FFFFFFFFFFF")
        if (!flag) {
            callback(new Error('请输入正确的身份证号码'));
        }
    } else {
        callback();
    }
};
const formRules: ElFormRules = {
    "超管身份": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "超管姓名": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "超管资料类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "证件类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "证件照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
    "身份证人像面照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
    "身份证国徽面照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
    "证件号码": [{ required: true, trigger: 'blur', message: t('请输入') }, {
        required: true,
        validator: checkCardValid,
        trigger: 'blur'
    }],

    "证件姓名": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "手机号码": [{ required: true, trigger: 'blur', message: t('请输入') }, {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur'
    }],
    "邮箱": [{ required: true, trigger: 'blur', message: t('请输入') }, {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: '请输入正确的邮箱格式',
        trigger: 'blur'
    }],
    "证件有效期类型": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "证件生效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "证件失效日期": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "持证人姓名": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "业务办理授权函": [{ required: true, trigger: 'blur', message: t('请上传') }],
}

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
