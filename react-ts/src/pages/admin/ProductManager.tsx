
import { Iproduct } from '../../interface/interfaceProduct'
import { Space, Table, Button, Popconfirm, message, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    product: Iproduct[]
    onRemove: (id: number) => void
}

const ProductManager = (props: IProps) => {
    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (img) => {
                return <img style={{ maxWidth: 400 }} src={img} />
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {

                const confirm = (id: number) => {
                    message.info('Đã xóa');
                    props.onRemove(id)
                };
                return (
                    <Space size="middle">
                        <Popconfirm
                            placement="top"
                            title={"bạn có chắc muốn xóa không?"}
                            description={"Xóa thì chọn yes"}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >

                            <Button type="primary" danger >Delete</Button></Popconfirm>
                        <Link to={"update/" + record._id}>update</Link>
                    </Space>
                )
            },
        },
    ];

    return (
        <div>

            <div style={{ textAlign: 'left', padding: 15 }}><Button type="primary" ><Link to={"add"}>Add New Product</Link></Button></div>

            <Table columns={columns} dataSource={props.product} />


        </div>


    )
}

export default ProductManager
