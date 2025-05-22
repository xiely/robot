<template>
  <div class="p-2">
    <el-form ref="formRef" :model="applyForm" :rules="formRules" :label-width="200" label-position="left">
      <el-form-item prop="商户简称" label="商户简称">
        <el-input style="width: 98%;" v-model="applyForm.商户简称"></el-input>
        <el-tooltip
          class="box-item"
          effect="dark"
          placement="bottom">
          <template #content>
            <img src='@/assets/images/wechatPayMerchantName.png' style='width:300px;'>
          </template>
          <el-icon style="margin-left: 6px"><QuestionFilled /></el-icon>
        </el-tooltip>
        <div class="form-tip">
          <p>1、在支付完成页向买家展示，需与微信经营类目相关。</p>
          <p>2、简称要求：</p>
          <p>① 不支持单纯以人名来命名，若为个体户经营，可用“个体户+经营者名称”或“经营者名称+业务”命名，如“个体户张三”或“张三餐饮店”；</p>
          <p>② 不支持无实际意义的文案，如“XX特约商户”、“800”、“XX客服电话XXX”；</p>
        </div>
      </el-form-item>
      <el-form-item prop="客服电话" label="客服电话">
        <el-input style="width: 98%;" v-model="applyForm.客服电话"></el-input>
        <el-tooltip
          class="box-item"
          effect="dark"
          placement="bottom">
          <template #content>
            <img src='@/assets/images/wechatPayPhone.png' style='width:300px;'>
          </template>
          <el-icon style="margin-left: 6px"><QuestionFilled /></el-icon>
        </el-tooltip>
        <div class="form-tip">
          <p>1、请填写真实有效的客服电话，将在交易记录中向买家展示，提供咨询服务。</p>
          <p>2、请确保电话畅通，以便入驻后平台回拨确认。</p>
        </div>
      </el-form-item>
      <el-form-item prop="经营场景" label="经营场景">
         <el-checkbox-group v-model="applyForm.经营场景" style="width: 100%;">
            <el-checkbox v-for="(item) of list" :label="item.label" :value="item.value" />
          </el-checkbox-group>
          <div class="form-tip">
          <p>请勾选实际售卖商品/提供服务场景（至少一项），以便为你开通需要的支付权限<el-button type="primary" link><a class="button-link" href="https://kf.qq.com/faq/170807nY7Jbi170807Yf6jIB.html">填写经营场景指引</a></el-button></p>
          <p>建议只勾选目前必须的场景，以便尽快通过入驻审核，其他支付权限你可在入驻后再根据实际需要发起申请。</p>
        </div>
      </el-form-item>
      <template v-if="applyForm.经营场景.includes('线下门店')">
        <el-form-item label="线下门店">
            <div class="form-tip">你选择了“线下门店”场景，审核通过后，服务商可帮商户发起付款码支付、JSAPI支付</div>
        </el-form-item>
        <el-form-item prop="门店名称" label="门店名称">
          <el-input  v-model="applyForm.门店名称"></el-input>
        </el-form-item>
        <el-form-item prop="门店省市" label="门店省市">
          <el-input  v-model="applyForm.门店省市"></el-input>
          <div class="form-tip">
           <p>请输入省市关键字查询选择</p>
          </div>
        </el-form-item>
        <el-form-item prop="门店街道名称" label="门店街道名称">
          <el-input  v-model="applyForm.门店街道名称"></el-input>
          <div class="form-tip">
           <p>请填写详细的经营场所信息，如有多个场所，选择一个主要场所填写即可</p>
          </div>
        </el-form-item>
        <el-form-item  prop="线下场所门头照片">
          <template #label>
            <div>线下场所门头照片
              <el-tooltip
                class="box-item"
                effect="dark"
                placement="top-start"
                content="<div><div>1.场景图片正面拍摄且清晰、完整，图片不得有遮挡；</div>
                  <div>2.门店招牌清晰、招牌名称、文字可辨识、门框完整，且店面显示在营；若为停车场等无固定门头照片的经营场所，可上传岗亭/出入闸口。具体参考： <el-button type='primary' link><a class='link' href='https://kf.qq.com/touch/sappfaq/2306153eMryu230615NbQJRr.html?scene_id=kf594&amp;platform=15' target='_blank'></el-button>线下经营场景信息提交指引</a></div>
                  <div>3.不得使用翻拍图片、拍摄屏幕、截屏图片、PS、篡改、伪造照片；</div>
                  <div>4.若有水印或用途说明，仅限与申请微信支付业务相关水印（如微信支付认证）。</div></div>"
                    raw-content>
                <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <div>
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
            <div class="form-tip">
              <p>1.场景图片正面拍摄且清晰、完整，图片不得有遮挡；</p>
              <p>2.门店招牌清晰、招牌名称、文字可辨识、门框完整，且店面显示在营； 若为停车场等无固定门头照片的经营场所，可上传岗亭/出入闸口。具体参考 <a class="link" href="https://kf.qq.com/faq/230615QVJzqE230615nmQrQb.html" target="_blank">线下经营场景信息提交指引</a></p>
              </div>
            </div>
        </el-form-item>
        <el-form-item  prop="线下场所内部照片">
          <template #label>
            <div>线下场所门头照片
              <el-tooltip
                class="box-item"
                effect="dark"
                placement="top-start"
                content="<div><div>1.场景图片正面拍摄且清晰、完整，图片不得有遮挡；</div>
                    <div>2.能够展示内部环境并能辨识所经营的业务、销售商品/服务；若为停车场等开阔性经营场地，可提供停车场内部坏境照片。具体参考：<a class='link' href=’https://kf.qq.com/touch/sappfaq/2306153eMryu230615NbQJRr.html?scene_id=kf594&amp;platform=15’ target=’_blank’>线下经营场景信息提交指引</a></div>
                    <div>3.不得使用翻拍图片、拍摄屏幕、截屏图片、PS、篡改、伪造照片；</div>
                    <div>4.若有水印或用途说明，仅限与申请微信支付业务相关水印（如微信支付认证）。</div></div>"
                raw-content>
                <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <div>
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
            <div class="form-tip">
              <p>1.场景图片正面拍摄且清晰、完整，图片不得有遮挡；</p>
              <p>2.能够展示内部环境并能辨识所经营的业务、销售商品/服务； 若为停车场等开阔性经营场地，可提供停车场内部坏境照片。具体参考 <a class="link" href="https://kf.qq.com/faq/230615QVJzqE230615nmQrQb.html" target="_blank">线下经营场景信息提交指引</a></p>
              </div>
            </div>
        </el-form-item>
        <el-form-item  prop="线下场所对应的商家AppID">
          <template #label>
            <div>线下场所对应的商家AppID
            </div>
          </template>
          <div>
            <el-input v-model="applyForm.线下场所对应的商家AppID"></el-input>
            <div class="form-tip">
                  <p>1、可填写已认证的公众号、小程序、应用的AppID，其中公众号AppID需是已认证的服务号、政府或媒体类型的订阅号。<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a></p>
                  <p>
                      <p>2、完成进件后，系统发起特约商户号与该AppID的绑定（即配置为sub_appid，可在发起支付时传入）</p>
                      <p style="padding-left: 5px;">（1）若AppID主体与商家主体一致，则直接完成绑定；</p>
                      <p style="padding-left: 5px;">（2）若AppID主体与商家主体不一致，则商户签约时显示《联合营运承诺函》，并且AppID的管理员需登录<a class="link" href="https://mp.weixin.qq.com/" target="_blank">公众平台</a>确认绑定意愿；（暂不支持绑定异主体的应用AppID）</p>
                  </p>
              </div>
            </div>
        </el-form-item>
      </template>

      <template v-if="applyForm.经营场景.includes('公众号')">
        <el-form-item label="公众号">
            <div class="form-tip">你选择了“公众号”场景，审核通过后，服务商可帮商家发起JSAPI支付</div>
        </el-form-item>
        <el-form-item label="AppID所属" prop="AppID所属">
            <el-radio-group v-model="applyForm.AppID所属">
            <el-radio value="1" >服务商公众号AppID</el-radio>
            <el-radio value="2">商家公众号AppID</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="applyForm.AppID所属 == '1'" prop="服务商公众号AppID" label="服务商公众号AppID">
            <el-input v-model="applyForm.服务商公众号AppID"></el-input>
            <div class="form-tip">
              <p>可选择服务商商户号已绑定的AppID，需为已认证的服务号、政府或媒体类型的订阅号。<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a></p>
            </div>
          </el-form-item>
          <el-form-item v-if="applyForm.AppID所属 == '2'" prop="商家公众号AppID" label="商家公众号AppID">
            <el-input v-model="applyForm.商家公众号AppID"></el-input>
            <div class="form-tip">
              <p>1、请填写已认证的公众号AppID，需是已认证的服务号、政府或媒体类型的订阅号；
                <a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a>
              </p>
              <p>
                <p>2、完成进件后，系统发起特约商户号与该AppID的绑定（即配置为sub_appid，可在发起支付时传入）</p>
                <p style="padding-left: 5px;">（1）若AppID主体与商家主体一致，则直接完成绑定；</p>
                <p style="padding-left: 5px;">（2）若AppID主体与商家主体不一致，则商户签约时显示《联合营运承诺函》，并且AppID的管理员需登录<a class="link" href="https://mp.weixin.qq.com/" target="_blank">公众平台</a>确认绑定意愿；</p>
              </p>
            </div>
          </el-form-item>
           <el-form-item  prop="公众号页面截图">
          <template #label>
            <div>公众号页面截图（选填）
            </div>
          </template>
          <div>
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
            <div class="form-tip">
              <p>请提供展示商品/服务的页面截图/设计稿（最多5张），若公众号未建设完善或未上线请务必提供。</p>
              </div>
            </div>
        </el-form-item>
      </template>

      <template v-if="applyForm.经营场景.includes('小程序')">
        <el-form-item label="小程序">
            <div class="form-tip">你选择了“小程序”场景，审核通过后，服务商可帮商家发起JSAPI支付</div>
        </el-form-item>
        <el-form-item  prop="小程序AppID" label="小程序AppID">
            <el-input v-model="applyForm.小程序AppID"></el-input>
            <div class="form-tip">
              <p>1、请填写已认证的小程序AppID。<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a></p>
              <p>
                  <p>2、完成进件后，系统发起特约商户号与该AppID的绑定（即配置为sub_appid，可在发起支付时传入）</p>
                  <p style="padding-left: 5px;">（1）若AppID主体与商家主体一致，则直接完成绑定；</p>
                  <p style="padding-left: 5px;">（2）若AppID主体与商家主体不一致，则商户签约时显示《联合营运承诺函》，并且AppID的管理员需登录<a class="link" href="https://mp.weixin.qq.com/" target="_blank">公众平台</a>确认绑定意愿；</p>
              </p>
            </div>
          </el-form-item>
          <el-form-item  prop="小程序截图" label="小程序截图">
          <div>
            <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
            <div class="form-tip">
              <p>请提供展示商品/服务的页面截图/设计稿（最多5张），若小程序未建设完善或未上线请务必提供。</p>
              </div>
            </div>
        </el-form-item>
      </template>

      <template v-if="applyForm.经营场景.includes('APP')">
        <el-form-item label="APP">
            <div class="form-tip">你选择了“APP”场景，审核通过后，服务商可帮商家发起APP支付</div>
        </el-form-item>
        <el-form-item label="AppID所属" prop="AppID所属">
            <el-radio-group v-model="applyForm.AppID所属">
            <el-radio value="1" >服务商应用AppID</el-radio>
            <el-radio value="2">商家应用AppID</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="applyForm.AppID所属 == '1'" prop="服务商应用AppID" label="服务商应用AppID">
            <el-input v-model="applyForm.服务商应用AppID"></el-input>
            <div class="form-tip">
              <p>可填写当前服务商商户号已绑定的应用AppID；<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a></p>
            </div>
          </el-form-item>
          <el-form-item v-if="applyForm.AppID所属 == '2'" prop="商家应用AppID" label="商家公众号AppID">
            <el-input v-model="applyForm.商家应用AppID"></el-input>
            <div class="form-tip">
                <p>请填写与商家主体一致且已认证的应用AppID；暂不支持绑定异主体的AppID</p>
                <p>审核通过后，系统将发起特约商家商户号与该AppID的绑定（即配置为sub_appid），服务商随后可在发起支付时选择传入该appid，以完成支付，并获取sub_openid用于数据统计，营销等业务场景 。<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a></p>
            </div>
          </el-form-item>
          <el-form-item  prop="APP截图" label="APP截图">
            <div>
              <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
               <div class="form-tip">
                <p>请提供APP首页截图、尾页截图、应用内截图、支付页截图各1张<a class="link" href="https://kf.qq.com/faq/190130aqumuq190130A326Bf.html" target="_blank">查看示例</a></p>
                </div>
              </div>
          </el-form-item>
      </template>

      <template v-if="applyForm.经营场景.includes('互联网网站')">
        <el-form-item label="互联网网站">
            <div class="form-tip">你选择了“互联网网站”场景，审核通过后，服务商可帮商家发起JSAPI支付、Native支付</div>
        </el-form-item>
        <el-form-item prop="互联网网站域名" >
          <el-input v-model="applyForm.互联网网站域名"></el-input>
          <div class="form-tip">
            <p>如为PC端商城、智能终端等场景，可上传官网链接（格式需以http://或https://开头）；</p>
            <p>网站域名需ICP备案，若备案主体与申请主体不同，请上传加盖公章的<a class="link" href="https://wx.gtimg.com/mch/img/icp.doc" target="_blank">网站授权函</a></p>
          </div>
        </el-form-item>
        <el-form-item prop="网站授权函" >
          <template #label>
            <div >网站授权函
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="top-start"
              content="<div><div>请参照模板打印并上传： </div>
                <div>1.ICP备案授权书的信息全部需打印，不支持手写商户信息； </div>
                <div>2.扫描件或照片大小不得超过2M，所有材料均需清晰、且盖有商户号及授权主体公章。</div></div>"
              raw-content>
              <el-icon style="margin-left: 6px;position: relative;top: 2px;"><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
          </template>
          <image-upload style="width: 100%;" :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
          <div class="form-tip">
            <p>1. 若备案主体与申请主体不同，请务必上传加盖公章的网站授权函</p>
            <p>2. 请打印并上传网站授权函扫描件,具体参考 （<a class="link" href="https://kf.qq.com/faq/180315EZjIfe180315JFFVVr.html" target="_blank">下载模板</a>） ，图片要求2M以内。</p>
          </div>
        </el-form-item>
        <el-form-item prop="互联网网站对应的商家AppID" label="互联网网站对应的商家AppID（选填）">
          <el-input v-model="applyForm.互联网网站对应的商家AppID"></el-input>
          <div class="form-tip">
            <p>1、可填写已认证的公众号、小程序、应用的AppID，其中公众号AppID需是已认证的服务号、政府或媒体类型的订阅号。<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">AppID查看指引</a></p>
            <p>
                <p>2、完成进件后，系统发起特约商户号与该AppID的绑定（即配置为sub_appid，可在发起支付时传入）</p>
                <p style="padding-left: 5px;">（1）若AppID主体与商家主体一致，则直接完成绑定；</p>
                <p style="padding-left: 5px;">（2）若AppID主体与商家主体不一致，则商户签约时显示《联合营运承诺函》，并且AppID的管理员需登录<a class="link" href="https://mp.weixin.qq.com/" target="_blank">公众平台</a>确认绑定意愿；</p>
            </p>
          </div>
        </el-form-item>
      </template>

      <template v-if="applyForm.经营场景.includes('企业微信')">
        <el-form-item label="企业微信">
            <div class="form-tip">你选择了“企业微信”场景，审核通过后，商家可自行发起JSAPI支付、Native支付</div>
        </el-form-item>
        <el-form-item prop="商家企业微信CorpID" label="商家企业微信CorpID">
          <el-input v-model="applyForm.商家企业微信CorpID"></el-input>
          <div class="form-tip">
            <p>可填写与商家主体一致且已认证的企业微信CorpID；审核通过后，系统将为商家开通企业微信专区的自有交易权限，并完成商家商户号与该CorpID的绑定；<a class="link" href="https://kf.qq.com/faq/181105JJNbmm181105eUZfee.html" target="_blank">CorpID查看指引</a></p>
          </div>
        </el-form-item>
        <el-form-item  prop="企业微信页面截图" label="企业微信页面截图">
            <div>
              <image-upload :file-type="['png', 'jpg', 'jpeg', 'bmp']" :file-size="2" :isShowTip="false"></image-upload>
               <div class="form-tip">
                <p>请提供展示商品/服务的页面截图/设计稿（最多5张）<a class="link" href="https://kf.qq.com/faq/190130aqumuq190130A326Bf.html" target="_blank">查看示例</a></p>
                </div>
              </div>
          </el-form-item>
      </template>
    </el-form>
    <el-button @click="handleBack()">返回</el-button>
    <el-button type="primary" @click="submitForm">下一步</el-button>
    </div>
