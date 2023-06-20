import React, { FunctionComponent } from 'react';
import { Menu, Button, Upload, Popover, message } from 'antd';
import './index.less';

interface TabsProps {
    handleClick?: (key: any) => void;
    list?: Array<any>;
    btns?: Array<any>;
    defaultTab?: string;
}

const Tabs: FunctionComponent<TabsProps> = (props) => {




    const { list = [], handleClick, defaultTab } = props;
    return (
        <div className="task-tabs">
            
            <Menu defaultSelectedKeys={[defaultTab as any]} mode="horizontal" onClick={handleClick}>
                {list.map((each, i) => {
                    // eslint-disable-next-line no-prototype-builtins
                    if (each.hasOwnProperty('num')) {
                        return (
                            <Menu.Item key={each.key}>
                                <span>
                                    {each.status}({each.num})
                                </span>
                            </Menu.Item>
                        );
                    } else {
                        return (
                            <Menu.Item key={each.key}>
                                <span>{each.status}</span>
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        </div>
    );
};
export default Tabs;
