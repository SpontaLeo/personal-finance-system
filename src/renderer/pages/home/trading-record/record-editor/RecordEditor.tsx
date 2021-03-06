import './RecordEditor.scss';
import 'braft-editor/dist/index.css';

import BraftEditor, {
  ControlType,
  EditorState,
  ExtendControlType,
} from 'braft-editor';
import { Button, Col, Form, Icon, Input, Modal, Row, Select } from 'antd';
import {
  TradingCategory,
  TradingRecordKtItem,
} from '../../../../common/constants/TradingCategory';
import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import TradingRecordStore from '../../../../stores/TradingRecordStore';
import { trimHtml } from '../../../../common/methods/index';

const controls: ControlType[] = [
  'undo',
  'redo',
  'clear',
  'headings',
  'hr',
  'separator',
  'bold',
  'italic',
  'underline',
  'text-color',
  'text-align',
  'text-indent',
  'remove-styles',
  'blockquote',
  'media',
  'separator',
  'fullscreen',
];

const FormItem = Form.Item;
const Option = Select.Option;

const formItemStyle = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  style: {
    marginBottom: 0,
  },
};

const EditorItemStyle = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};

const categoryAndTargetItemStyle = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
  style: {
    marginBottom: 0,
  },
};

enum EditorFormField {
  TITLE = 'title',
  CATEGORY = 'category',
  TARGET = 'target',
  CONTENT = 'content',
}

export type EditorFormFieldValues = {
  title: string;
  category: string;
  target: string;
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
  editorState: EditorState;
  isPreviewing: boolean;
}

class EditorForm extends React.Component<EditorFormProps, EditorFormState> {
  constructor(props: EditorFormProps) {
    super(props);
    const { selectedRecord } = props.tradingRecordStore!;

    this.state = {
      editing: false,
      editorState: BraftEditor.createEditorState(
        selectedRecord ? selectedRecord.content : '',
      ),
      isPreviewing: false,
    };
  }

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
      selectedRecord,
    } = tradingRecordStore!;

    form.validateFieldsAndScroll(
      (errors: EditorFormFieldErrors, values: EditorFormFieldValues) => {
        if (!errors) {
          if (!!selectedRecord) {
            updateTradingRecord({
              title: values.title,
              category: values.category,
              target: values.target,
              content: JSON.stringify(
                // toRAW的接口返回类型为 RawDraftContentState | string，其中第一种类型为draft-js提供
                values.content.toRAW(),
              ),
              brief: trimHtml(values.content.toHTML()),
            });
          } else {
            createTradingRecord({
              title: values.title,
              category: values.category,
              target: values.target,
              content: JSON.stringify(values.content.toRAW()),
              brief: trimHtml(values.content.toHTML()),
            });
          }
        }
      },
    );
  };

  preview = () => {
    this.setState({
      isPreviewing: true,
    });
  };

  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  extendControls: ExtendControlType[] = [
    {
      key: 'custom-button',
      type: 'button',
      text: <Icon type="eye" />,
      onClick: this.preview,
    },
  ];

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editorState, isPreviewing } = this.state;

    return (
      <div className="record-editor">
        <Form>
          <FormItem {...formItemStyle} label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
            })(<Input />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem {...categoryAndTargetItemStyle} label="类型">
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: '请选择类型' }],
                })(
                  <Select>
                    {TradingCategory.map((category: TradingRecordKtItem) => (
                      <Option key={category.key} value={category.key}>
                        {category.title}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...categoryAndTargetItemStyle} label="品种">
                {getFieldDecorator('target', {
                  rules: [{ required: true, message: '请输入品种' }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            className="editor-container"
            {...EditorItemStyle}
            label="正文"
          >
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
            })(
              <BraftEditor
                controls={controls}
                extendControls={this.extendControls}
                onChange={this.handleChange}
                placeholder="写点交易心得吧"
              />,
            )}
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
        <Modal
          className="editor-preview"
          visible={isPreviewing}
          width="80vw"
          bodyStyle={{
            width: '80vw',
            height: '80vh',
            overflow: 'auto',
          }}
          maskClosable={false}
          centered={true}
          footer={null}
          onCancel={() => {
            this.setState({
              isPreviewing: false,
            });
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: editorState.toHTML(),
            }}
          ></div>
        </Modal>
      </div>
    );
  }
}

const RecordEditor = Form.create<EditorFormProps>({
  mapPropsToFields(props: EditorFormProps) {
    const values: any = {};
    const { selectedRecord } = props.tradingRecordStore!;

    if (!!selectedRecord) {
      Object.keys(selectedRecord).forEach(k => {
        if (k !== 'content') {
          values[k] = Form.createFormField({
            value: (selectedRecord as any)[k],
          });
        } else {
          values[k] = Form.createFormField({
            // 保存时序列化，初始化时反序列化
            value: BraftEditor.createEditorState(JSON.parse(selectedRecord[k])),
          });
        }
      });
    }

    return values;
  },
})(EditorForm);

export default inject('tradingRecordStore')(observer(RecordEditor));
