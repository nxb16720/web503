

import { Button, Select, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { ICategory } from '../../interface/interfaceCategory';
import axios from 'axios';
interface IProps {
    category: ICategory[]
    onAdd: (product: any) => void
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const ProductAdd = (props: IProps) => {
    const navigate = useNavigate()
    const uploadFiles = async (files: any) => {
        if (files) {
            const CLOUD_NAME = "dltvtdw0y";
            const PRESET_NAME = "demo-upload";
            const FOLDER_NAME = "ECMA"
            const urls = [];
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData();

            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);

            formData.append("file", files);
            const response = await axios.post(api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            urls.push(response.data.secure_url);
            return urls;

        }
    }
    const onFinish = async (values: any) => {
        // console.log(values);
        const files = values.image.fileList[0]?.originFileObj;
        // console.log(files);

        const urls = await uploadFiles(files)

        const newProduct = {

            name: values.name,
            price: values.price,
            image: urls?.[0],
            description: values.description,
            categoryId: values.category
        }
        // console.log(newProduct);
        // console.log(urls);

        props.onAdd(newProduct);
        navigate("/admin/product")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    // setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Select"
                    name="category"
                    rules={[{ required: true, message: 'Please input your category!' }]}
                >
                    <Select>
                        {props.category.map(item => <Select.Option value={item._id}>{item.name}</Select.Option>)}

                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your product price!' }]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Upload
                        // action="http://localhost:3000/products"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal> */}
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
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductAdd