// export default [
//   {
//     title: '进件',
//     path: "purchase/purchase-index",
//     children: [
//       {
//         title: '进件管理',
//         path: "purchase/purchase-manage",
//         color: '#598AC5',
//         icon: 'jinjianguanli',
//         children: [{
//           title: '融资租赁申请',
//           path: 'purchase/purchase-manage/financing-lease-apply'
//         }, {
//           title: '全款销售申请',
//           path: 'purchase/purchase-manage/full-payment-apply'
//         }, {
//           title: '客户开户',
//           path: 'purchase/purchase-manage/open-account'
//         }, {
//           title: '客户签约',
//           path: 'purchase/purchase-manage/customer-sign'
//         }, {
//           title: '订单交接',
//           path: 'purchase/purchase-manage/order-transfer'
//         }, {
//           title: '评估申请',
//           path: 'purchase/purchase-manage/evaluation-application.tsx'
//         }, {
//           title: '评估任务池',
//           path: 'purchase/purchase-manage/evaluation-task-pool'
//         }, {
//           title: '押品评估',
//           path: 'purchase/purchase-manage/evaluation-of-collateral'
//         }]
//       }, {
//         title: '进件查询',
//         color: '#36B48C',
//         path: 'purchase/purchase-query',
//         icon: 'jinjianchaxun',
//         children: [{
//           title: '订单查询',
//           path: 'purchase/purchase-query/order-query',
//         }, {
//           title: '客户资料查询',
//           path: 'purchase/purchase-query/customer-data-query',
//         }, {
//           title: '产品包查询',
//           path: 'purchase/purchase-query/product-package-query',
//         }]
//       },
//       {
//         title: '财务记账',
//         color: '#47AAB6',
//         path: 'purchase/finance-account',
//         icon: 'caiwujizhang',
//         children: [{
//           title: '销售收款申请',
//           path: 'purchase/finance-account/sale-gathering-apply',
//         }, {
//           title: '提前结清申请',
//           path: 'purchase/finance-account/early-payment-apply',
//         }, {
//           title: '提前收回申请',
//           path: 'purchase/finance-account/early-recover-apply',
//         }, {
//           title: '收款记录查询',
//           path: 'purchase/finance-account/receipt-record-query',
//         }, {
//           title: '付款记录查询',
//           path: 'purchase/finance-account/payment-record-query',
//         }, {
//           title: '付款申请',
//           path: 'purchase/finance-account/pay-apply',
//         }]
//       },
//       {
//         title: '审批管理',
//         color: '#6D7AD9',
//         path: 'purchase/purchase-approve',
//         icon: 'shenpiguanli',
//         children: [{
//           title: '收款审批',
//           path: 'purchase/purchase-approve/receipt-approve',
//         }, {
//           title: '付款审批',
//           path: 'purchase/purchase-approve/payment-approve',
//         }]
//       }
//     ]
//   },
//   {
//     title: '审批',
//     path: 'approval/approval-index',
//     children: [{
//       title: '审核管理',
//       color: '#598AC5',
//       path: 'approval/approval-manage',
//       icon: 'shenheguanli',
//       children: [{
//         title: '审核资源池',
//         path: 'approval/approval-manage/approval-resource-pool'
//       }, {
//         title: '面审',
//         path: 'approval/approval-manage/face-approval'
//       }, {
//         title: '复审',
//         path: 'approval/approval-manage/second-approval'
//       }, {
//         title: '终审',
//         path: 'approval/approval-manage/last-approval'
//       }, {
//         title: '合规检查',
//         path: 'approval/approval-manage/meet-condition-check'
//       }, {
//         title: '我的审核',
//         path: 'approval/approval-manage/my-approval'
//       }, {
//         title: '流程配置',
//         path: 'approval/approval-manage/flow-config'
//       }]
//     }, {
//       title: '审核查询',
//       icon: 'shenhechaxun',
//       color: '#36B48C',
//       children: [{
//         title: '内审管理',
//         path: 'approval/approval-manage/internal-audit-manage'
//       }, {
//         title: '灰名单',
//         path: 'approval/approval-manage/gray-list'
//       }, {
//         title: '黑名单',
//         path: 'approval/approval-manage/black-list'
//       }, {
//         title: '订单查询',
//         path: 'approval/approval-manage/approval-order-query'
//       }]
//     }, {
//       title: '还款管理',
//       icon: 'huankuanguanli',
//       path: 'approval/repay-manage',
//       color: '#47AAB6',
//       children: [{
//         title: '客户还款查询',
//         path: 'approval/repay-manage/customer-repay-query'
//       }, {
//         title: '减免申请记录',
//         path: 'approval/repay-manage/derate-apply-record'
//       }, {
//         title: '冻结申请记录',
//         path: 'approval/repay-manage/frozen-apply-record'
//       }]
//     }, {
//       title: '综合查询',
//       icon: 'zonghechaxun',
//       path: 'approval/synthesize-query',
//       color: '#6D7AD9',
//       children: [{
//         title: '审核记录表',
//         path: 'approval/synthesize-query/approval-record-table'
//       }, {
//         title: '合同下载监控',
//         path: 'approval/synthesize-query/compact-monitor'
//       }]
//     }]
//   },
//   {
//     title: '财务',
//     path: 'finance/finance-index',
//     children: [{
//       title: '收付款管理',
//       icon: 'shoufukuanguanli',
//       path: 'finance/initial-payment-manage',
//       color: '#598AC5',
//       children: [{
//         title: '收款',
//         path: 'finance/initial-payment-manage/gathering'
//       }, {
//         title: '付款',
//         path: 'finance/initial-payment-manage/payment'
//       }]
//     },
//     {
//       title: '还款管理',
//       icon: 'huankuanguanli',
//       color: '#36B48C',
//       path: 'finance/repay-manage',
//       children: [{
//         title: '客户还款',
//         path: 'finance/repay-manage/customer-repay'
//       }, {
//         title: '提前结清',
//         path: 'finance/repay-manage/early-pay'
//       }, {
//         title: '提前收回',
//         path: 'finance/repay-manage/early-withdraw'
//       }, {
//         title: '已结清订单查询',
//         path: 'finance/repay-manage/closed-order-query'
//       }]
//     },
//     {
//       title: '划扣管理',
//       icon: 'huakouguanli',
//       color: '#47AAB6',
//       path: 'finance/deduct-manage',
//       children: [{
//         title: '个人开户列表',
//         path: 'finance/deduct-manage/personal-account-list'
//       }, {
//         title: '企业开户列表',
//         path: 'finance/deduct-manage/company-account-list'
//       }, {
//         title: '划扣记录查询',
//         path: 'finance/deduct-manage/deduct-record-query'
//       }]
//     },
//     {
//       title: '发票管理',
//       path: 'finance/invoice-manage',
//       icon: 'fapiaoguanli',
//       color: '#6D7AD9',
//       children: [{
//         title: '财务开票',
//         path: 'finance/invoice-manage/finance-make-invoice'
//       }]
//     },
//     {
//       title: '财务统计',
//       icon: 'caiwutongji',
//       color: '#47AAB6',
//       path: 'finance/finance-statistics',
//       children: [{
//         title: '清结算日报表',
//         path: 'finance/finance-statistics/clear-account-report'
//       }, {
//         title: '月还款报表',
//         path: 'finance/finance-statistics/month-repay-report'
//       },
//         //   {
//         //     title: '收款信息导出',
//         //     path: 'finance/finance-statistics/gathering-info-export'
//         // }, {
//         //     title: '订单信息导出',
//         //     path: 'finance/finance-statistics/order-info-export'
//         // }, {
//         //     title: '导出模板管理',
//         //     path: 'finance/finance-statistics/query-template-manage'
//         // }
//       ]
//   },
//   {
// <<<<<<< HEAD
//     title: '基础数据',
//     path: 'base/base-index',
//     children: [{
//       title: '基础数据',
//       icon: 'jichushuju',
//       color: '#598AC5',
//       path: 'base/base-data',
//       children: [{
//         title: '产品包管理',
//         path: 'base/base-data/prod-package-info'
//       },
//       {
//         title: '车辆维护',
//         path: 'base/base-data/vehicle-maintenance'
//       }, {
//         title: '数据字典',
//         path: 'base/base-data/data-dict'
//       }, {
//         title: '审批原因管理',
//         path: 'base/base-data/approval-reason-manage'
//       }, {
//         title: '分公司信息',
//         path: 'base/base-data/branch-company-info'
//       }]
//     }, {
//       title: '配置管理',
//       icon: 'peizhiguanli',
//       color: '#36B48C',
//       path: 'base/config-manage',
//       children: [{
//         title: '产品配置',
//         path: 'base/base-data/prod-config'
//       }, {
//         title: '客户素材维护',
//         path: 'base/base-data/customer-fodder-maintain'
//       }, {
//         title: '经销商报价',
//         path: 'base/base-data/dealer-quotes'
//       }, {
//         title: '导出模版管理',
//         path: 'base/base-data/export-template-manage'
//       }, {
//         title: '冲抵配置',
//         path: 'base/base-data/flushing-config'
//       }]
//     }]
//   },
//   {
//     title: '系统设置',
//     path: 'system-manage/system-manage-index',
//     children: [{
//       title: '权限设置',
//       color: '#598AC5',
//       icon: 'quanxianshezhi',
//       path: 'system-manage/power-config',
//       children: [{
//         title: '模块功能',
//         path: 'system-manage/power-config/module-function'
//       }, {
//         title: '角色维护',
//         path: 'system-manage/power-config/role-maintenance'
//       }, {
//         title: '机构与用户管理',
//         path: 'system-manage/power-config/org-user-manage'
//       }
//       ]
//     }, {
//       title: '运维设置',
//       icon: 'yunweishezhi',
//       color: '#36B48C',
//       path: 'system-manage/operation-config',
//       children: [{
//         title: '订单状态变更',
//         path: 'system-manage/operation-config/order-status-change'
//       }, {
//         title: '客户还款撤销',
//         path: 'system-manage/operation-config/customer-repay-revert'
//       }
//       ]
//     },
//     {
//       title: '其他设置',
//       icon: 'qitashezhi',
//       color: '#47AAB6',
//       path: 'system-manage/other-config',
//       children: [
//         {
//           title: '系统参数管理',
//           path: 'system-manage/operation-config/system-param-manage'
//         }, {
//           title: '系统备份',
//           path: 'system-manage/operation-config/system-backups'
//         }, {
//           title: '批量管理',
//           path: 'system-manage/operation-config/batch-manage'
//         }, {
//           title: '系统日志',
//           path: 'system-manage/operation-config/system-log-download'
//         }, {
//           title: '123123',
//           path: 'system-manage/operation-config/system-log-download'
//         }]
//     }]
//   },
//   {
//     title: '库存管理',
//     // path: 'system-manage/system-manage-index',
//     children: [{
//       title: '库存管理',
//       color: '#598AC6',
//       icon: 'quanxianshezhi',
//       path: 'inventory-management/inventory-data',
//       children: [{
//         title: '押品入库',
//         path: 'inventory-management/inventory-data/goods-in-treasury'
//       }, {
//         title: '押品出库',
//         path: 'inventory-management/inventory-data/goods-out-treasury'
//       }]
//     }]
//   },
//   {
//     title: '客户中心',
//     // path: 'system-manage/system-manage-index',
//     children: [{
//       title: '客户中心',
//       color: '#598AC5',
//       icon: 'quanxianshezhi',
//       path: 'customer-center/customer-data',
//       children: [{
//         title: '个人意向客户',
//         path: 'customer-center/customer-data/personal-client'
//       }, {
//         title: '个人正式客户',
//         path: 'customer-center/customer-data/personal-customer'
//       }, {
//         title: '个人黑名单',
//         path: 'customer-center/customer-data/personal-blacklist'
//       }, {
//         title: '企业意向客户',
//         path: 'customer-center/customer-data/enterprise-intent-customer'
//       }, {
//         title: '企业正式客户',
//         path: 'customer-center/customer-data/enterprise-formal-customer'
//       }, {
//         title: '企业黑名单',
//         path: 'customer-center/customer-data/enterprises-blacklist'
//       }]
//     }]
// =======
//       title: '基础数据',
//       path: 'base/base-index',
//       children: [{
//           title: '基础数据',
//           icon: 'jichushuju',
//           color: '#598AC5',
//           path: 'base/base-data',
//           children: [{
//               title: '产品包管理',
//               path: 'base/base-data/prod-package-info'
//           },
//           {
//               title: '车辆维护',
//               path: 'base/base-data/vehicle-maintenance'
//           }, {
//               title: '数据字典',
//               path: 'base/base-data/data-dict'
//           }, {
//               title: '审批原因管理',
//               path: 'base/base-data/approval-reason-manage'
//           }, {
//               title: '分公司信息',
//               path: 'base/base-data/branch-company-info'
//           }]
//       }, {
//           title: '配置管理',
//           icon: 'peizhiguanli',
//           color: '#36B48C',
//           path: 'base/config-manage',
//           children: [{
//               title: '产品配置',
//               path: 'base/base-data/prod-config'
//           }, {
//               title: '客户素材维护',
//               path: 'base/base-data/customer-fodder-maintain'
//           }, {
//               title: '经销商报价',
//               path: 'base/base-data/dealer-quotes'
//           }, {
//               title: '导出模版管理',
//               path: 'base/base-data/export-template-manage'
//           }]
//       }]
//   },
//   {
//       title: '系统设置',
//       path: 'system-manage/system-manage-index',
//       children: [{
//           title: '权限设置',
//           color: '#598AC5',
//           icon: 'quanxianshezhi',
//           path: 'system-manage/power-config',
//           children: [{
//               title: '模块功能',
//               path: 'system-manage/power-config/module-function'
//           }, {
//               title: '角色维护',
//               path: 'system-manage/power-config/role-maintenance'
//           }, {
//               title: '机构与用户管理',
//               path: 'system-manage/power-config/org-user-manage'
//           }
//           ]
//       }, {
//           title: '运维设置',
//           icon: 'yunweishezhi',
//           color: '#36B48C',
//           path: 'system-manage/operation-config',
//           children: [{
//               title: '订单状态变更',
//               path: 'system-manage/operation-config/order-status-change'
//           }, {
//               title: '客户还款撤销',
//               path: 'system-manage/operation-config/customer-repay-revert'
//           }
//           ]
//       },
//       {
//           title: '其他设置',
//           icon: 'qitashezhi',
//           color: '#47AAB6',
//           path: 'system-manage/other-config',
//           children: [
//               {
//                   title: '系统参数管理',
//                   path: 'system-manage/operation-config/system-param-manage'
//               }, {
//                   title: '系统备份',
//                   path: 'system-manage/operation-config/system-backups'
//               }, {
//                   title: '批量管理',
//                   path: 'system-manage/operation-config/batch-manage'
//               }, {
//                   title: '系统日志',
//                   path: 'system-manage/operation-config/system-log-download'
//               }]
//       }]
// >>>>>>> dev
//   }
// ]
