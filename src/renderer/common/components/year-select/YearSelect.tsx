import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import moment from 'moment';

const Option = Select.Option;

interface YearSelectProps extends SelectProps {
  startYear: number;
  endYear: number;
}

export default class YearSelect extends React.Component<YearSelectProps> {
  private yearArr(): string[] {
    const { startYear, endYear } = this.props;
    let arr: string[] = [];
    for (let i = startYear; i <= endYear; i++) {
      arr.push(i.toString());
    }
    return arr;
  }

  render() {
    return (
      <Select {...this.props}>
        {this.yearArr().map((year: string) => (
          <Option
            // disabled={moment(year).isAfter(moment())}
            key={year}
            value={year}
          >
            {year}
          </Option>
        ))}
      </Select>
    );
  }
}
