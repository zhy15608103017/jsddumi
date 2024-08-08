
import React, { useEffect, useMemo, useState } from 'react';
import { Table, message, } from 'antd';
import SearchForm from './components/SearchForm';
import IntegerRange from './components/IntegerRange';
import FloatRange from './components/FloatRange';
import useExtensionalPropertyQuery from './hooks/useExtensionalPropertyQuery';
import { fetchBusinessData } from './utils/services';

const tableColumns = ['status', 'transportModeCode', 'orderNo', 'customerOrderNo', 'extensionalData']
function ComponentTest() {
  const configurations = useExtensionalPropertyQuery();
  const [pageInfo, setPageInfo] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [pageTotal, setPageTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [extensionQuery, setExtensionQuery] = useState([])

  const fetchData = async () => {
    const resp = await fetchBusinessData({ ...pageInfo, extendedQueryParameters: extensionQuery });
    const { success, data } = resp;
    if (!success) {
      setDataSource([]);
      message.error('request failed');
      return
    }
    setDataSource(data?.content || []);
    setPageTotal(data?.totalElements || 0);
  }

  const columns = useMemo(() => {
    return tableColumns.map((item) => ({
      title: item,
      dataIndex: item
    }))
  }, [])

  useEffect(() => {
    fetchData();
  }, [extensionQuery,pageInfo])
  return <>
    <SearchForm
      subFilterConfigurations={configurations}
      onSearch={(value) => { setExtensionQuery(value) }}
      mode="multiple"
      widgets={{ IntegerRange, FloatRange }}
    />
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        current: pageInfo.pageIndex + 1,
        pageSize: pageInfo.pageSize,
        total: pageTotal,
        onChange: (pageIndex, pageSize) => {
          setPageInfo({ ...pageInfo, pageIndex: pageIndex || 0, pageSize });
        }
      }}
    />
  </>;
}

export default ComponentTest;


