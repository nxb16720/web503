import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { IUser } from '../interface/interfaceSignup';
import { signin } from '../api/signup';
import { useNavigate, Link } from 'react-router-dom';

interface IProps {
    onUser: (user: any) => void
    user: IUser[]
}
const Signin = (props: IProps) => {
    const navigate = useNavigate()

    const onFinish = (values: any) => {

        signin(values).then(({ data }) => {
            console.log(data);

            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("token", JSON.stringify(data.accessToken))

            if (data.user.role == "admin") {
                localStorage.setItem("look", JSON.stringify(true))
                navigate("/admin")
            } else {
                localStorage.setItem("look", JSON.stringify(false))
                navigate("/")
            }
        }
        )
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <div><h1>Sign in</h1></div>
            <div style={{ textAlign: "center" }}><Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, }}
                // initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="E-email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" >
                        Sign In
                    </Button>

                    <Button>
                        <Link to={"signup"}>Sign Up</Link>
                    </Button>
                </Form.Item>
            </Form></div>
        </div>
    )
}

export default Signin
