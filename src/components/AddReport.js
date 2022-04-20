import { Button, DatePicker, Form, Input, message, PageHeader, Radio, Select, Space, Spin, Upload } from "antd";
import { Option } from "antd/lib/mentions";
import { UploadOutlined } from '@ant-design/icons';


import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { newPatientReq } from "../util/api";

const AddReportForm = props => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const {state} = useLocation();
    const navigate = useNavigate();

    if(state == null) {
        navigate("/")
    }

    useEffect(() => {
        const holder = state[0];

        form.setFieldsValue({
            fullname:  `${holder.first_name} ${holder.last_name}`,
            contact: holder.phone_number
        })
    }, [])

      const onSubmit = (e) => {
          if(!file) return;
          setLoading(true);
        let metadata = {};
        Object.keys(e).map( k => {
            if(!!e[k]) {
                metadata[k]= e[k]
            }
        })
        delete metadata['file'];
        metadata = JSON.stringify(metadata);
        const formData = new FormData(); 
        formData.append('metaData', metadata);
        formData.append("holderDHPId", state[0].dhp_id);
        formData.append("file", file);

        newPatientReq(formData)
        .then(() => {
            message.success('Upload successfully.');
            navigate('/success');
        })
        .catch(() => {
            message.error("Something went wrong! Please try again!")
        })
        .finally(() => {
            setLoading(false);
        });
      }  


    const formItemLayout = {
        labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 12,
          }
    };

    const buttonItemLayout = {
        wrapperCol: {
          span: 8,
          offset: 4,
        },
      }

      const uploadprops = {
        onRemove: file => {
          setFile(null)
        },
        beforeUpload: file => {
          setFile(file)
          return false;
        },
        file,
      };

    return (
        <>
        <PageHeader
            className="site-page-header"
            title="Holder Details"
        />
        <Spin size="large" spinning={loading}>
            <Form
                {...formItemLayout}
                layout="horizontal"
                form={form}
                size="medium"
                onFinish={onSubmit}
                initialValues={{
                    layout: "horizontal",
                }} >
                <Form.Item label="Holder Name" name="fullname" >
                    <Input placeholder="" disabled />
                </Form.Item>
                <Form.Item label="Service type" requiredMark name="serviceType"   rules={[
                            {
                                required: true,
                                message: 'Please choose service type',
                            }
                        ]}>
                    <Select style={{ width: 120 }} placeholder="select service type">
                        <Select.Option value="vaccine">vaccine</Select.Option>
                        <Select.Option value="test">test</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Service Name" name="serviceName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter service name',
                    }
                ]}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item label="Date">
                    <DatePicker />  
                </Form.Item>
                <Form.Item label="Contact Number" name="contact">
                    <Input placeholder="" disabled  />
                </Form.Item>
                <Form.Item name="eligibleToFly" label="Can fly at higher altitudes">
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Upload File" name="file"
                rules={[
                    {
                        required: true,
                        message: 'Please select file',
                    }
                ]}>
                <Upload {...uploadprops}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Space >
                    <Link to="/">  <Button type='danger'>Back</Button></Link>
                        <Button htmlType="submit"  type="primary">Upload</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Spin>
        </>
    )
}

export default AddReportForm;