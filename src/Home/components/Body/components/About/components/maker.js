import { Card, Container, Row, Col } from "react-bootstrap";

const Maker = () => {
    return (
        <Container>
            <Row  className='g-4 align-items-center' style={{height: '85vh'}}>
                <Col>
                    <Card.Text style={{ fontWeight: "bolder", fontSize: "23px" }}>
                        北基宜花金馬分署於新北產業園區設立物聯網創客基地，融入「創新構思」、「動手實作」與「交流共創」等主題特色，
                        搭配商品設計、行銷課程、專利與募資等資訊提供，讓創客能發揮所學自行創業或充分就業。
                    </Card.Text>
                    <Card>
                        <Card.Img style={{ opacity: 0.9 }} src="https://github.com/MakerbaseMoon/.github/releases/download/v0.0.0/maker.jpg" alt="創客基地" />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Maker;