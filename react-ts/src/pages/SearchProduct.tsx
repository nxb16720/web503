
import { Col, Row, Image, Button, Card } from 'antd'
interface IProps {
    search: any
}
const SearchProduct = (props: IProps) => {

    return (
        <div key={props.search?._id}>
            <div><h1>Product Detail</h1></div>
            <Row>
                <Col span={9}><Image width={200} src={props.search?.image} /></Col>
                <Col span={10} style={{ textAlign: "left" }}>
                    <Card title={props.search?.name} bordered={false}>
                        <p>description: {props.search?.description}</p>
                        <p>price: {props.search?.price} $</p>
                        <Button type='primary'>Buy</Button>
                    </Card>

                </Col>
            </Row>

        </div>
    )
}

export default SearchProduct

