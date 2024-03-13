
<template>

  <div class="md-box-h">
    <LightTable
        :data="tableData"
        :header="tableHeader"
    >
    </LightTable>
  </div>


</template>

<script lang="js">

export default {
  data(){
    return {
      tableHeader: [
        {
          label: "",
          prop: "expand",
          type: "expand",
          slot: true,
        },
        {
          label: "品牌名称",
          prop: "brand",
          key: "brand",
          tip: true,
        },
        {
          label: "公司名称",
          key: "companyName",
          tip: true,
          hover: '公司名称公司名称公司名称'
        },
        {
          label: "投资门店",
          key: "investShopNum",
        },
        {
          label: "品牌预估年营收",
          key: "brandAnnualRevenue",
        },
        {
          label: "备注",
          key: "remark",
          tip: true,
        },
        {
          label: "项目编号",
          key: "projectNo",
        },
        {
          label: "投资评估编号",
          key: "investRevenueNo",
        },
        {
          label: "状态",
          prop: "state",
          slot: true,
        },
        {
          label: "操作",
          slot: true,
          prop: "action",
          fixed: "right",
        },
      ],
      tableData: [
        {
          "projectNo":  "",
          "investRevenueNo":  "TZ-0606",
          "companyName":  "飞满天",
          "brand":  "南山雪",
          "investExpansionManager":  "沈菲",
          "investResearchManager":  "liuxiaojie",
          "brandManagerName":  null,
          "remark":  "复制TZ-0549",
          "investShopNum":  null,
          "brandAnnualRevenue":  null,
          "brandBindState":  0,
          "estimatedRevenueStep":  2,
          "revenueTrendSuggest":  "",
          "revenuePredictionSuggest":  "",
          "state":  0,
          "reportInfos":  [
            {
              "investReportNo":  "RP-0762",
              "totalAmount":  1000000,
              "jointMonth":  12,
              "spStartDate":  1704729600000,
              "incomeEffectRatio":  100,
              "annualizedIrr":  null,
              "recoveryDay":  null,
              "accumulatedPaymentAmount":  null,
              "recoveryMultiple":  null,
              "recoveryMonth":  null,
              "reportBandState":  0,
              "bandFlag":  "SHOW",
              "unBandFlag":  "HIDE",
              "jointTimeType":  "REGULAR",
              "stopDivideThreshold":  null,
              "divideTimeRange":  null,
              "jointTime":  null
            }
          ],
          "reportBandState":  "NOT_BINDING"
        },
        {
          "projectNo":  "XM000474",
          "investRevenueNo":  "TZ-0661",
          "companyName":  "江阴证券投资有限公司",
          "brand":  "江阴证券",
          "investExpansionManager":  "沈菲",
          "investResearchManager":  "刘小杰",
          "brandManagerName":  "",
          "remark":  "分配投资评估经理时自动生成",
          "investShopNum":  3,
          "brandAnnualRevenue":  753091.2,
          "brandBindState":  1,
          "estimatedRevenueStep":  4,
          "revenueTrendSuggest":  "",
          "revenuePredictionSuggest":  "",
          "state":  1,
          "reportInfos":  [
            {
              "investReportNo":  "RP-0821",
              "totalAmount":  20000,
              "jointMonth":  8,
              "spStartDate":  1706716800000,
              "incomeEffectRatio":  99,
              "annualizedIrr":  "超过200%",
              "recoveryDay":  "75天",
              "accumulatedPaymentAmount":  "2.87",
              "recoveryMultiple":  1.44,
              "recoveryMonth":  "2.47月",
              "reportBandState":  1,
              "bandFlag":  "HIDE",
              "unBandFlag":  "HIDE",
              "jointTimeType":  "DYNAMIC",
              "stopDivideThreshold":  "回报倍数(不含渠道费)=1.50",
              "divideTimeRange":  "2024/02/01-2024/10/14",
              "jointTime":  "8.45月/257天"
            }
          ],
          "reportBandState":  "BINDING"
        },
        {
          "projectNo":  "XM000460",
          "investRevenueNo":  "TZ-0654",
          "companyName":  "赵老大1",
          "brand":  "赵老大",
          "investExpansionManager":  "张伟",
          "investResearchManager":  "刘小杰",
          "brandManagerName":  "孙培震",
          "remark":  "分配投资评估经理时自动生成",
          "investShopNum":  2,
          "brandAnnualRevenue":  1901276.33,
          "brandBindState":  3,
          "estimatedRevenueStep":  4,
          "revenueTrendSuggest":  "",
          "revenuePredictionSuggest":  "",
          "state":  1,
          "reportInfos":  [
            {
              "investReportNo":  "RP-0820",
              "totalAmount":  0,
              "jointMonth":  0,
              "spStartDate":  1706803200000,
              "incomeEffectRatio":  0,
              "annualizedIrr":  null,
              "recoveryDay":  null,
              "accumulatedPaymentAmount":  null,
              "recoveryMultiple":  null,
              "recoveryMonth":  null,
              "reportBandState":  0,
              "bandFlag":  "SHOW",
              "unBandFlag":  "HIDE",
              "jointTimeType":  "REGULAR",
              "stopDivideThreshold":  null,
              "divideTimeRange":  null,
              "jointTime":  null
            },
            {
              "investReportNo":  "RP-0813",
              "totalAmount":  20000,
              "jointMonth":  12,
              "spStartDate":  1706716800000,
              "incomeEffectRatio":  100,
              "annualizedIrr":  "超过200%",
              "recoveryDay":  "35天",
              "accumulatedPaymentAmount":  "18.49",
              "recoveryMultiple":  9.25,
              "recoveryMonth":  "1.15月",
              "reportBandState":  1,
              "bandFlag":  "HIDE",
              "unBandFlag":  "HIDE",
              "jointTimeType":  "REGULAR",
              "stopDivideThreshold":  "-",
              "divideTimeRange":  "2024/02/01-2025/01/31",
              "jointTime":  "12月/366天"
            }
          ],
          "reportBandState":  "BINDING"
        }
      ]
    }
  },
}
</script>