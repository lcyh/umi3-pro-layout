import { createFromIconfontCN } from '@ant-design/icons';

/**
 * 此 ICON 均为 IconFont 中的在线 ICON。
 * 如需更新，可以在如下链接中进行操作。
 *
 * PS：添加新 ICON 之后，记得将 ICON 的名称改为对应的英文翻译。
 *
 * 挑选 ICON 的时候，记得风格统一。
 *
 * 菜单 ICON，需要选择 实心风格的 ICON。
 *
 * 然后生成新的 URL，更新下方地址。
 *
 * https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1604993
 */
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2369781_bx28nw5fc97.js',
});

export default IconFont;
