import { Card, Container, Row, Col } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

const Teem = () => {
    const memberList = [
        {id: "jlhsu666", name: "許榮隆 教授", github: "jlhsu666", title: "開南大學 教授", text: "專案指導\n架構設計\n架構設計\n"},
        {id: "Reaxoh", name: "呂芳杰", github: "Reaxoh", title: "開南大學 學生", text: ""},
        {id: "Hsun1031", name: "賴政勳", github: "Hsun1031", title: "開南大學 學生", text: ""}
    ]
    return (
        <Container>
            <Row xs={1} md={3} className='g-4 align-items-center' style={{height: '80vh'}}>
                {
                    memberList.map(member => {
                        return(
                            <Col key={member.id}>
                                <Card style={{ width: '18rem'}} className='mx-auto'>
                                    <Card.Header className="h4">{member.name}</Card.Header>
                                    <Card.Body></Card.Body>
                                    <Container>
                                        <Card.Img variant="top" src={`https://github.com/${member.github}.png`} className="rounded-circle"/>
                                    </Container>
                                    <Card.Body></Card.Body>
                                    <Card.Body>
                                        <Card.Title>{member.title}</Card.Title>
                                        {/* <Card.Text>{member.text}</Card.Text> */}
                                    </Card.Body>
                                    <Card.Footer className="text-muted"><a style={{color: 'gray'}} href={`https://github.com/${member.github}`}><Github size={30}/> {member.github}</a></Card.Footer>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    );
}

export default Teem;