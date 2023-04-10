import { useEffect, useState } from "react"
import { getOneCategory, } from "../api/category"
import { Button, Card, Col, Row, Image } from "antd"
import { Link, useParams } from "react-router-dom"



const SearchCategory = (props: any) => {
    const [items, setItem] = useState<any>([])
    const { id } = useParams()
    const [cate, setCate] = useState<any>()

    useEffect(() => {
        const currentCate = props.category.find((ca: any) => ca._id == id)
        setCate(currentCate)
    }, [])

    useEffect(() => {
        getOneCategory(id).then(({ data }) => setItem(data.products))

    }, [])


    return (<div style={{ paddingBottom: 20 }}>
        <div><h1>{cate?.name}</h1></div>
        <Row gutter={[16, 16]}>
            {items.map((data: any, index: number) => {
                return (<Col className="gutter-row" span={6}>
                    <div style={{ padding: '8px 0' }} key={index}>
                        <Card title={data?.name} size="small">
                            <h1></h1>
                            <div ><Image width={200} src={data?.image} /></div>
                            <div >{data?.description}</div>
                            <div >{data?.price} $</div>
                            <Button ><Link to={"/product/" + data?._id}>Xem</Link></Button>
                        </Card>
                    </div>
                </Col>

                );
            })}
        </Row>

    </div>

    )
}

export default SearchCategory
