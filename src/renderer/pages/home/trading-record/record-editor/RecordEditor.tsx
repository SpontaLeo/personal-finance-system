import './RecordEditor.scss';
import 'braft-editor/dist/index.css';

import BraftEditor, { ControlType, EditorState } from 'braft-editor';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import TradingRecordStore from '../../../../stores/TradingRecordStore';

const controls: ControlType[] = [
  'bold',
  'italic',
  'underline',
  'text-color',
  'separator',
  'link',
  'separator',
  'media',
];

const FormItem = Form.Item;

const formItemStyle = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  style: {
    marginBottom: 0,
  },
};

enum EditorFormField {
  TITLE = 'title',
  TAGS = 'tags',
  CONTENT = 'content',
}

export type EditorFormFieldValues = {
  title: string;
  tags: string[];
  content: EditorState;
};

type EditorFormFieldErrors = {
  [key in EditorFormField]: {
    errors: {
      message: string;
      field: EditorFormField;
    }[];
  };
};

interface EditorFormProps extends FormComponentProps {
  tradingRecordStore?: TradingRecordStore;
}

interface EditorFormState {
  editing: boolean;
}

class EditorForm extends React.Component<EditorFormProps, EditorFormState> {
  state = {
    editing: false,
  };

  cancel = () => {
    const { form, tradingRecordStore } = this.props;
    const { endEdit } = tradingRecordStore!;

    form.resetFields();
    endEdit();
  };

  confirm = () => {
    const { form, tradingRecordStore } = this.props;
    const {
      createTradingRecord,
      updateTradingRecord,
      editingRecord,
    } = tradingRecordStore!;

    form.validateFieldsAndScroll(
      (errors: EditorFormFieldErrors, values: EditorFormFieldValues) => {
        if (!errors) {
          if (!!editingRecord) {
            updateTradingRecord({
              title: values.title,
              tags: values.tags,
              content: JSON.stringify(
                // toRAW的接口返回类型为 RawDraftContentState | string，其中第一种类型为draft-js提供
                values.content.toRAW(),
              ),
            });
          } else {
            createTradingRecord({
              title: values.title,
              tags: values.tags,
              content: JSON.stringify(values.content.toRAW()),
            });
          }
        }
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="record-editor">
        <FormItem {...formItemStyle} label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题' }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemStyle} label="标签">
          {getFieldDecorator('tags')(<Input />)}
        </FormItem>
        <FormItem className="editor-container" {...formItemStyle} label="正文">
          {getFieldDecorator('content', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文');
                  } else {
                    callback();
                  }
                },
              },
            ],
          })(<BraftEditor controls={controls} placeholder="写点交易心得吧" />)}
        </FormItem>
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

const RecordEditor = Form.create<EditorFormProps>({
  mapPropsToFields(props: EditorFormProps) {
    const values: any = {};
    const { editingRecord } = props.tradingRecordStore!;

    if (!!editingRecord) {
      Object.keys(editingRecord).forEach(k => {
        if (k !== 'content') {
          values[k] = Form.createFormField({
            value: (editingRecord as any)[k],
          });
        } else {
          values[k] = Form.createFormField({
            // 保存时序列化，初始化时反序列化
            value: BraftEditor.createEditorState(JSON.parse(editingRecord[k])),
          });
        }
      });
    }

    return values;
  },
})(EditorForm);

export default inject('tradingRecordStore')(observer(RecordEditor));
