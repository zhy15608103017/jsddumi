//@ts-nocheck
import React, { useState, useEffect, Component } from "react";
//@ts-ignore
import domRender from '../utils/domRender.js';
//@ts-ignore
import { getLocale } from '../utils/fn.js';
import { currentLanguage } from '@jusda-tools/language-control-panel';
import request from '../utils/request';
import Joyride, { CallBackProps, STATUS, LIFECYCLE, Step, StoreHelpers, ACTIONS } from 'react-joyride';
import './UserGuide.less';

export class UserGuide extends Component {
    constructor(props: object) {
        super(props);
    }
    state = {
        joyrideRun: false,
        stepList: new Map(), // 数据集Map对象
        steps: [], // 传递给第三方组件的步骤
        apiProps: {}, // 组件参数
        tourIds: [], // 传给第三方组件的Steps对应的tourId集合
        locale: { back: 'Back', close: 'Close', last: 'Last', next: 'Next', skip: 'Skip' }
    }

    languageMap = new Map([['zh-CN', { back: '返回', close: '关闭', last: '结束', next: '下一步', skip: '跳过' }],
    ['en-US', { back: 'Back', close: 'Close', last: 'Last', next: 'Next', skip: 'Skip' }]
    ])

    componentDidMount() {
        const language = currentLanguage() || getLocale() || 'en-US';
        this.setState({
            locale: this.languageMap.get(language)
        });
    }

    inItData = (tourData: Array<object>, callback?: Function) => {
        let stepList = new Map();
        tourData.map((item: any) => {
            stepList.set(`${item.tourId}`, item);
        })

        this.setState({
            stepList: stepList
        }, () => {
            if (callback) {
                callback();
            }
        })
    }

    overrideApi = (apiProps: object) => {
        this.setState({
            apiProps,
        });
    }


    show = (tourIds: Array<string>) => {
        const { stepList } = this.state;
        const dataForCheck:Array<object> = [];
        tourIds.forEach( tourId => {
            let step = stepList.get(tourId);
            if(step){
                dataForCheck.push({
                    tourId,
                    version:step.version
                })
            }
        });
        this.checkData(dataForCheck).then((tourIds) => {
            let steps: Array<any> = [];
            (tourIds || []).map((item: object) => {
                // @ts-ignore
                const tour = stepList.get(`${item.tourId}`);
                if (tour) {
                    steps = steps.concat(tour.steps);
                }
            })
            this.setState({
                tourIds,
                steps: [...steps],
                joyrideRun: true,
            })
        });
    }

    replay = (tourIds: Array<object>, callback?: Function) => {
        // 调用中台接口校验数据
        return request("/tour-record/replay", {
            method: "POST",
            prefix: "/juslink-user-guide-service",
            data: tourIds
        }).then((res: any) => {
            const { data, success } = res
            if (success && data) {
                if(callback){
                    callback();
                }
            }
        }).catch(e => {console.error(e)});
    }


    checkData = async (tourIds: Array<object>) => {
        // 调用中台接口校验数据
        return request("/tour-record/undo", {
            method: "POST",
            prefix: "/juslink-user-guide-service",
            data: tourIds
        }).then((res: any) => {
            const { data, success } = res
            if (success) {
                return tourIds.filter((p: any) => data.includes(p.tourId));
            }
        }).catch(e => {console.error(e)});
    }

    markTourIds = (tourIds: any) => {
        request("/tour-record/mark", {
            method: "POST",
            prefix: "/juslink-user-guide-service",
            data: tourIds
        }).then((res: any) => {
            const { data, success } = res
        }).catch(e => {console.error(e)});
    }



    handleJoyrideCallback = (data: CallBackProps) => {
        // @ts-ignore
        const { callback } = this.state.apiProps;
        if (callback) {
            callback(data);
        }
        const { status, type, action, size, lifecycle, index } = data;
        const { tourIds } = this.state;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (action === ACTIONS.SKIP && lifecycle === LIFECYCLE.COMPLETE && status === STATUS.SKIPPED && index < tourIds.length) // 跳过
        {
            // 调用中台接口(该步骤已查看)
            const markDatas = tourIds.slice(index, tourIds.length);
            this.markTourIds(markDatas);
        }
        else if (lifecycle === LIFECYCLE.TOOLTIP) // 已经展示tooltip
        {
            // 调用中台接口(该步骤已查看)
            const tourId = tourIds[index];
            this.markTourIds([tourId]);
        }

        if (finishedStatuses.includes(status)) {
            this.setState({
                joyrideRun: false
            });
        }
    };

    render() {
        const { apiProps, joyrideRun, steps, locale } = this.state;
        return (
            <div className="jusda-userguide">
                {<Joyride
                    continuous={true}
                    // getHelpers={getHelpers}
                    run={joyrideRun}
                    scrollToFirstStep={true}
                    // showProgress={true}  // 在下一步中显示进度
                    showSkipButton={true}
                    // spotlightClicks ={true}
                    steps={[...steps]}
                    hideBackButton={true}
                    // disableCloseOnEsc={true}
                    // disableOverlay={true}
                    // disableOverlayClose={true}
                    // spotlightClicks={true}
                    disableScrollParentFix={true}
                    styles={{
                        options: {
                            zIndex: 10000,
                            textColor: '#222',
                            primaryColor: '#ffc500',
                            spotlightShadow: '0 0 0 #ffc500',
                        },
                        buttonNext: {
                            outline: 'none',
                            fontSize: 14,
                            color:"#444",
                            width: 90,
                            lineHeight: '14px',
                            height: 32,
                        },
                        buttonClose: {
                            outline: 'none',
                            fontSize: 14,
                            color:"#444",
                        },
                        buttonSkip: {
                            outline: 'none',
                            fontSize: 14,
                            color:'#444',
                            border:'1px solid #ccc',
                            borderRadius: 3,
                            width: 90,
                            lineHeight: '14px',
                            height: 32,
                        },
                        tooltip:{
                            padding:20,
                        },
                        tooltipContent:{
                            padding: '10px 10px 15px',
                        }
                    }}
                    locale={locale}
                    {...apiProps}
                    callback={this.handleJoyrideCallback}
                    key={steps.join(',')}
                />}
            </div>
        );
    }
}

let reactInstance = null
domRender(<UserGuide ref={c => { reactInstance = c }} />)
// 使用上面的工具函数
export default reactInstance;
