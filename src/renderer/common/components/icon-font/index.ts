import { Icon } from 'antd';

const url = '//at.alicdn.com/t/font_1626604_vqucbvejjn.js';

export const IconFont = Icon.createFromIconfontCN({
  scriptUrl: `https:${url}`,
  extraCommonProps: {
    style: {
      verticalAlign: 'middle',
    },
  },
});
