/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import * as React from "react";
import { CookieTools, JUSDA_LANGUAGE } from '@jusda-tools/jusda-publicmethod';
import { enIcon, zhIcon } from './icons';
import "./LanguageControlPanel.less";

const { useState } = React;

type localeType = "en-US" | "zh-CN" | "zh";
interface LanguageControlPanelType {
  onClick: (value: string) => void;
  theme?: "dark" | "light";
  locale: localeType;
}

const languages: {
  locale: localeType;
  name: string;
  icon: any;
}[] = [
    {
      locale: "zh-CN",
      name: "中文",
      icon: zhIcon,
    },
    {
      locale: "en-US",
      name: "EN",
      icon: enIcon,
    },
  ];

const LanguageControlPanel = ({
  onClick = () => {},
  theme = "light",
  locale = 'en-US',
}: LanguageControlPanelType) => {
  const [activeLocale, setActiveLocale] = useState('en-US');
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const handleClick = (locale: localeType) => {
    var farFuture = new Date(new Date().getTime() + (1000*60*60*24*365*1)); // 设置cookie过期时间为1年
    new CookieTools().set({ key: JUSDA_LANGUAGE, value: locale, configuration: { expires: farFuture } });
    setVisible(false);
    setActiveLocale(locale);
    onClick(locale);
  };

  React.useEffect(() => {
    ['en-US', 'zh-CN'].includes(locale) && setActiveLocale(locale);
  },[locale]);

  const activeLanguage = languages.filter(
    (item) => activeLocale === item.locale
  )[0];
  return (
    <div className="language-control-panel-container">
      <ul onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={theme}>
        <div className="active">
          {activeLanguage.icon}
        </div>
        <div className="shadow">
          {languages && languages.length
            ? languages.map(({ name, locale }, index) => {
              return (
                <li
                  className={`${visible ? "visible" : ""} ${
                    languages.length - 1 === index ? "lastChild" : ""
                    }`}
                  key={locale}
                  onClick={() => {
                    handleClick(locale);
                  }}
                >
                  {name}
                </li>
              );
            })
            : null}
        </div>
      </ul>
    </div>
  );
};

export default LanguageControlPanel;

