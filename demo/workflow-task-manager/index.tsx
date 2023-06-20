import React from 'react';
import BusinessIcon from '@jusda-tools/workflow-task-manager';
import Header from '@jusda-tools/jusda-header';

const App: any = () => {
  return (
    <div>
      <Header
        theme="light"
        locale="en-US"
        rightReactNode={
          <>
            <div
              style={{
                width: 50,
                height: 50,
                verticalAlign: 'baseline',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessIcon />
            </div>
          </>
        }
      />
    </div>
  );
};

export default App;