</template>
<script lang="ts" setup>
import { applyData2 } from '@/api/order/apply/types';
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
const applyForm = ref<applyData2>({
    "商户简称": "",
    "客服电话": "",
    "经营场景": [],
    "门店名称": "",
    "门店省市": "",
    "门店街道名称": "",
    "线下场所门头照片": "",
    "线下场所内部照片": "",
    "线下场所对应的商家AppID": "",
    "AppID所属": "",
    "服务商公众号AppID": "",
    "商家公众号AppID": "",
    "公众号页面截图": "",
    "小程序AppID": "",
    "小程序截图": [""],
    "APP截图": [""],
    "服务商应用AppID": "",
    "互联网网站域名": "",
    "网站授权函": "",
    "互联网网站对应的商家AppID": "",
    "商家企业微信CorpID": "",
    "企业微信页面截图": [""]
} as applyData2);

const formRules: ElFormRules = {
    "商户简称": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "客服电话": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "经营场景": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "小程序AppID": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "门店名称": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "门店省市": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "门店街道名称": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "线下场所门头照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
    "线下场所内部照片": [{ required: true, trigger: 'blur', message: t('请上传') }],
    "AppID所属": [{ required: true, trigger: 'blur', message: t('请选择') }],
    "服务商公众号AppID": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "商家公众号AppID": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "服务商应用AppID": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "商家应用AppID": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "APP截图": [{ required: true, trigger: 'blur', message: t('请上传') }],
    "互联网网站域名": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "商家企业微信CorpID": [{ required: true, trigger: 'blur', message: t('请输入') }],
    "企业微信页面截图": [{ required: true, trigger: 'blur', message: t('请上传') }],
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
<style lang="scss"></style>
