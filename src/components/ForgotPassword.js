import React, { useState } from 'react';
import { Form, Input, Button, Radio, PageHeader, Space, DatePicker, Checkbox, Spin, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../util/api';
import { signin } from '../util/api';


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

    const onSubmit = () => {
        let email = form.getFieldsValue().email;
        alert(email);
        if(email) {
            //password hidden is false
            

        }
    }


    
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
                size="medium"
                initialValues={{
                    layout: "horizontal",
                }} >
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
                    <Input placeholder="" id="email" />
                </Form.Item>
                <Form.Item
                        label="Password"
                        name="password"
                        
                        hidden = {true}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password id='password'/>
                </Form.Item>
                <Form.Item
                        label="Confirm Password"
                        name="confirm password"
                        hidden = {true}
                        rules={[
                            {
                                required: true,
                                message: 'Please Confirm your password!',
                            },
                        ]}

                    > 
                        <Input.Password id='confirm password'/>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Space >
                        <Link to="/login"><Button type='default'>Back</Button></Link>
                        <Button htmlType="submit" onClick={onSubmit} type="primary">Submit</Button>
                    </Space>
                </Form.Item>
            </Form>
            </Spin>
        </>
    )
}

export default ForgotPasswordForm;