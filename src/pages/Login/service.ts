import request from "@/utils/request";

/**
 * 登录
 * @param data
 */
export const accountLogin = (
    account: string,
    verifyCode: string,
    ticket?: string,
    randstr?: string
): Promise<any> => {
    return request.post("/account/login", {
        data:{
                loginType: "phone",
                account,
                verifyCode,
                ticket,
                randstr,
        }
    });
};
/**
 * 模拟获取验证码
 * @param mobile 手机号
 */
export const getVerifyCode = (mobile: string): Promise<any> => {
  return request.get(`/login/captcha?mobile=${mobile}`, {});
};


