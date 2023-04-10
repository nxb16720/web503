import React, { useEffect, useState } from 'react'
import { Iproduct } from '../interface/interfaceProduct'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Image, Button } from 'antd'


interface IProps {
    product: Iproduct[]
}
const ProductPage = (props: IProps) => {


    return (<div style={{ paddingBottom: 20 }}>
        <div><h1>Product</h1></div>
        <Row gutter={[16, 16]}>
            {props.product.map(data => {
                return <Col className="gutter-row" span={6}>
                    <div style={{ padding: '8px 0' }} key={data?._id}>
                        <Card title={data?.name} size="small">
                            <h1></h1>
                            <div ><Image width={200} src={data?.image} /></div>
                            <div >{data?.description}</div>
                            <div >{data?.price} $</div>
                            <Button ><Link to={"" + data?._id}>Xem</Link></Button>
                        </Card>
                    </div>
                </Col>
            })}



        </Row>
    </div>

    )
}

export default ProductPage
