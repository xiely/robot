<template>
    <div class="p-2">
      <el-form ref="formRef" :model="applyForm" :rules="formRules" :label-width="200" label-position="left">
        <el-form-item>
          <template #label>
            <div>结算规则</div>
          </template>
          <span class="form-tip">请填写商家的结算费率规则、特殊资质等信息</span>
        </el-form-item>
        <el-form-item prop="结算规则信息" label="结算规则信息">
          <el-select v-model="applyForm.结算规则信息" placeholder="请选择" clearable @change="handleFieldList()">
              <el-option v-for="item in ruleList" :label="item.label" :value="item.value" >
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
          <div class="form-tip">
            <p>请根据实际经营行业选择结算规则，可看<a class="link" href="https://kf.qq.com/faq/190610vmIfei190610AfMzii.html" target="_blank">结算规则指引</a>，若结算规则说明有单笔收款限额，请看<a class="link" href="https://kf.qq.com/faq/201130jyeAFr201130NJVv6z.html" target="_blank">收款限额说明</a></p>
          </div>
        </el-form-item>
        <el-form-item prop="所属行业" label="所属行业">
          <el-select v-model="applyForm.所属行业" placeholder="请选择" clearable >
              <el-option v-for="item in fieldList" :label="item.label" :value="item.value" >
                <span style="float: left">{{ item.label }}</span>
                <span
                  :title="item.explain"
                  style="
                    float: right;
                    display: inline-block;
                    width: 80%;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                >
                  {{ item.explain }}
                </span>
                </el-option>
            </el-select>
          <div class="form-tip">
            <p>请提供为“申请商家主体”所属的特殊资质，可授权使用总公司/分公司的特殊资质；<a class="link" href="https://kf.qq.com/faq/190610B7baQb190610NN3mQN.html" target="_blank">上传特殊资质指引</a></p>
          </div>
        </el-form-item>
        <el-form-item  prop="特殊资质">
          <template #label>
            <div>特殊资质
              <el-tooltip
                class="box-item"
                effect="dark"
                placement="top-start"
                content="<div><div>1.请上传彩色照片、彩色扫描件或加盖公章鲜章的复印件（暂不支持电子章）。</div><div>2.若有水印或用途说明，仅限与申请微信支付业务相关水印（如微信支付认证）。</div><div>3.需正面拍摄，清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。</div><div>4.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div></div>"
                    raw-content>
                <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <div>
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
            <div class="form-tip"><div>
              <span v-if="applyForm.所属行业 == '零售'">1.无需特殊资质，若涉及烟草售卖，需提供《烟草专卖零售许可证》</span>
              <span v-else-if="applyForm.所属行业 == '宠物医院'">1.《动物诊疗许可证》</span>
              <span v-else-if="applyForm.所属行业 == '共享服务'">1.涉及押金需提供资金监管协议，协议要求：1、主体与商业银行签订；2、内容针对交易资金使用和偿付进行监管；3、协议须在有效期内；4、结算账户须与资金监管账户一致。不涉及押金：请提供承诺函承诺函模板参考详见：商户承诺函</span>
              <span v-else-if="applyForm.所属行业 == '婚介平台/就业信息平台/其他信息服务平台'">1.就业信息平台需提供《人力资源许可证》；婚介平台/其他信息平台服务可直接提供主体执照。</span>
              <span v-else-if="applyForm.所属行业 == '虚拟充值'">1）自营虚拟充值业务：提供相关自营资质、与主体一致的资金监管协议等；2）他营虚拟充值业务：官方授权及合作证明以及官方所持有的自营资质、与主体一致的收费证明及资金监管协议等；3）如涉及到电信运营商、宽带收费等线上充值业务，请提供《基础电信业务经营许可证》或《增值电信业务经营许可证》；</span>
              <span v-else-if="applyForm.所属行业 == '快递'">1.快递《快递业务经营许可证》</span>
              <span v-else-if="applyForm.所属行业 == '物流'">1.物流《道路运输经营许可证》；从事网络货运的，提供以下三个资质《增值电信业务许可证》《三级信息系统安全等级保护备案证明》《道路运输经营许可证》；</span>
              <span v-else-if="applyForm.所属行业 == '加油/加气'">
                1.成品油零售请提供《成品油批发经营批准证书》或《成品油仓储经营批准证书》或《成品油零售经营批准证书》，其中一个即可。成品油批发或仓储则需传经营范围含有“成品油批发”或“成品油仓储”字样的营业执照；汽车加气站请提供《燃气经营许可证》，证件经营类别为“燃气汽车加气站”等字样
              </span>
              <span v-else-if="applyForm.所属行业 == '水电煤气缴费'">1.收费授权证明文件（如授权证明书或合同）</span>
              <span v-else-if="applyForm.所属行业 == '在线图书/视频/音乐'">1.普通在线图书/视频/音乐应提供以下任选其一资质：《互联网出版许可证》、《网络出版服务许可证》、《网络文化经营许可证》、《信息网络传播视听节目许可证》；如属于微短剧，应提供以下任一资质：（1）《信息网络传播视听节目许可证》或《信息网络传播视听节目备案》（业务类别均需含“网络剧（片）的制作、播出服务”）；（2）同时提供：①《信息网络传播视听节目许可证》或《信息网络传播视听节目备案》，以及②《广播电视播出机构许可证》；（3）同时提供：①《信息网络传播视听节目许可证》或《信息网络传播视听节目备案》，以及②《广播电视节目制作经营许可证》。</span>
              <span v-else-if="applyForm.所属行业 == '游戏'">1.请提供有效期内的游戏版号（《网络游戏电子出版物审批》）。若游戏涉及IP合作，请确保已获得合法有效授权。</span>
              <span v-else-if="applyForm.所属行业 == '网络直播/直播平台'">1.需提供《网络文化经营许可证》，且许可证的经营场景应当明确包括网络表演，PC/wap网站需要有ICP备案</span>
              <span v-else-if="applyForm.所属行业 == '水电煤气缴费'">1.收费授权证明文件（如授权证明书或合同）</span>
              <span v-else-if="applyForm.所属行业 == '水电煤气缴费'">1.收费授权证明文件（如授权证明书或合同）</span>
              <span v-else-if="applyForm.所属行业 == '水电煤气缴费'">1.收费授权证明文件（如授权证明书或合同）</span>
              <span v-else-if="applyForm.所属行业 == '水电煤气缴费'">1.收费授权证明文件（如授权证明书或合同）</span>
              <span v-else>1.无需特殊资质</span>
              <br/>2.请上传彩色照片 or 彩色扫描件 or 加盖公章鲜章的复印件，要求正面拍摄，露出证件四角且清晰、完整，所有字符清晰可识别，不得反光或遮挡。不得翻拍、截图、镜像、PS。<br/>3.图片只支持JPG、BMP、PNG格式，文件大小不能超过2M。</div></div>
            </div>
        </el-form-item>
      </el-form>
      <el-button @click="handleBack()">返回</el-button>
      <el-button type="primary" @click="submitForm">下一步</el-button>
    </div>
