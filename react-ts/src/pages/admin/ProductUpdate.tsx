import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Button, Form, Input, Select } from 'antd';
import { Iproduct } from '../../interface/interfaceProduct';
import { ICategory } from '../../interface/interfaceCategory';
interface IProps {
    category: ICategory[],
    products: Iproduct[],
    onUpdate: (product: Iproduct) => void
}
const ProductUpdate = (props: IProps) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState<Iproduct>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy useEffect này
        const currentProduct = props.products.find((product: any) => product._id == id)
        // tìm trong mảng props.products có phần tử nào có id trùng với id trên url không
        setProduct(currentProduct) // nếu có thì set lại giá trị cho biến product
    }, [props])
    useEffect(() => { // khi biến product thay đổi thì sẽ chạy useEffect này
        setFields() // gọi hàm setFields để set lại giá trị cho các input
    }, [product])
    const [form] = Form.useForm();
    // khởi tạo một instance của Form và gán vào biến form
    // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React

    const setFields = () => {// hàm này để set lại giá trị cho các input
        form.setFieldsValue({ // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
            _id: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.image,
            description: product?.description,
            categoryId: product?.categoryId,
        })
    }

    const onFinish = (values: any) => {
        props.onUpdate(values);
        navigate('/admin/product')
    };

    return (
        <div>
            <Form
                form={form}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                {/* đoạn này cần truyền cả id vào form khi submit để lấy được giá trị id truyền lên component App */}
                <Form.Item
                    label=""
                    name="_id"
                    style={{ display: 'none' }} // ẩn input này đi
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Select"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please input your category!' }]}
                >
                    <Select>
                        {props.category.map(item => <Select.Option value={item._id}>{item.name}</Select.Option>)}

                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >

                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your product description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductUpdate
