import { Input, Form, Button, Table, Tabs } from 'antd';
import './jusda-baseStyle.css';
const AppLayout = (props) => {
  const [form] = Form.useForm();
  const onFinish = () => {
    form.submit();
  };
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="jusda-main-container">
      {/* 搜索部分 */}
      <div className="jusda-search-container">
        <Form onFinish={onFinish} form={form} layout={'vertical'}>
          <div className="jusda-search-contents">
            <div className={`jusda-search-wrapper`}>
              {array.map((item) => {
                return (
                  <div className="jusda-search-item">
                    <Form.Item name={item} label={`测试${item}`}>
                      <Input />
                    </Form.Item>
                  </div>
                );
              })}
            </div>
            <div className="jusda-search-buttons-wrapper">
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                className={'jusda-search-btn jusda-search-btn-normal'}
              >
                清除
              </Button>
              <Button type="primary" className={'jusda-search-btn'}>
                搜索
              </Button>
            </div>
          </div>
        </Form>
        {/* '展开更多' '可选' 自行添加需要的图标   */}
        <div className="jusda-search-switch" />
      </div>
      {/* 有嵌套样式的表格 */}
      <div className="jusda-nested-table-container">
        <Table />
      </div>
      {/* tabs 卡片样式 */}
      <div className="jusda-tabs-container">
        <Tabs
          type="card"
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />
      </div>
    </div>
  );
};

export default AppLayout;
