import address from "./pages/address";

const intlFn = (locales: any) => {
  const language = localStorage.getItem("address_locale") || "zh-CN";
  return locales[language] || {};
};

export const addressIntl = intlFn(address);
