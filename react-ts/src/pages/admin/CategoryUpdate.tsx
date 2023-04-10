import React, { useEffect, useState } from 'react'
import { ICategory } from '../../interface/interfaceCategory'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
interface IProps {
    category: ICategory[]
    onUpdate: (category: ICategory) => void
}
const CategoryUpdate = (props: IProps) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState<ICategory>()

    useEffect(() => {
        const currentCategory = props.category.find((item: any) => item._id == id)
        setData(currentCategory)
    }, [props])
    useEffect(() => {
        setFields()
    }, [data])
    const [form] = Form.useForm();
    const setFields = () => {// hàm này để set lại giá trị cho các input
        form.setFieldsValue({ // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
            _id: data?._id,
            name: data?.name

        })
    }
    const onFinish = (values: any) => {
        props.onUpdate(values);
        navigate("/admin/category")
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                form={form}
                onFinish={onFinish}


            > <Form.Item
                label=""
                name="_id"
                style={{ display: 'none' }} // ẩn input này đi
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Category
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default CategoryUpdate