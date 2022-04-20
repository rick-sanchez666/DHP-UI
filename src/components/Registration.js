import React, { useState } from 'react';
import { Form, Input, Button, Radio, PageHeader, Space, DatePicker, Checkbox, Spin, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../util/api';


const IssuerSignupForm = (props) => {
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
        message.success('Registration is successfull!!');
    };
    const error = () => {
        message.error('Failed to register, please try again!');
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


    return (
        <>
            <PageHeader
                className="issuer-reg-header"
                title="Registration Form"
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
                <Form.Item name="role" label="Domain"
                rules={[
                    {
                        required: true,
                        message: 'Please Choose Domain',
                    }
                ]}>
                    <Radio.Group >
                        <Radio value="ISSUER">Healthcare</Radio>
                        <Radio value="VERIFIER">Airport Authority</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="organization_name" label="Organization Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter name of the organisation',
                        }
                    ]}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item name="email" label="Organization Email"
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
                <Form.Item name="address" label="Organization Address"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter address',
                        }
                    ]}>
                    <TextArea rows={4} placeholder="" maxLength={6} />
                </Form.Item>
                <Form.Item name="verification_id" label="Business ID"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter verification ID',
                        }
                    ]}>
                    <Input placeholder="Business Verification id" />
                </Form.Item>
                <Form.Item name="verification_issued_date" label="ID Issued Date"
                rules={[
                    { required: true,
                        message: 'Please select issued date',}
                ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="phone_number" label="Contact Number"
                rules={[
                    { required: true,
                        message: 'Please enter contact number',
                        pattern: new RegExp(/^[0-9]+$/)}
                ]}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
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
                        <Button htmlType="submit" type="primary">Signup</Button>
                    </Space>
                </Form.Item>
            </Form>
            </Spin>
        </>
    )
}

export default IssuerSignupForm;