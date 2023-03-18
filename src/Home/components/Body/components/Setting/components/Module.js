import { useState, useEffect } from 'react';

import { Button, Form, Card, Row, Col, ListGroup, Container, InputGroup } from 'react-bootstrap';
import { ExclamationTriangle, Speedometer, Wind, BatteryHalf } from 'react-bootstrap-icons';

const get_module_url = "/api/get/module/"
const set_module_url = "/api/set/module/"

const Module = () => {
    const [moduleInfo, setModuleInfo] = useState({
        mx1584: { pinout: { A01: null, A02: null, B01: null, B02: null },
                  pwm:    { A01: null, A02: null, B01: null, B02: null } },
        fan: null,
        battery: { pinout: null, min: null, max: null, }
    });

    const getModuleInfo = async () => {
        try {
            const response = await fetch( get_module_url, { method: "POST" } );
            const data = await response.json();
            console.log("moduleInfo:", data);
            setModuleInfo(data);
        } catch(error) {
            console.log(`[${get_module_url}]error:`, error);
        }
    }

    const moduleItemList = [
        {id: 'motor', svg: <Speedometer size={40}/>, title: '馬達 Motor (MX1508)', body: 
            [{id: 'pinout', title: '腳位 (Pinout)', subBody: 
                [{id: 'A01', title: 'A01', placeholder: moduleInfo.mx1584.pinout.A01}, {id: 'A02', title: 'A02', placeholder: moduleInfo.mx1584.pinout.A02}, 
                 {id: 'B01', title: 'B01', placeholder: moduleInfo.mx1584.pinout.B01}, {id: 'B02', title: 'B02', placeholder: moduleInfo.mx1584.pinout.B02}]},      
            {id: 'pwm', title: '速度 (PWM)', subBody: 
                [{id: 'A01', title: 'A01', placeholder: moduleInfo.mx1584.pwm.A01}, {id: 'A02', title: 'A02', placeholder: moduleInfo.mx1584.pwm.A02}, 
                 {id: 'B01', title: 'B01', placeholder: moduleInfo.mx1584.pwm.B01}, {id: 'B02', title: 'B02', placeholder: moduleInfo.mx1584.pwm.B02}]}]
        },
        {id: 'fan', svg: <Wind size={40}/>, title: '風扇 Fan (IRF520)', body: 
            [{id: 'pinout', title: '', subBody: 
                [{id: 'pinout', title: '腳位 (Pinout)', placeholder: moduleInfo.fan}]}]
        },
        {id: 'battery', svg: <BatteryHalf size={40}/>, title: '電池 Battery', body: 
            [{id: 'pinout', title: '', subBody: 
                [{id: 'pinout', title: '腳位 (Pinout)', placeholder: moduleInfo.battery.pinout}, {id: 'min', title: '最小電量 (min)', placeholder: moduleInfo.battery.min}, 
                 {id: 'max', title: '最大電量 (Max)', placeholder: moduleInfo.battery.max}]}]
        },
    ];

    useEffect(() => {
        getModuleInfo();
    }, [])

    let moduleNodeList = [];

    function setModule() {
        let data = "";
        for(let i = 0; i < moduleNodeList.length; i++) {
            data += `${moduleNodeList[i].id}=${moduleNodeList[i].value | moduleNodeList[i].placeholder}`;
            if(i < moduleNodeList.length - 1) {
                data += "&";
            }
        }
        console.log(`[Data]${set_module_url}:`, data)
        fetch(set_module_url, {
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
            console.log(`[response]${set_module_url}:`, data);
        });
    }

    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                {
                    moduleItemList.map((item) => {
                        return (
                            <Col key={item.id}>
                                <Card>
                                    <Card.Header>
                                        {item.svg} {item.title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Row xs={1} md={item.body.length} className="g-4">
                                            {
                                                item.body.map(subItem => {
                                                    return (
                                                        <Col key={subItem.id}>
                                                            <Card.Title style={{textAlign: 'center'}}>{subItem.title}</Card.Title>
                                                            {
                                                                subItem.subBody.map(subSubItem => {
                                                                    return(
                                                                        <InputGroup className="mb-3" size="lg" key={subSubItem.id}>
                                                                            <InputGroup.Text>
                                                                                {subSubItem.title}
                                                                            </InputGroup.Text>
                                                                            <Form.Control id={`${item.id}_${subItem.id}_${subSubItem.id}`} aria-describedby="basic-addon3" placeholder={subSubItem.placeholder} />
                                                                            <div key={moduleNodeList.push(document.getElementById(`${item.id}_${subItem.id}_${subSubItem.id}`))}></div>
                                                                        </InputGroup>
                                                                    )
                                                                })
                                                            }
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
        
                <Col>
                    <Card>
                        <Card.Header>
                            <ExclamationTriangle size={40}/> 模組存檔 
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-grid gap-2">
                                    <Button variant="outline-info" size="lg" onClick={setModule}>存檔</Button>
                                </ListGroup.Item>
                                {/* <ListGroup.Item className="d-grid gap-2">
                                    <Button variant="outline-danger" size="lg">恢復預設值</Button>
                                </ListGroup.Item> */}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Module;