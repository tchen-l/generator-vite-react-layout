export default {
  defaultDirectPath: '/',
  request: {
    globalParams: ['companyId'],
    prefixes: {
      /** 可以替换为自己公司的接口 */
      config: '/spm-configcenter',
      data: '/spm-datacenter',
      download: '/spm-downloadcenter',
      engine: '/spm-enginecenter',
      operation: '/spm-operationcenter',
      shop: '/spm-shopcenter',
      smartbi: '/spm-smartbi',
      user: '/spm-usercenter'
    }
  }
};
