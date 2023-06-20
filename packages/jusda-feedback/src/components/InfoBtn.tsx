// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ConfigProvider, Tooltip, Badge } from "antd";
import DetailInfoFb from "./InfoDetail";
import { Icons, MyFeedbackIcon, Info } from "./SVG";
import QrCode from "../qrcode.png";
import { sccp_domain_prefix } from "@jusda-tools/url-config";
import LocalPermissionWrap from "@jusda-tools/local-permission";
import { request } from "./request";
import themStye from "./theme";
import locales from "./locale/locale";
const NewPopover = styled(Tooltip)`
  text-align: center;
  .jusda-feedback-popover-arrow {
    border-color: #2f2f2f;
  }
`;
const ClickBtn = styled.div`
  cursor: pointer;
  padding: 10px;
  .header-container {
    display: flex;
    height: 35px;
    padding-right: 5px;
  }
  .header-container:hover {
    .header-title {
      color: #ffc500;
    }
    svg path {
      fill: #ffc500;
    }
  }
  .qrcode {
    text-align: center;
    padding: 6px 3px;
    p {
      font-size: 12px;
      color: #cccccc;
      margin-bottom: 0px;
    }
    img {
      width: 67px;
      height: 67px;
    }
  }
  .header-title {
    font-family: PingFangSC-Semibold;
    margin-top: 4px;
    font-size: 12px;
    letter-spacing: 0;
    color: ${(props: any) => props?.themes?.textColor};
  }

  icons {
  }
  svg {
    width: 28px;
    height: 28px;
  }
  svg path {
    fill: ${(props: any) => props?.themes?.iconColor};
  }
`;
const InfosBtn = styled.div`
  width: 40px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #cccccc;
  border-radius: 2px;
  cursor: pointer;
  .want-feed {
    writing-mode: tb;
    margin-left: 7px;
    padding-bottom: 5px;
  }
`;
const CountBadge = styled(Badge)`
  .jusda-feedback-badge-count {
    background: #ffffff;
    border: 1px solid #ff6c6c;
    border-radius: 50%;
    padding: 0;
    line-height: 18px;
    height: 20px;
    width: 20px;
    box-shadow: unset;
    color: #ff6c6c;
  }
  .hovers:hover {
    background: #ffc500;
  }
`;

interface InfoBtn {
  bottom?: string;
  right?: string;
  theme?: string;
  locale?: string;
  localeKey?: string;
  showQrcode?: boolean;
  showText?: boolean;
  submit?: () => {};
  isBtnHidden?: boolean;
  isModalVisible?: boolean;
  closeModalCallback?: () => void;
}
window.timer = null;
const InfoBtn: React.SFC<InfoBtn> = (props: InfoBtn) => {
  const [detailControl, setDetailControl] = useState(false);
  const [count, setCount] = useState(0);

  const {
    theme = "light",
    locale,
    localeKey = "umi_locale",
    showQrcode = false,
    showText = true,
    submit = () => {},
    isBtnHidden = true,
    isModalVisible,
    closeModalCallback
  } = props;
  const currenTheme = themStye[theme];
  const browserLocale = (navigator.language || navigator.browserLanguage)
    .toLowerCase()
    .includes("zh")
    ? "zh-CN"
    : "en-US";
  let defaultLocale = localStorage.getItem(localeKey) || browserLocale;
  if (locale) {
    defaultLocale = locale;
  }
  const getCount = () => {
    request()
      .get("/juslink-common-feedback/feedbacks/unread-count")
      .then((res) => {
        if (res.success) {
          setCount(res.data);
        }
      });
  };
  window.Sdp.getCount = getCount;
  const jumpToMyFeedback = () => {
    window.open(`${sccp_domain_prefix}/fb/`, "_blank");
  };
  useEffect(() => {
    window.timer = setInterval(getCount, 2000000);
    getCount();
  }, []);

  useEffect(() => {
    setDetailControl(isModalVisible)
  }, [isModalVisible])

  const currentLocale = locales[defaultLocale];
  return (
    <ConfigProvider prefixCls="juslink">
      <div style={{ "display": isBtnHidden ? 'none' : '' }}>
        <NewPopover
          color="#2f2f2f"
          placement="leftBottom"
          title={
            <ClickBtn themes={currenTheme?.ClickBtn}>
              {showQrcode && (
                <LocalPermissionWrap>
                  <div className="qrcode">
                    <img src={QrCode}></img>
                    <p>{currentLocale?.ClickBtn.des}</p>
                  </div>
                </LocalPermissionWrap>
              )}
              <div
                className="header-container"
                onClick={() => setDetailControl(true)}
              >
                <Icons></Icons>
                <div className="header-title">
                  {currentLocale?.ClickBtn.headText}
                </div>
              </div>
              <div className="header-container" onClick={jumpToMyFeedback}>
                <CountBadge count={count} offset={[-29]}>
                  <MyFeedbackIcon />
                </CountBadge>
                <div className="header-title">
                  {currentLocale?.ClickBtn.myFeedback}
                </div>
              </div>
            </ClickBtn>
          }
        >
          <div>
            <CountBadge count={count}>
              <InfosBtn className={!showText ? "hovers" : ""}>
                <Info></Info>
                {showText && (
                  <div className="want-feed">{currentLocale?.InfosBtn.text}</div>
                )}
              </InfosBtn>
            </CountBadge>
          </div>
        </NewPopover>
      </div>

      <DetailInfoFb
        submit={submit}
        currenTheme={currenTheme}
        currentLocale={currentLocale}
        defaultLocale={defaultLocale}
        visible={detailControl}
        onCancel={() => {closeModalCallback&&closeModalCallback(); setDetailControl(false)}}
      />
    </ConfigProvider>
  );
};
export default InfoBtn;
