import './FundForm.scss';

import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

const formItemStyle = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
  style: {
    marginBottom: 0,
  },
};

enum FundItemField {
  DATE = 'date',
  TRAGET = 'target',
  AMOUNT = 'amount',
  ACTION = 'action',
  PRICE = 'price',
  PE = 'pe',
  PB = 'pb',
  DIVIDEND_YIELD_RATIO = 'dividendYieldRatio',
  REMARK = 'remark',
}

export type FundItemFieldValues = {
  date: string;
  target: string;
  amount: number;
  action: 'buy' | 'sell';
  price: number;
  pe: number;
  pb: number;
  dividendYieldRatio: number;
  remark: string;
};

type FundItemFieldErrors = {
  [key in FundItemField]: {
    errors: {
      message: string;
      field: FundItemField;
    }[];
  };
};

interface FundFormProps extends FormComponentProps {
  onConfirm: (values: FundItemFieldValues) => void;
  onCancel: () => void;
  initialValues?: FundItemFieldValues;
}

class OriginForm extends React.Component<FundFormProps> {
  onPEChange = (value: any) => {
    const { setFieldsValue } = this.props.form;

    setFieldsValue({
      ep: value ? (1 / value) * 100 : '',
    });
  };

  cancel = () => {
    const { form, onCancel } = this.props;

    form.resetFields();
    onCancel && onCancel();
  };

  confirm = () => {
    const { form, onConfirm } = this.props;

    form.validateFieldsAndScroll(
      (errors: FundItemFieldErrors, values: FundItemFieldValues) => {
        if (!errors) {
          onConfirm && onConfirm(values);
        }
      },
    );
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form className="fund-form">
        <FormItem {...formItemStyle} label="日期">
          {getFieldDecorator('date', {
            rules: [{ required: true, message: '请选择日期' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              size="small"
              disabledDate={(currentDate: moment.Moment | null) =>
                currentDate!.isBefore(moment('2020-01-01')) ||
                currentDate!.isAfter(moment('2099-12-31'))
              }
            />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="标的">
          {getFieldDecorator('target', {
            rules: [{ required: true, message: '请选择标的' }],
          })(
            <Select size="small">
              {/* 这部分做成全局可配置化 */}
              <Option value="华夏300">华夏300ETF</Option>
              <Option value="H股指数">H股ETF</Option>
              <Option value="医药ETF">医药ETF</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="金额(CNY)">
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: '请输入金额' }],
          })(
            <InputNumber
              style={{ width: '100%' }}
              size="small"
              min={0}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
            />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="操作">
          {getFieldDecorator('action', {
            rules: [{ required: true, message: '请选择操作' }],
          })(
            <RadioGroup size="small">
              <Radio value="buy">买入</Radio>
              <Radio value="sell">卖出</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="价格">
          {getFieldDecorator('price', {
            rules: [{ required: true, message: '请输入价格' }],
          })(
            <InputNumber
              style={{ width: '100%' }}
              size="small"
              min={0}
              step={0.01}
            />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="市盈率(静)(PE)">
          {getFieldDecorator('pe')(
            <InputNumber
              style={{ width: '100%' }}
              size="small"
              min={0}
              onChange={this.onPEChange}
            />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="市净率(PB)">
          {getFieldDecorator('pb')(
            <InputNumber style={{ width: '100%' }} size="small" min={0} />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="股息率(%)">
          {getFieldDecorator('dividendYieldRatio')(
            <InputNumber
              size="small"
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={0.01}
            />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="盈利收益率(%)">
          {getFieldDecorator('ep')(
            <InputNumber
              size="small"
              style={{ width: '100%' }}
              disabled
              min={0}
              precision={2}
            />,
          )}
        </FormItem>
        <FormItem {...formItemStyle} label="备注">
          {getFieldDecorator('remark')(<TextArea />)}
        </FormItem>
        <Divider />
        <FormItem>
          <div className="fund-form-buttons">
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

const FundForm = Form.create<FundFormProps>({
  mapPropsToFields(props: FundFormProps) {
    const values: any = {};
    const initialValues: any = props.initialValues;

    if (!!initialValues) {
      Object.keys(initialValues).forEach(k => {
        values[k] = Form.createFormField({
          value: initialValues[k],
        });
      });
    }

    return values;
  },
})(OriginForm);

export default FundForm;
