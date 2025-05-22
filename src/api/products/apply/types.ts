export interface applyData1 {
  "主体类型": string;
  "营业执照照片": string;
  "注册号": string;
  "商户名称": string;
  "经营者姓名": string;
  "营业执照注册地址": string;
  "执照有效期类型": string;
  "执照生效日期": string;
  "执照失效日期": string;
  "证件类型": string;
  "身份证人像面照片": string;
  "身份证国徽面照片": string;
  "身份证姓名": string;
  "身份证件号码": string;
  "身份证居住地址": string;
  "证件有效期类型": string;
  "证件生效日期": string;
  "证件失效日期": string;
  "法定代表人姓名"?: string;
  "类型"?: string;
  "登记证书照片"?: string;
  "证书号"?: string;
  "注册地址"?: string;
  "有效期类型"?: string;
  "验证方式"?: string;
  "是否为受益所有人"?: string;
  "证书生效日期"?: string;
  "证书失效日期"?: string;

}

export interface applyData2 {
  "商户简称": string;
  "客服电话": string;
  "经营场景": string[];
  "门店名称"?: string;
  "门店省市"?: string;
  "门店街道名称"?: string;
  "线下场所门头照片"?: string;
  "线下场所内部照片"?: string;
  "线下场所对应的商家AppID"?: string;
  "AppID所属"?: string;
  "服务商公众号AppID"?: string;
  "商家公众号AppID"?: string;
  "公众号页面截图"?: string;
  "小程序AppID"?: string;
  "小程序截图"?: string[];
  "服务商应用AppID"?: string;
  "商家应用AppID"?: string;
  "APP截图"?: string[];
  "互联网网站域名"?: string;
  "网站授权函"?: string;
  "互联网网站对应的商家AppID"?: string;
  "商家企业微信CorpID"?: string;
  "企业微信页面截图"?: string[]
}

export interface applyData3 {
  "结算规则信息": string;
  "所属行业": string;
  "特殊资质"?: string[]
}

export interface applyData4 {
  "账户类型": string;
  "开户名称": string;
  "开户行省市": string;
  "开户支行": string;
  "银行账号": string;
}

export interface applyData5 {
  "超管身份": string;
  "超管姓名": string;
  "超管资料类型": string;
  "证件号码": string;
  "手机号码": string;
  "邮箱": string;
  "证件类型": string;
  "证件照片": string[];
  "证件姓名": string;
  "身份证人像面照片": string;
  "身份证国徽面照片": string;
  "持证人姓名": string;
  "证件有效期类型": string;
  "证件生效日期": string;
  "证件失效日期": string;
  "业务办理授权函": string[];
}
