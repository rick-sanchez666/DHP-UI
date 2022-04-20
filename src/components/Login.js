import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Radio, PageHeader, Space, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../util/api';
import AuthContext from '../services/auth-context';

const LoginForm = (props) => {
    const [email, setEmail ]= useState('');
    const [password, setPassword ]= useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let authContext = useContext(AuthContext);

    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        }
    };

    const buttonItemLayout = {
        wrapperCol: {
            span: 24,
            offset: 0,
        },
    }

    const onEmailChange = (e) => {
       setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
     }
  
 
    const onSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            return;
        }
        setLoading(true);
        signin(email, password)
        .then( res => {
            let response = res.data;
            authContext.login(response.token);
            authContext.setUser(response.user);
            navigate('/')
        })
        .catch( error => {

        })
        .finally( () => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if(authContext.isLoggedIn) {
            navigate('/')
        } 
        return () => {
            
        }
    }, [])

    return (
        <div className='login-form'>
            <PageHeader
                className="login-page-header"
                title="Login"
            />
            <Spin size="large" spinning={loading}>
                <Form
                    {...formItemLayout}
                    layout="vertical"
                    form={form}
                    size="large"
                    initialValues={{
                        layout: "vertical",
                    }} >
                    <Form.Item label="Email" name="email" rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                        <Input placeholder="" onChange={onEmailChange} />
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
                        <Input.Password  onChange={onPasswordChange}/>
                    </Form.Item>

                    <Form.Item {...buttonItemLayout}>
                        <div className='login-form-btn'>
                        <Button size='middle' onClick={onSubmit} type="primary">Signin</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
            <div className='login-links'>
                <Link to="/signup"><Button type="link">Signup</Button></Link>
                <Button type="link">Forgot Password</Button>
            </div>
        </div>


    )
}

export default LoginForm;