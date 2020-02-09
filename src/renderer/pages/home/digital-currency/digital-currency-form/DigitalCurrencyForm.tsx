import './DigitalCurrencyForm.scss';

import { Button, Divider, Form, InputNumber } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import { IconFont } from '../../../../common/components';
import React from 'react';

const FormItem = Form.Item;

const formItemStyle = {
  labelCol: { span: 4, offset: 3 },
  wrapperCol: { span: 12 },
  style: {
    marginBottom: 0,
  },
};

enum DigitalCurrencyField {
  BINANCE = 'binance',
  OKEX = 'okex',
  HUOBI = 'huobi',
  HOPEX = 'hopex',
}

export type DigitalCurrencyFieldValues = {
  binance: number;
  okex: number;
  huobi: number;
  hopex: number;
};

type DigitalCurrencyFieldErrors = {
  [key in DigitalCurrencyField]: {
    errors: {
      message: string;
      field: DigitalCurrencyField;
    }[];
  };
};

interface DigitalCurrencyFormProps extends FormComponentProps {
  onConfirm: (values: DigitalCurrencyFieldValues) => void;
  onCancel: () => void;
  initialValues?: DigitalCurrencyFieldValues;
}

class OriginForm extends React.Component<DigitalCurrencyFormProps> {
  cancel = () => {
    const { form, onCancel } = this.props;

    form.resetFields();
    onCancel && onCancel();
  };

  confirm = () => {
    const { form, onConfirm } = this.props;

    form.validateFieldsAndScroll(
      (
        errors: DigitalCurrencyFieldErrors,
        values: DigitalCurrencyFieldValues,
      ) => {
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
      <Form className="digital-currency-form">
        <FormItem
          {...formItemStyle}
          colon={false}
          label={<IconFont type="icon-binance" />}
        >
          {getFieldDecorator('binance', {
            rules: [{ required: true, message: '请输入Binance账户金额' }],
          })(
            <InputNumber
              style={{ width: '80%' }}
              size="small"
              min={0}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
            />,
          )}
          <span className="ant-form-text"> USD</span>
        </FormItem>
        <FormItem
          {...formItemStyle}
          colon={false}
          label={<IconFont type="icon-okex" />}
        >
          {getFieldDecorator('okex', {
            rules: [{ required: true, message: '请输入okex账户金额' }],
          })(
            <InputNumber
              style={{ width: '80%' }}
              size="small"
              min={0}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
            />,
          )}
          <span className="ant-form-text"> USD</span>
        </FormItem>
        <FormItem
          {...formItemStyle}
          colon={false}
          label={<IconFont type="icon-huobi" />}
        >
          {getFieldDecorator('huobi', {
            rules: [{ required: true, message: '请输入火币账户金额' }],
          })(
            <InputNumber
              style={{ width: '80%' }}
              size="small"
              min={0}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
            />,
          )}
          <span className="ant-form-text"> USD</span>
        </FormItem>
        <FormItem
          {...formItemStyle}
          colon={false}
          label={<IconFont type="icon-hopex" />}
        >
          {getFieldDecorator('hopex', {
            rules: [{ required: true, message: '请输入hopex账户金额' }],
          })(
            <InputNumber
              style={{ width: '80%' }}
              size="small"
              min={0}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
            />,
          )}
          <span className="ant-form-text"> USD</span>
        </FormItem>
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

const DigitalCurrencyForm = Form.create<DigitalCurrencyFormProps>({
  mapPropsToFields(props: DigitalCurrencyFormProps) {
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

export default DigitalCurrencyForm;
