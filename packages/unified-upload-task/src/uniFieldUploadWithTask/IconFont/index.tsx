import { createFromIconfontCN } from '@ant-design/icons';
// import scriptUrl from '../../static/iconfont.js';

const IconFont = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_1362059_ddqb6p7wpi7.js',
    scriptUrl: './iconfont.js',
    extraCommonProps: {
        style: {
            fontSize: '1.6em',
        },
    },
});

export default IconFont;
