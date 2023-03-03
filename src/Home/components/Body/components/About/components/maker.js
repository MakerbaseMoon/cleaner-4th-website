import { Card, Container, Row, Col } from "react-bootstrap";

const Maker = () => {
    return (
        <Container>
            <Row  className='g-4 align-items-center' style={{height: '85vh'}}>
                <Col>
                    <Card>
                        <Card.Img src="/maker.jpg" alt="創客基地" />
                        <Card.ImgOverlay>
                            <Card.Title className="display-3">創客基地</Card.Title>
                            <Card.Text>
                                北基宜花金馬分署於新北產業園區設立物聯網創客基地，融入「創新構思」、「動手實作」與「交流共創」等主題特色
                            </Card.Text>
                            <Card.Text>
                                配商品設計、行銷課程、專利與募資等資訊提供，讓創客能發揮所學自行創業或充分就業。
                            </Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Maker;