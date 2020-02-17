import './TradingRecord.scss';
import 'braft-editor/dist/index.css';

import { Button, Col, Icon, List, Row, Statistic, Tag } from 'antd';
import { inject, observer } from 'mobx-react';

import { IconFont } from '../../../common/components';
import { ItemActionType } from '../../../common/constants/interface';
import React from 'react';
import { TradingCategory } from '../../../common/constants/TradingCategory';
import TradingRecordStore from '../../../stores/TradingRecordStore';

const ListItem = List.Item;
const Meta = List.Item.Meta;

interface TradingRecordProps {
  tradingRecordStore?: TradingRecordStore;
}

@inject('tradingRecordStore')
@observer
export default class TradingRecord extends React.Component<TradingRecordProps> {
  render() {
    const {
      jumpToEditor,
      tradingRecordData,
      deleteTradingRecord,
      viewRecordDetail,
    } = this.props.tradingRecordStore!;

    return (
      <div className="trading-record">
        <div className="tool-bar">
          <Button type="primary" onClick={e => jumpToEditor()}>
            新增交易记录
          </Button>
          <Statistic
            value={tradingRecordData.length}
            suffix={<IconFont type="icon-piece" />}
          />
        </div>
        <List
          locale={{
            emptyText: '开始记录你的交易吧~',
          }}
          itemLayout="horizontal"
          dataSource={tradingRecordData}
          pagination={
            tradingRecordData.length > 5
              ? {
                  pageSize: 5,
                }
              : false
          }
          renderItem={item => {
            const categoryItem = TradingCategory.filter(
              category => category.key === item.category,
            )[0]!;

            return (
              <ListItem
                actions={[
                  <Button
                    className="edit-btn"
                    type="link"
                    onClick={e => jumpToEditor(ItemActionType.UPDATE, item)}
                  >
                    <Icon type="edit" />
                  </Button>,
                  <Button
                    className="delete-btn"
                    type="link"
                    onClick={e => deleteTradingRecord(item.id)}
                  >
                    <Icon type="delete" />
                  </Button>,
                ]}
              >
                <Meta
                  title={
                    <Row className="meta-content">
                      <Col span={16}>
                        <Button
                          className="view-btn"
                          type="link"
                          onClick={e => viewRecordDetail(item)}
                        >
                          {item.title}
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Tag
                          className="meta-category-tag"
                          color={categoryItem.color}
                        >
                          {categoryItem.title}
                        </Tag>
                      </Col>
                      <Col span={4}>
                        <span className="meta-target">{item.target}</span>
                      </Col>
                    </Row>
                  }
                  description={item.brief}
                />
              </ListItem>
            );
          }}
        />
      </div>
    );
  }
}
