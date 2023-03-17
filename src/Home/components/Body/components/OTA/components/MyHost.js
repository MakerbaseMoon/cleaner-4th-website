import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { FileEarmarkCode, FileEarmarkRichtext } from 'react-bootstrap-icons';

const MyHost = () => {
    return (
        <Container>
            <Row className='align-items-center' style={{height: '80vh'}}>
                <Col>
                    <Card style={{height: '60vh'}}>
                        <Card.Header className='h2'>
                            Firmware 韌體上傳
                        </Card.Header>
                        <Card.Body></Card.Body>
                        <Card.Body style={{textAlign: 'center'}}>
                            <Form>
                                <FileEarmarkCode size={300}/>
                                <Card.Body></Card.Body>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Control
                                    type="file"
                                    required
                                    name="file"
                                    // onChange={handleChange}
                                    // isInvalid={!!errors.file}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                    {/* {errors.file} */}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Card.Body></Card.Body>
                                <ListGroup.Item className="d-grid gap-2">
                                    <Button variant="outline-danger" size="lg">Firmware 韌體上傳</Button>
                                </ListGroup.Item>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{height: '60vh'}}>
                        <Card.Header  className='h2'>
                            SPIFFS 檔案管理
                        </Card.Header>
                        <Card.Body></Card.Body>
                        <Card.Body style={{textAlign: 'center'}}>
                            <Form>
                                <FileEarmarkRichtext size={300}/>
                                <Card.Body></Card.Body>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Control
                                    type="file"
                                    required
                                    name="file"
                                    // onChange={handleChange}
                                    // isInvalid={!!errors.file}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                    {/* {errors.file} */}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Card.Body></Card.Body>
                                <ListGroup.Item className="d-grid gap-2">
                                    <Button variant="outline-danger" size="lg">SPIFFS 檔案管理上傳</Button>
                                </ListGroup.Item>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

export default MyHost;