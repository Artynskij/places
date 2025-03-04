"use client";

import { Pagination } from "antd";
import { PaginationProps } from "antd/lib";
import { useState } from "react";
interface IPaginationAntProp {
  totalCount: number;
  defaultPage: number;
  
}
export const PaginationAnt = (prop: IPaginationAntProp) => {
  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  return (
    <Pagination
      // showSizeChanger
      // onShowSizeChange={onShowSizeChange}
      onChange={onChange}
      // defaultCurrent={1}
      current={current}
      total={prop.totalCount}
      defaultPageSize={prop.defaultPage}
      showSizeChanger={false}
    />
  );
};
