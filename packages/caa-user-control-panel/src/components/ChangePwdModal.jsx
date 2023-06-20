/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prefer-promise-reject-errors */
import React, { useState } from 'react';
import request from '@jusda-tools/web-api-client';
import intl from 'react-intl-universal';
import {
    Modal, Form, Input, Button, Row, message,
} from 'antd';
import { iconEmailSuccess, iconExclamationCircleOutlined } from '../icons/index.jsx';

const passwordReg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[_,./?<>:"|';}\-{\[\]=+~!@#$%^&*()`\\])[0-9a-zA-Z_,./?<>:"|';}\-{\[\]=+~!@#$%^&*()`\\]{8,16}$/;
const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z0-9]{2,6}$/;


const ChangePwd = (props) => {
    const [form] = Form.useForm();
    const { setPanelMode, onCancel, api: { changePasswordUrl } } = props;
    const onFinish = async (values) => {
        const data = await request(changePasswordUrl, {
            method: 'PATCH',
            data: values,
        });
        if (data.errorCode === 'ERROR_PASSWORD') {
            form.setFields([{ name: 'oldPassword', errors: [intl.get('UserControlPanel.errorPassword')] }]);
        }
        if (data.errorCode === '40015') {
            form.setFields([{ name: 'newPassword', errors: [intl.get('UserControlPanel.newPwdNotSameOldPwd')] }]);
        }
        if (data.success) {
            message.success(intl.get('UserControlPanel.changePasswordSuccess'));
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };
    return (
        <Form
            form={form}
            onFinish={onFinish}
            wrapperCol={{ span: 12 }}
            labelCol={{ span: 4, offset: 3 }}
            style={{ position: 'relative' }}
        >
            <Form.Item
                label={intl.get('UserControlPanel.currentPassword')}
                name="oldPassword"
                rules={[{ required: true, message: intl.get('UserControlPanel.pleaseEnterTheCurrentPassword') }]}
            >
                <Input.Password allowClear />
            </Form.Item>

            <Form.Item
                label={intl.get('UserControlPanel.newPassword')}
                name="newPassword"
                rules={[
                    { required: true, message: intl.get('UserControlPanel.pleaseEnterNewPassword') },
                    { pattern: passwordReg, message: intl.get('UserControlPanel.passwordDoesComplyWithTheRulesPleaseREenter') },
                ]}
            >
                <Input.Password allowClear />
            </Form.Item>

            <Form.Item
                label={intl.get('UserControlPanel.confirmPassword')}
                name="repeatPassword"
                dependencies={['newPassword']}
                rules={[
                    { required: true, message: intl.get('UserControlPanel.pleaseEnterTheConfirmationPassword') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(intl.get('UserControlPanel.passwordsAreInconsistent'));
                        },
                    }),
                ]}
            >
                <Input.Password allowClear />
            </Form.Item>

            <div style={{ textAlign: 'center', paddingBottom: 20 }} className="desc-dark">{intl.get('UserControlPanel.passwordFormatDesc')}</div>

            <Row justify="center">
                <Button onClick={onCancel}>
                    {intl.get('UserControlPanel.cancel')}
                </Button>
              &emsp;&emsp;
                <Button type="primary" htmlType="submit">
                    {intl.get('UserControlPanel.submit')}
                </Button>
            </Row>

            <a
                style={{
                    position: 'absolute', top: 4, right: 90, color: '#EA9000',
                }}
                onClick={() => setPanelMode('RestPwd')}
            >{intl.get('UserControlPanel.forgotten')}？
            </a>
        </Form>
    );
};

const RestPwd = (props) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const {
        setPanelMode, language, setResetMail,
        api: { resetPasswordUrl, clientId },
    } = props;
    const onFinish = async (values) => {
        setLoading(true);
        const lang = language === 'zh-CN' ? 'ZH' : 'EN';
        const appMsg = btoa(`clientId=${clientId}&redirectUrl=${window.location.href}`);
        const body = {
            language: lang, loginEmail: values.email, methodType: 'noToken', appMsg,
        };
        const data = await fetch(`${resetPasswordUrl}?language=${lang}&appMsg=${appMsg}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(res => { return res.json(); });
        if (data.success) {
            setPanelMode('RestPwdSuccess');
            setResetMail(values.email);
        } else if (data.errorCode === '40014') {
            form.setFields([{ name: 'email', errors: [intl.get('UserControlPanel.emailNotRegistered')] }]);
        }
        setLoading(false);
    };
    return (
        <>
            <div style={{ padding: 20, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="desc-dark">
                {iconExclamationCircleOutlined}&nbsp;&nbsp;
                {intl.get('UserControlPanel.pleaseEnterTheRegisteredEmail')}&emsp;
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                wrapperCol={{ span: 12, offset: 6 }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: intl.get('UserControlPanel.pleaseEnterRegisteredEmail') },
                        { pattern: emailReg, message: intl.get('UserControlPanel.pleaseEnterEmailFormat') },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder={intl.get('UserControlPanel.pleaseEnterRegisteredEmail')}
                    />
                </Form.Item>
                <Row justify="center" style={{ paddingTop: 110 }}>
                    <Button onClick={() => setPanelMode('ChangePwd')}>
                        {intl.get('UserControlPanel.back')}
                    </Button>
                    &emsp;&emsp;
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {intl.get('UserControlPanel.resetPassword')}
                    </Button>
                </Row>
            </Form>
        </>
    );
};

const RestPwdSuccess = (props) => {
    const { onCancel, resetMail } = props;
    return (
        <div className="reset-pwd-success-wrap">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                {iconEmailSuccess}
                <div style={{ display: 'inline-block', fontWeight: 'bold', fontSize: 16, marginTop: 8, paddingLeft: 5 }}>
                    {intl.get('UserControlPanel.sentSuccessfully')}
                </div>
            </div>
            <div style={{ padding: 20, textAlign: 'center' }}>{intl.get('UserControlPanel.sentSuccessfullyDesc1', { email: resetMail })}</div>
            <div style={{ textAlign: 'center' }}>{intl.get('UserControlPanel.sentSuccessfullyDesc2')}</div>
            <div style={{ paddingTop: 70, textAlign: 'center' }}><Button type="primary" onClick={onCancel}>{intl.get('UserControlPanel.close')}</Button></div>
        </div>
    );
};

const panelModeMap = new Map()
    .set('ChangePwd', {
        component: ChangePwd,
        i18n: 'UserControlPanel.changePassword',
    })
    .set('RestPwd', {
        component: RestPwd,
        i18n: 'UserControlPanel.forgetPassword',
    })
    .set('RestPwdSuccess', {
        component: RestPwdSuccess,
        i18n: 'UserControlPanel.forgetPassword',
    });

const ChangePwdModal = (props) => {
    const {
        visible, onCancel, api, language, theme,
    } = props;
    const [panelMode, setPanelMode] = useState('ChangePwd');
    // const [panelMode, setPanelMode] = useState('RestPwdSuccess');
    const [resetMail, setResetMail] = useState('');

    const panelProps = {
        setPanelMode, onCancel, api, language, setResetMail, resetMail,
    };
    const ContentComponent = panelModeMap.get(panelMode).component;
    return (
        <Modal
            centered
            title={intl.get(panelModeMap.get(panelMode).i18n)}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={900}
            destroyOnClose
            bodyStyle={{ height: 330 }}
            afterClose={() => setPanelMode('ChangePwd')}
            wrapClassName={`UserControlPanel-modal-${theme}`}
        >
            <ContentComponent {...panelProps} />
        </Modal>
    );
};

export default ChangePwdModal;
