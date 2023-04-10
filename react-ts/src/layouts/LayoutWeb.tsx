import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { HomeOutlined, DownOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';

import { Layout, Space, Col, Row, Carousel, Input, Menu, MenuProps } from 'antd';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',

    color: 'black',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 960,
    lineHeight: '120px',

};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
};
const LayoutWeb = (props: any) => {
    const navigate = useNavigate()
    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    const items: MenuProps['items'] = [
        {
            icon: <HomeOutlined />,
            label: (
                <NavLink to={"/"} >Home</NavLink>
            ),
            key: 'home',
        },
        {
            label: (
                <NavLink to={"/product"}>Product</NavLink>
            ),
            key: 'product',
        },
        {
            label: 'Category',
            key: 'SubMenu',
            icon: <DownOutlined />,
            children:
                props.category.map((item: any) => {
                    return {
                        label: <NavLink to={"/searchC/" + item._id} >{item.name}</NavLink>,
                        key: item.name
                    }
                })

            ,
        },
        {
            icon: <UserOutlined />,
            label: (
                <NavLink to={"/auth"}>Sign in</NavLink>
            ),
            key: 'signin',
        },
    ];
    const onSearch = (value: string) => {
        const currentProduct = props.product.find((item: any) => item.name == String(value))
        const id = currentProduct._id


        props.onSearch(id)
        navigate("/search")
    }
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div>
            <Layout>
                <Header style={headerStyle}>
                    <Row>
                        <Col span={14} >
                            <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ width: '50%', margin: "1.5%" }} />
                        </Col>
                        <Col span={10}>
                            <div style={{ fontSize: 20 }}>
                                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                            </div>
                        </Col>
                    </Row>


                </Header>
                <Content style={contentStyle}>
                    <Carousel autoplay style={{ paddingTop: 20, paddingBottom: 15 }}>
                        <div>
                            <img src="https://picsum.photos/1980/300" alt="" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/1979/300" alt="" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/1978/300" alt="" />
                        </div>

                    </Carousel>

                    <Outlet />
                </Content>

                <Footer style={footerStyle}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </div>
    )
}

export default LayoutWeb
