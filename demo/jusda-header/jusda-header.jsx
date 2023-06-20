import Header from '@jusda-tools/jusda-header';
import LanguageControlPanel from '@jusda-tools/language-control-panel';

const AppLayout = (props) => {

    return (
        <div>
            <div>
                <Header 
                // showNavigation={false} 
                theme="light"
                locale="zh-CN"
                rightReactNode={<LanguageControlPanel locale={"zh-CN"} />}
                />
            </div>
        </div>
    );
};

export default AppLayout;