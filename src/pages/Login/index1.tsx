import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { FormProps } from 'antd/es/form';
import { RouteComponentProps } from 'react-router';
import { MobileTwoTone } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';
import logoPng from '@/assets/logo.png';
import { getVerifyCode, accountLogin } from './service';

const FormItem = Form.Item;
interface ILoginProps extends FormProps, RouteComponentProps {}

class LoginPage extends Component<ILoginProps, any> {
  public intervalID: any;
  public formRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      loadingBtn: false,
      codeCountDown: 0,
    };
    this.intervalID = 0;
    this.formRef = React.createRef();
  }
  componentDidMount() {
    console.log('初始化componentDidMount-home类组件');
  }
  componentWillUnmount() {
    console.log('卸载home类组件');
  }
  // 获取验证码
  handleSendCode = () => {
    console.log('点击获取验证码');
    this.formRef.current
      ?.validateFields(['account'])
      .then(async (values: any) => {
        console.log('handleSendCode-values', values);
        const { data, code, message: errorMsg } = await getVerifyCode(
          values.account,
        );
        if (code !== 0) {
          return message.error(errorMsg);
        }
        message.success('发送成功');
        this.startCodeCountDown();
      })
      .catch((errInfo: any) => {
        console.log('errInfo', errInfo);
      });
  };

  // 倒计时
  startCodeCountDown = () => {
    this.setState({ codeCountDown: 60 });
    this.intervalID = setInterval(() => {
      let { codeCountDown } = this.state;
      if (codeCountDown <= 0) {
        return clearInterval(this.intervalID);
      }
      codeCountDown -= 1;
      this.setState({ codeCountDown });
    }, 1000);
  };

  fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const { account, verifyCode } = values;
    this.setState({ loadingBtn: true });
    try {
      // 登录
      const { data, code, message: errorMsg } = await accountLogin(
        account,
        verifyCode,
      );
      if (code === 0 && data.token) {
        //如果登录之后，服务器会返回JWT的token，需要把token保存起来;如果后端用的是 cookie,那前端不用存储了
        localStorage.setItem('token', data.token);
        message.success('登录成功！');
        await fetchUserInfo();
        this.handleJump();
        return;
      } else {
        message.error('登录失败，请重试！');
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    this.setState({ loadingBtn: false });
  };
  /**
   * 此方法会跳转到 redirect 参数所在的位置
   */
  handleJump = () => {
    if (!history) return;
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  };

  render() {
    const { loadingBtn, codeCountDown } = this.state;
    return (
      <div className={styles['login-wrapper']}>
        <div className={styles['login-content']}>
          <img className={styles.logo} src={logoPng} alt="" />
          <Form
            ref={this.formRef}
            name="loginInfo"
            layout="vertical"
            className={styles['form-wrapper']}
            onFinish={this.onFinish}
          >
            <FormItem
              name="account"
              rules={[
                { required: true, message: '请输入手机号!' },
                {
                  pattern: /^1\d{10}$/,
                  message: '请输入正确的手机号',
                },
              ]}
            >
              {
                <Input
                  placeholder="请输入手机号"
                  prefix={<MobileTwoTone />}
                  allowClear
                />
              }
            </FormItem>
            <FormItem
              style={{ marginTop: 5 }}
              name="verifyCode"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              {
                <Input
                  onPressEnter={this.onFinish}
                  placeholder="请输入验证码"
                  autoComplete="off"
                  addonAfter={
                    <Button
                      type="primary"
                      disabled={codeCountDown > 0}
                      onClick={this.handleSendCode}
                    >
                      获取验证码
                      {codeCountDown ? `（${codeCountDown}）` : null}
                    </Button>
                  }
                />
              }
            </FormItem>
            <Form.Item>
              <FormItem name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </FormItem>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loadingBtn}
                type="primary"
                htmlType="submit"
                className="login-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default LoginPage;
