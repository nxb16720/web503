import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Iproduct } from '../interface/interfaceProduct'
import { Col, Row, Image, Button, Card } from 'antd'
interface IProps {
    product: Iproduct[]
}
const ProductDetail = (props: IProps) => {
    const [data, setData] = useState<Iproduct>()
    const { id } = useParams()
    useEffect(() => {
        const currentProduct = props.product.find((item: any) => item._id == id)
        setData(currentProduct)
    }, [props])

    return (
        <div key={data?._id}>
            <div><h1>Product Detail</h1></div>
            <Row>
                <Col span={9}><Image width={200} src={data?.image} /></Col>
                <Col span={10} style={{ textAlign: "left" }}>
                    <Card title={data?.name} bordered={false}>
                        <p>description: {data?.description}</p>
                        <p>price: {data?.price} $</p>
                        <Button type='primary'>Buy</Button>
                    </Card>

                </Col>
            </Row>

        </div>
    )
}

export default ProductDetail
