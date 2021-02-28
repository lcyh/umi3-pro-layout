import moment from "moment";

//  默认时间格式
const TimeFormat = "YYYY-MM-DD HH:mm:ss";

export const getTime = new Date().getTime();

/**
 * 格式化时间
 * @param {String} time 要格式化的时间
 * @param {String} format default：YYYY-MM-DD HH:mm:ss
 */
export const formatTime = (time: any, format = TimeFormat) => {
    time = typeof time === "string" ? parseFloat(time) : time;
    return time ? moment(time).format(format) : "";
};

/**
 * 将 YYYY-MM-DD HH:mm:ss 格式的 时间字符串，格式化为 moment 对象
 * @param {String} time 要转换的时间
 * @param {String} format default：YYYY-MM-DD HH:mm:ss
 */
export const formatToMoment = (time: any, format = TimeFormat) => {
    return time ? moment(time, format) : "";
};

/**
 * 时间组件 禁用时间校验函数（禁止选择 小于今天 的日期）
 * 比如：今天为 2019-01-09 则不能选择 2019-01-09 和 9 号以前的日期
 * @param {*} current
 */
export const disabledDateStartOfDay = (current: any) => {
    return current && current < moment().endOf("day");
};

/**
 * 时间组件 禁用时间校验函数（禁止选择 大于今天 的日期）
 * 比如：今天为 2019-01-09 则不能选择 2019-01-10 和 10 号以后的日期
 * @param {*} current
 */
export const disabledDateEndOfDay = (current: any) => {
    return current && current > moment().endOf("day");
};
/**
 * 时间组件 禁用时间校验函数（禁止选择 今天之前 的日期）
 * 比如：今天为 2019-01-09 则不能选择 2019-01-09 之前的日期 2019-01-09可选
 * @param {*} current
 */
export const disabledDateBeforeToday = (current: any) => {
    return current && current < moment().startOf("day");
};
/**
 * 时间组件 禁止选择分钟
 * 开始日期默认x点0分，结束时间默认x点59分，其余分钟不可选
 * @param {string} type start-开始时间/end-结束时间
 */
export const disabledRangeTime = (_: any, type: string) => {
    if (type === "start") {
        return { disabledMinutes: range.bind(null, 1, 60) };
    }
    return { disabledMinutes: range.bind(null, 0, 59) };
};
/**
 * 返回不可选时间
 * @param {start} type 开始时间
 * @param {end} type   结束时间
 */
export const range = (start: any, end: any) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
/**
 * 格式化 搜索表单中 的时间格式
 * @param {Array} times Moment 数组
 * @param {Number} index 数组下标
 */
export const formatSearchTime = (times: any, index: number) => {
    return times && times.length > 0 ? formatTime(times[index]._d) : "";
};

/**
 * RangePicker 组件的 showTime 字段，时分秒 默认展示 00:00:00 和 23:59:59
 * otherOptions 可以增加附属属性，属性详情可以参考：https://ant-design.gitee.io/components/time-picker-cn/#API
 * @param {*} otherOptions
 */
export const showBeginAndEndTime = (otherOptions: any) => {
    return {
        defaultValue: [
            moment("00:00:00", "HH:mm:ss"),
            moment("23:59:59", "HH:mm:ss"),
        ],
        ...otherOptions,
    };
};
