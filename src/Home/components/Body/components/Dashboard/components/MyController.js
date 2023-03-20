import { useState } from 'react';
import { Container, Button, Card, Row, Col, Form, ListGroup } from 'react-bootstrap';

import { Dpad, ArrowUpCircle, ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle, Fan, Robot} from 'react-bootstrap-icons';

const set_fan_url = "/api/fan/pwm/";
const set_mode_url = "/api/mode/";
const set_motor_url = "/api/motor/run/";

const MyController = () => {
    const [buttonDisable, setButtonDisable] = useState(true);

    const [fanValue, setFanValue] = useState(255);
    const [mode, setMode] = useState(1);

    function fanOnChange() { setFanValue(document.getElementById('fan_range').value); }
    function sendFanData() { sendESP32Data(set_fan_url, `pwm=${fanValue}`); }

    function changeMode() {
        if(mode === 1) {
            // Change to Control Mode
            setMode(2);
            sendESP32Data(set_mode_url, 'mode=1');
            setButtonDisable(false);
        } else if(mode === 2) {
            // Change to Auto Mode
            setMode(1);
            sendESP32Data(set_mode_url, 'mode=2');
            setButtonDisable(true);
        } else {
            console.log("OTA disable");
        }
    }

    function motorMouseUp             () { setMotor("run=0"); }
    function arrowUpCircleMouseDown   () { setMotor("run=1"); }
    function arrowDownCircleMouseDown () { setMotor("run=2"); }
    function arrowLeftCircleMouseDown () { setMotor("run=3"); }
    function arrowRightCircleMouseDown() { setMotor("run=4"); }

    function setMotor(data) { sendESP32Data(set_motor_url, data); }

    function sendESP32Data(url, data) {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(`[response]${url}:`, data);
        });
    }

    return (
        <Container className='flex-fill'>
                <Row>
                    <Card className='mb-3'>
                        <Row className="g-0 align-items-center"> 
                            <Col className="col-3">
                                <img src="/favicon.jpg" className="img-fluid rounded-start" alt="勞動部物聯網創客基地"></img>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title className='display-3'>北分署創客基地</Card.Title>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Row>

                <Row className='row-cols-1 row-cols-md-3 g-4 align-items-center' style={{height: '60vh'}}>
                    <Col style={{ width: '26rem' }}  className='mx-auto'>
                        <Card className='text-center mb-3'>
                            <Card.Header className='h3'>掃地機模式</Card.Header>
                            <Card.Body>
                                <Card.Title className='h4'>{(mode === 1)? "自動模式" : "手動模式" }</Card.Title>
                                <Card.Text>
                                    {(mode === 1)? <Robot size={250} /> : <Dpad size={250} /> }
                                </Card.Text>
                                <ListGroup.Item className="d-grid gap-2">
                                    <Button variant="outline-info" size="lg" onClick={changeMode}>切換模式</Button>
                                </ListGroup.Item>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col style={{ width: '29rem' }}  className='mx-auto'>
                        <Card className='text-center mb-3'>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                <Row className='g-4'>
                                    <Col></Col>
                                    <Col>
                                        <Button variant="light" onMouseDown={arrowUpCircleMouseDown} onMouseUp={motorMouseUp} disabled={buttonDisable}><ArrowUpCircle size={100}/></Button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row className='g-4'>
                                    <Col>
                                        <Button variant="light" onMouseDown={arrowLeftCircleMouseDown} onMouseUp={motorMouseUp} disabled={buttonDisable}><ArrowLeftCircle size={100}/></Button>
                                    </Col>
                                    <Col style={{color: 'white'}}>
                                        <ArrowRightCircle size={100}/>
                                    </Col>
                                    <Col>
                                        <Button variant="light" onMouseDown={arrowRightCircleMouseDown} onMouseUp={motorMouseUp} disabled={buttonDisable}><ArrowRightCircle size={100}/></Button>
                                    </Col>
                                </Row>
                                <Row className='g-4'>
                                    <Col></Col>
                                    <Col>
                                        <Button variant="light" onMouseDown={arrowDownCircleMouseDown} onMouseUp={motorMouseUp} disabled={buttonDisable}><ArrowDownCircle size={100}/></Button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                        </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col style={{ width: '26rem' }}  className='mx-auto'>
                        <Card className='text-center mb-3'>
                            <Card.Header className='h3'>風扇控制</Card.Header>
                            <Card.Body>
                                <Card.Title className="mb-2 text-muted h4">PWM: {fanValue}</Card.Title>
                                <Card.Text>
                                    <Fan size={250}/>
                                </Card.Text>
                                <Form.Label>0 ~ 255</Form.Label>
                                <Form.Range min="0" max="255" step="15" value={fanValue} id="fan_range" size="lg" onChange={fanOnChange} onMouseUp={sendFanData}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </Container>
    );
}

export default MyController;