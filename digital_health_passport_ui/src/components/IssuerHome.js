import { Button, Input, PageHeader, Space, Spin, Table } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchPatient } from "../util/api";


const IssuerHome = props => {
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [searchString, setSearchString] = useState('');
    const navigate = useNavigate();
    const columns = [
        {
            title: 'DHP ID',
            dataIndex: 'dhp_id',
            key: 'dhp_id',
            render: text => <a onClick={naviagteToAddReport}>{text}</a>,
          },
        {
          title: 'FirstName',
          dataIndex: 'first_name',
          key: 'first_name',
        },
        {
            title: 'LastName',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
          title: 'contact number',
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
       ]
       
    const onSearch = e => {
        if(searchString == "" ) return;
        setLoading(true);
        searchPatient(searchString)
        .then( res => {
            console.log(res.data);
            res.data["key"] = res.data["email"]
            setSearchData([
            res.data]);
        })
        .catch( err => {
            console.log(err)
        })
        .finally( () => {
            setLoading(false)
        })
    }
    const naviagteToAddReport =(e) => {
        navigate("/addreport", {state: searchData})
    }
    return (
        <div>
            <PageHeader
                className="home-page-header"
                title="Search For Holder"
            />
             <Spin size="large" spinning={loading}>
                <div className="search-bar">
                    <Search
                        placeholder="Enter holder DHP ID"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <div className="btn">
                        <Button size="large" onClick={onSearch} type="primary">Search</Button>
                    </div>
                </div>
            </Spin>
            {
                !loading && searchData.length > 0 &&  <div className="search-results">
                <PageHeader
                    className="search-section"
                    title="Search Results"
                />
               <Table columns={columns} dataSource={searchData} />
            </div>
            }
         
        </div>
    )
}

export default IssuerHome;