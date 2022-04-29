import React, { useState } from 'react';
import { Form, Input, Button, Radio, PageHeader, Space, DatePicker, Checkbox, Spin, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../util/api';


const ForgotPasswordForm = (props) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formItemLayout = {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 6,
        }
    };

    const buttonItemLayout = {
        wrapperCol: {
            span: 12,
            offset: 10,
        },
    }

   

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 10,
            },
        },
    };

    const success = () => {
        message.success('Password change is successfull!!');
    };
    const error = () => {
        message.error('Failed to change the password, please try again!');
      };

    const onFinish = (value) => {
       
        const payload = { address: value.address,
            email: value.email,
            organization_name: value.organization_name,
            password: value.password,
            phone_number: value.phone_number,
            role: value.role,
            verification_id: value.verification_id,
            verification_issued_date: value.verification_issued_date,
            terms_condition: true };
        setLoading(true);
        signup(payload)
        .then(
            res => {
                success()
                setTimeout( () => {
                    setLoading(false)
                    navigate('/login');
                },1000)
            }
        )
        .catch( err => {
            console.log(err);
            setLoading(false);
            form.resetFields();
            error();
        })
    };

    const pp = () => {
        //unhide the password
        const input = document.getElementById('password');
        input.hidden = false;
    };
        


    return (
        <>
            <PageHeader
                className="forgotpassword-page-header"
                title="Forgot Password Form"
            />
            <Spin size="large" spinning={loading}>
            <Form
                {...formItemLayout}
                layout="horizontal"
                form={form}
                onFinish={onFinish}
                size="medium"
                initialValues={{
                    layout: "horizontal",
                }} >
                <Form.Item name="email" label="Organization Email" onChange={pp}
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                        label="Password"
                        name="password"
                        id='password'
                        hidden = {true}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                </Form.Item>
                <Form.Item
                        label="Confirm Password"
                        name="confirm password"
                        id='confirm password'
                        hidden = {true}
                        rules={[
                            {
                                required: true,
                                message: 'Please Confirm your password!',
                            },
                        ]}

                    >
                        <Input.Password/>
                </Form.Item>
                {/* <Form.Item
                    name="terms_condition"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]} {...tailFormItemLayout}
                >
                    <Checkbox checked>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item> */}
                <Form.Item {...buttonItemLayout}>
                    <Space >
                        <Link to="/login"><Button type='default'>Back</Button></Link>
                        <Button htmlType="submit" type="primary">Submit</Button>
                    </Space>
                </Form.Item>
            </Form>
            </Spin>
        </>
    )
}

export default ForgotPasswordForm;