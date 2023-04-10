import React from 'react'
import { ICategory } from '../../interface/interfaceCategory'
import { Button, Popconfirm, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
interface IProps {
    category: ICategory[],
    onRemove: (id: number) => void
}
const CategoryManager = (props: IProps) => {
    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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

            <div style={{ textAlign: 'left', padding: 15 }}><Button type="primary" ><Link to={"add"}>Add New Category</Link></Button></div>

            <Table columns={columns} dataSource={props.category} />

        </div>
    )
}

export default CategoryManager
