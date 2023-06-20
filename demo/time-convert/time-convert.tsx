
import React from "react"
import TimeConvert from "@jusda-tools/time-convert"
import { Form, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
export default () => {
    const [form] = useForm()
    const onOk = (time: Date, timezone: string) => {
        
        console.log("默认返回时间和时区信息：", time, timezone)
        console.log("按选择时区转换时间：", TimeConvert.convertByTimezone({
            time,
            originTimezone: timezone
        }))
        console.log("自定义时间格式：", TimeConvert.convertByTimezone({
            time,
            format: 'YYYY-MM-DD',
            originTimezone: timezone
        }))
        console.log("不带时区信息：", TimeConvert.convertByTimezone({
            time,
            format: 'YYYY-MM-DD',
            originTimezone: timezone,
            withTimezone: false
        }))
    }
    const submit = () => {
        console.log(form.getFieldsValue())
    }
    return <Form form={form}>
        <Form.Item name="dateTime" initialValue={'1652063307866'}>
            <TimeConvert.TimezoneComponent
                 onOk={onOk} convertConfig={{withTimezone: true}}/>
        </Form.Item>
        
        <Form.Item><Button onClick={submit}>提交</Button></Form.Item>
    </Form>
}
