import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { RegExpStr } from "../../utils/Fn";

const EnglishInput = ({
  onChange = () => {},
  changeValue = () => {},
  value = "",
  ...params
}: any) => {
  const [val, setVal] = useState("");

  const handleChange = (value: string) => {
    const newValue = value?.replace(RegExpStr.notChinese, "");
    setVal(newValue);
    onChange(newValue);
    changeValue(newValue);
  };

  useEffect(() => {
    if (val !== value) {
      handleChange(value);
    }
  }, [value]);

  return (
    <Input
      value={val}
      onChange={(e) => handleChange(e.target.value)}
      {...params}
    />
  );
};

export default EnglishInput;
