// @ts-ignore
import * as React from 'react';
declare type OverlayFunc = () => React.ReactElement;


declare const Placements: ["topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight"];
declare type Placement = typeof Placements[number];
declare type Align = {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: {
        adjustX?: boolean;
        adjustY?: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
};

interface OpenTargetTabConfigType {
    helpCenter?: boolean;
    announcementCenter?: boolean;
    personalCenter?: boolean;
    messagesCenter?: boolean;
}

declare type userIdentitySwitcherType = {
    enable?: boolean;
    requirePermission?: boolean;
    subMenuWrapClassName?: string;
};
export interface UserControlPanelProps {
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    overlay?: React.ReactElement | OverlayFunc;
    onVisibleChange?: (visible: boolean) => void;
    visible?: boolean;
    disabled?: boolean;
    align?: Align;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    forceRender?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    openClassName?: string;
    theme?: string;
    locale?: string;
    userIdentitySwitcher?: userIdentitySwitcherType;
    onLogout?: () => void;
    onIdentityChange?: () => void;
    openTargetTabConfig?: OpenTargetTabConfigType;
}

export default class UserControlPanel extends React.Component<UserControlPanelProps, any> {
    render(): JSX.Element;
}