</template>
<script lang="ts" setup>
import { applyData3 } from '@/api/order/apply/types';
import { useI18n } from 'vue-i18n';

const emits = defineEmits(["back"])
const formRef = ref<ElFormInstance>();
const { t } = useI18n();
const list = [
    { label: "线下门店", value: "线下门店" },
    { label: "公众号", value: "公众号" },
    { label: "小程序", value: "小程序" },
    { label: "APP", value: "APP" },
    { label: "互联网网站", value: "互联网网站" },
    { label: "企业微信", value: "企业微信" },
]
const applyForm = ref<applyData3>({
    "结算规则信息": "",
    "所属行业": "",
    "特殊资质": [""]
} as applyData3);

const formRules: ElFormRules = {
    "结算规则信息": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "所属行业": [{ required: true, trigger: 'blur', message: t('请选择') }],
}
const ruleList = [
    { label: "提供网上交易场所或信息服务的业务、通讯业务、财经类业务及其他平台服务、餐饮、零售、交通出行等实体业务", value: 0, explain: "费率0.6%,入账周期T+1" },
    { label: "通讯业务", value: 1, explain: "费率0.6%,入账周期T+1，虚拟限额" },
    { label: "加油", value: 2, explain: "费率0.3%,入账周期T+1" },
    { label: "民生缴费", value: 3, explain: "费率0.2%，入账周期T+1" },
    { label: "游戏、在线音视频等虚拟业务", value: 4, explain: "费率1%,入账周期T+1，虚拟限额" },
    { label: "主营服饰鞋包、饰品配饰、美妆用品、生活日化类，及健身房、公共体育场馆、娱乐体育场馆等健身运动服务的实体业务", value: 5, explain: "非信用卡0.6%，信用卡0.6%，入账周期T+1" },
]
const fieldList = ref([]);

