import Feedback, { Sdp } from '@jusda-tools/jusda-feedback';
import { ConfigProvider, Layout } from 'antd';
import authTools from '@jusda-tools/auth-tools';
import React from 'react';

const { AuthLogin } = authTools;

window.Sdp = new Sdp();

AuthLogin();

function App() {
    return (
        <ConfigProvider locale={'zh-CN'}>
            <Layout style={{ minHeight: '100vh' }}>
                <Feedback isModalVisible={true} />
            </Layout>
        </ConfigProvider>
    )
}

export default App;