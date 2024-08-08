import React from "react";
import {ReportPermissionIframe} from '@jusda-tools/report-permission';

const App = () => {

    return (
        <div style={{ width: '100%', height: 500}}>
            <ReportPermissionIframe reportUrl="https://mpdev.jus-link.com/webroot/decision/v5/design/report/11f671b5e9024e2bbd034d1eff75e7dc/view?multi_tenancy_code=TEN_5182316103540195328&locale_code=zh_CN" />
        </div>
    );
};

export default App;
