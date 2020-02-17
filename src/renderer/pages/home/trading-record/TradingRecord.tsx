import './TradingRecord.scss';
import 'braft-editor/dist/index.css';

import { Button, Icon, List, Statistic } from 'antd';
import { inject, observer } from 'mobx-react';

import { IconFont } from '../../../common/components';
import { ItemActionType } from '../../../common/constants/interface';
import React from 'react';
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
          itemLayout="horizontal"
          dataSource={tradingRecordData}
          pagination={
            tradingRecordData.length > 5
              ? {
                  pageSize: 5,
                }
              : false
          }
          renderItem={item => (
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
                  <Button className="view-btn" type="link">
                    {item.title}
                  </Button>
                }
                description={item.brief}
              />
              <div>{item.tags}</div>
            </ListItem>
          )}
        />
      </div>
    );
  }
}