const handleFieldList = () => {
    console.log(typeof applyForm.value.结算规则信息, "结算规则信息")
    const value = Number(applyForm.value.结算规则信息);
    applyForm.value.所属行业 = "";
    if (value == 0) {
        fieldList.value = [
            { label: "餐饮", value: "餐饮", explain: "无需特殊资质" },
            { label: "电商平台", value: "电商平台", explain: "无需特殊资质" },
            { label: "零售", value: "零售", explain: "无需特殊资质，若涉及烟草售卖，需提供《烟草专卖零售许可证》" },
            { label: "食品生鲜", value: "食品生鲜", explain: "无需特殊资质" },
            { label: "咨询/娱乐票务", value: "咨询/娱乐票务", explain: "无需特殊资质" },
            { label: "房产中介", value: "房产中介", explain: "无需特殊资质" },
            { label: "宠物医院", value: "宠物医院", explain: "动物诊疗许可证》" },
            { label: "共享服务", value: "共享服务", explain: "涉及押金需提供资金监管协议，协议要求：1、主体与商业银行签订；2、内容针对交易资金使用和偿付进行监管；3、协议须在有效期内；4、结算账户须与资金监管账户一致。不涉及押金：请提供承诺函承诺函模板参考详见：商户承诺函" },
            { label: "休闲娱乐/旅游服务", value: "休闲娱乐/旅游服务", explain: "无需特殊资质" },
        ]
    }
    else if (value == 1) {
        fieldList.value = [
            { label: "婚介平台/就业信息平台/其他信息服务平台", value: "婚介平台/就业信息平台/其他信息服务平台", explain: "就业信息平台需提供《人力资源许可证》；婚介平台/其他信息平台服务可直接提供主体执照。" },
            { label: "虚拟充值", value: "虚拟充值", explain: "1）自营虚拟充值业务：提供相关自营资质、与主体一致的资金监管协议等；2）他营虚拟充值业务：官方授权及合作证明以及官方所持有的自营资质、与主体一致的收费证明及资金监管协议等；3）如涉及到电信运营商、宽带收费等线上充值业务，请提供《基础电信业务经营许可证》或《增值电信业务经营许可证》；" },
        ]
    }
    else if (value == 2) {
        fieldList.value = [
            { label: "快递", value: "快递", explain: "快递《快递业务经营许可证》" },
            { label: "物流", value: "物流", explain: "物流《道路运输经营许可证》；从事网络货运的，提供以下三个资质《增值电信业务许可证》《三级信息系统安全等级保护备案证明》《道路运输经营许可证》；" },
            { label: "加油/加气", value: "加油/加气", explain: "成品油零售请提供《成品油批发经营批准证书》或《成品油仓储经营批准证书》或《成品油零售经营批准证书》，其中一个即可。成品油批发或仓储则需传经营范围含有“成品油批发”或“成品油仓储”字样的营业执照；汽车加气站请提供《燃气经营许可证》，证件经营类别为“燃气汽车加气站”等字样" },
        ]
    }
    else if (value == 3) {
        fieldList.value = [
            { label: "水电煤气缴费", value: "水电煤气缴费", explain: "收费授权证明文件（如授权证明书或合同）" },
        ]
    }
    else if (value == 4) {
        fieldList.value = [
            { label: "在线图书/视频/音乐", value: "在线图书/视频/音乐", explain: "普通在线图书/视频/音乐应提供以下任选其一资质：《互联网出版许可证》、《网络出版服务许可证》、《网络文化经营许可证》、《信息网络传播视听节目许可证》；如属于微短剧，应提供以下任一资质：（1）《信息网络传播视听节目许可证》或《信息网络传播视听节目备案》（业务类别均需含“网络剧（片）的制作、播出服务”）；（2）同时提供：①《信息网络传播视听节目许可证》或《信息网络传播视听节目备案》，以及②《广播电视播出机构许可证》；（3）同时提供：①《信息网络传播视听节目许可证》或《信息网络传播视听节目备案》，以及②《广播电视节目制作经营许可证》。" },
            { label: "门户论坛/网络广告及推广/软件开发/其他互联网服务", value: "门户论坛/网络广告及推广/软件开发/其他互联网服务", explain: "无需特殊资质" },
            { label: "游戏", value: "游戏", explain: "请提供有效期内的游戏版号（《网络游戏电子出版物审批》）。若游戏涉及IP合作，请确保已获得合法有效授权。" },
            { label: "网络直播/直播平台", value: "网络直播/直播平台", explain: "需提供《网络文化经营许可证》，且许可证的经营场景应当明确包括网络表演，PC/wap网站需要有ICP备案" },
        ]
    }
    else if (value == 5) {
        fieldList.value = [
            { label: "服饰鞋包", value: "服饰鞋包", explain: "无需特殊资质" },
            { label: "美妆日化", value: "美妆日化", explain: "无需特殊资质" },
            { label: "健身运动服务", value: "健身运动服务", explain: "无需特殊资质" },
        ]
    }
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
