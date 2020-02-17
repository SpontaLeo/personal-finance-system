import './RecordDetail.scss';

import { Col, Divider, Row, Tag } from 'antd';
import { inject, observer } from 'mobx-react';

import BraftEditor from 'braft-editor';
import React from 'react';
import { TradingCategory } from '../../../../common/constants/TradingCategory';
import TradingRecordStore from '../../../../stores/TradingRecordStore';
import moment from 'moment';

interface RecordDetailProps {
  tradingRecordStore?: TradingRecordStore;
}

@inject('tradingRecordStore')
@observer
export default class RecordDetail extends React.Component<RecordDetailProps> {
  render() {
    const selectedRecord = this.props.tradingRecordStore!.selectedRecord!;

    const categoryItem = TradingCategory.filter(
      category => category.key === selectedRecord.category,
    )[0]!;

    return (
      <div className="record-detail">
        <h2 className="title">{selectedRecord.title}</h2>
        <Row type="flex" justify="space-between">
          <Col span={4}>
            {moment(selectedRecord.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </Col>
          <Col span={3}>
            <Tag className="meta-category-tag" color={categoryItem.color}>
              {categoryItem.title}
            </Tag>
          </Col>
          <Col span={3}>
            <span className="meta-target">{selectedRecord.target}</span>
          </Col>
        </Row>
        <Divider className="divider" />
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: BraftEditor.createEditorState(
              selectedRecord.content,
            ).toHTML(),
          }}
        ></div>
      </div>
    );
  }
}
