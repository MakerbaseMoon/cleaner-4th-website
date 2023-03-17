import { useState } from 'react';
import { Container, Button, Card, Row, Col, Form, ListGroup } from 'react-bootstrap';

import { Dpad, ArrowUpCircle, ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle, Fan, Robot, ArrowUpCircleFill, ArrowLeftCircleFill, ArrowRightCircleFill, ArrowDownCircleFill} from 'react-bootstrap-icons';

const set_fan_url = "/api/fan/pwm/";
const set_mode_url = "/api/mode/";
const set_motor_url = "/api/motor/run/";

const MyController = () => {
    const [ArrowUpCircleEvent,    setArrowUpCircleEvent   ] = useState(<ArrowUpCircle    id={"arrowUpCircle"   } size={100} onMouseDown={arrowUpCircleMouseDown   } onMouseUp={arrowUpCircleMouseUp   }/>);
    const [ArrowDownCircleEvent,  setArrowDownCircleEvent ] = useState(<ArrowDownCircle  id={"arrowDownCircle" } size={100} onMouseDown={arrowDownCircleMouseDown } onMouseUp={arrowDownCircleMouseUP }/>);
    const [ArrowLeftCircleEvent,  setArrowLeftCircleEvent ] = useState(<ArrowLeftCircle  id={"arrowLeftCircle" } size={100} onMouseDown={arrowLeftCircleMouseDown } onMouseUp={arrowLeftCircleMouseUp }/>);
    const [ArrowRightCircleEvent, setArrowRightCircleEvent] = useState(<ArrowRightCircle id={"arrowRightCircle"} size={100} onMouseDown={arrowRightCircleMouseDown} onMouseUp={arrowRightCircleMouseUp}/>);

    const [fanValue, setFanValue] = useState(255);
    const [mode, setMode] = useState(1);

    function fanOnChange() { setFanValue(document.getElementById('fan_range').value); }
    function sendFanData() { sendESP32Data(set_fan_url, `pwm=${fanValue}`); }

    function changeMode() {
        if(mode === 1) {
            // Control Mode
            setMode(2);
            sendESP32Data(set_mode_url, 'mode=2');
        } else if(mode === 2) {
            // Auto Mode
            setMode(1);
            sendESP32Data(set_mode_url, 'mode=1');
        } else {
            console.log("OTA disable");
        }
    }

    function arrowUpCircleMouseOver() { setArrowUpCircleEvent( <ArrowUpCircleFill id={"arrowUpCircle"} size={100} onMouseDown={arrowUpCircleMouseDown} onMouseUp={arrowUpCircleMouseUp} /> ); }
    function arrowUpCircleMouseOut () { setArrowUpCircleEvent( <ArrowUpCircle     id={"arrowUpCircle"} size={100} onMouseDown={arrowUpCircleMouseDown} onMouseUp={arrowUpCircleMouseUp} /> ); }

    function arrowDownCircleMouseOver() { setArrowDownCircleEvent( <ArrowDownCircleFill id={"arrowDownCircle"} size={100} onMouseDown={arrowDownCircleMouseDown} onMouseUp={arrowDownCircleMouseUP} /> ); }
    function arrowDownCircleMouseOut () { setArrowDownCircleEvent( <ArrowDownCircle     id={"arrowDownCircle"} size={100} onMouseDown={arrowDownCircleMouseDown} onMouseUp={arrowDownCircleMouseUP} /> ); }

    function arrowLeftCircleMouseOver() { setArrowLeftCircleEvent( <ArrowLeftCircleFill id={"arrowLeftCircle"} size={100} onMouseDown={arrowLeftCircleMouseDown} onMouseUp={arrowLeftCircleMouseUp} /> ); }
    function arrowLeftCircleMouseOut () { setArrowLeftCircleEvent( <ArrowLeftCircle     id={"arrowLeftCircle"} size={100} onMouseDown={arrowLeftCircleMouseDown} onMouseUp={arrowLeftCircleMouseUp} /> ); }

    function arrowRightCircleMouseOver() { setArrowRightCircleEvent( <ArrowRightCircleFill id={"arrowRightCircle"} size={100} onMouseDown={arrowRightCircleMouseDown} onMouseUp={arrowRightCircleMouseUp} /> ); }
    function arrowRightCircleMouseOut () { setArrowRightCircleEvent( <ArrowRightCircle     id={"arrowRightCircle"} size={100} onMouseDown={arrowRightCircleMouseDown} onMouseUp={arrowRightCircleMouseUp} /> ); }

    function arrowUpCircleMouseDown() { setMotor("run=1"); }
    function arrowUpCircleMouseUp  () { setMotor("run=0"); }

    function arrowDownCircleMouseDown() { setMotor("run=2"); }
    function arrowDownCircleMouseUP  () { setMotor("run=0"); }

    function arrowLeftCircleMouseDown() { setMotor("run=3"); }
    function arrowLeftCircleMouseUp  () { setMotor("run=0");; }

    function arrowRightCircleMouseDown() { setMotor("run=4"); }
    function arrowRightCircleMouseUp  () { setMotor("run=0"); }

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

                    <Col style={{ width: '26rem' }}  className='mx-auto'>
                        <Card className='text-center mb-3'>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Body>
                                <Row className='g-4'>
                                    <Col></Col>
                                    <Col onMouseOver={arrowUpCircleMouseOver} onMouseOut={arrowUpCircleMouseOut}>
                                        {ArrowUpCircleEvent}
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row className='g-4'>
                                    <Col onMouseOver={arrowLeftCircleMouseOver} onMouseOut={arrowLeftCircleMouseOut}>
                                        {ArrowLeftCircleEvent}
                                    </Col>
                                    <Col></Col>
                                    <Col onMouseOver={arrowRightCircleMouseOver} onMouseOut={arrowRightCircleMouseOut}>
                                        {ArrowRightCircleEvent}
                                    </Col>
                                </Row>
                                <Row className='g-4'>
                                    <Col></Col>
                                    <Col onMouseOver={arrowDownCircleMouseOver} onMouseOut={arrowDownCircleMouseOut}>
                                        {ArrowDownCircleEvent}
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Card.Body>
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
                                <Form.Label>5 ~ 255</Form.Label>
                                <Form.Range min="5" max="255" step="25" id="fan_range" size="lg" onChange={fanOnChange} onMouseUp={sendFanData}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </Container>
    );
}

export default MyController;