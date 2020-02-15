import './LiabilityForm.scss';

import { Button, Col, Divider, Form, InputNumber, Row } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import { IconFont } from '../../../../common/components';
import React from 'react';

const FormItem = Form.Item;

const formItemStyle = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  style: {
    marginBottom: 0,
  },
};

enum LiabilityField {
  CASH = 'cash',
  DEBITCARD = 'debitCard',
  FUND = 'fund',
  LEND = 'lend',
  ALIPAY = 'alipay',
  WECHATPAY = 'wechatPay',
  HOUSINGFUND = 'housingFund',
  DIGITALCURRENCY = 'digitalCurrency',
  OTHERASSET = 'otherAsset',
  CREDITCARD = 'creditCard',
  BORROW = 'borrow',
  ANTCHECKLATER = 'antCheckLater',
  OTHERLIABILITY = 'otherLiability',
}

export type LiabilityFieldValues = {
  cash: number;
  debitCard: number;
  fund: number;
  lend: number;
  alipay: number;
  wechatPay: number;
  housingFund: number;
  digitalCurrency: number;
  otherAsset?: number;
  creditCard: number;
  borrow: number;
  antCheckLater: number;
  otherLiability?: number;
};

type LiabilityFieldErrors = {
  [key in LiabilityField]: {
    errors: {
      message: string;
      field: LiabilityField;
    }[];
  };
};

interface LiabilityFormProps extends FormComponentProps {
  onConfirm: (values: LiabilityFieldValues) => void;
  onCancel: () => void;
  initialValues?: LiabilityFieldValues;
}

class OriginForm extends React.Component<LiabilityFormProps> {
  cancel = () => {
    const { form, onCancel } = this.props;

    form.resetFields();
    onCancel && onCancel();
  };

  confirm = () => {
    const { form, onConfirm } = this.props;

    form.validateFieldsAndScroll(
      (errors: LiabilityFieldErrors, values: LiabilityFieldValues) => {
        if (!errors) {
          onConfirm && onConfirm(values);
        }
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="liability-form">
        <Divider>资产</Divider>
        <Row className="asset-form-items">
          <Col span={12}>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-cash" />}
            >
              {getFieldDecorator('cash', {
                rules: [{ required: true, message: '请输入现金资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-debit-card" />}
            >
              {getFieldDecorator('debitCard', {
                rules: [{ required: true, message: '请输入储蓄卡资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-fund-account" />}
            >
              {getFieldDecorator('fund', {
                rules: [{ required: true, message: '请输入基金账户资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-lend" />}
            >
              {getFieldDecorator('lend', {
                rules: [{ required: true, message: '请输入借出资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-alipay" />}
            >
              {getFieldDecorator('alipay', {
                rules: [{ required: true, message: '请输入支付宝账户资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-wechat-pay" />}
            >
              {getFieldDecorator('wechatPay', {
                rules: [{ required: true, message: '请输入微信账户资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-housing-fund" />}
            >
              {getFieldDecorator('housingFund', {
                rules: [{ required: true, message: '请输入公积金账户资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-digital-currency-account" />}
            >
              {getFieldDecorator('digitalCurrency', {
                rules: [{ required: true, message: '请输入数字货币账户资产' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">USD</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-other" />}
            >
              {getFieldDecorator('otherAsset')(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
          </Col>
        </Row>
        <Divider>负债</Divider>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-credit-card" />}
            >
              {getFieldDecorator('creditCard', {
                rules: [{ required: true, message: '请输入信用卡负债' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-borrow" />}
            >
              {getFieldDecorator('borrow', {
                rules: [{ required: true, message: '请输入借入负债' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-ant-check-later" />}
            >
              {getFieldDecorator('antCheckLater', {
                rules: [{ required: true, message: '请输入蚂蚁花呗负债' }],
              })(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
            <FormItem
              {...formItemStyle}
              colon={false}
              label={<IconFont type="icon-other" />}
            >
              {getFieldDecorator('otherLiability')(
                <InputNumber
                  style={{ width: '75%' }}
                  size="small"
                  min={0}
                  precision={2}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                />,
              )}
              <span className="ant-form-text">CNY</span>
            </FormItem>
          </Col>
        </Row>
        <Divider />
        <FormItem>
          <div className="form-buttons">
            <Button className="cancel-btn" onClick={this.cancel}>
              取消
            </Button>
            <Button
              className="confirm-btn"
              type="primary"
              onClick={this.confirm}
            >
              确定
            </Button>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const LiabilityForm = Form.create<LiabilityFormProps>({
  mapPropsToFields(props: LiabilityFormProps) {
    const values: any = {};
    const initialValues: any = props.initialValues;

    if (!!initialValues) {
      Object.keys(initialValues).forEach(k => {
        values[k] = Form.createFormField({ value: initialValues[k] });
      });
    }

    return values;
  },
})(OriginForm);

export default LiabilityForm;
