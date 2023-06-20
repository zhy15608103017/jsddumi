import { pageViewAction } from '@jusda-tools/action-decorator';

const App = () => {
    pageViewAction();
  return (
    <div>
      埋点信息需查看接口调用
    </div>
  );
};

export default App;