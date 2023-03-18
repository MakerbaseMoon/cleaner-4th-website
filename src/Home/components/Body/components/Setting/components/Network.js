import { useEffect, useState } from 'react';

import { Button, Form, Card, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { Wifi, HddNetwork, Router, PinMap, InfoSquare } from 'react-bootstrap-icons';

const get_network_url = '/api/get/network/';
const set_network_url = '/api/set/network/';

const Network = () => {
    const [networkInfo, setNetworkInfo] = useState( { mDNS: null,  MAC: null, sta: { ssid: null, passwd: null, ip: null }, ap: { ssid: null, passwd: null, ip: null } } );

    const netWorkInfoList = [
        {id: 'mDNS', svg: <InfoSquare size={30}/>, title: 'ESP32', list: [{name: 'mDNS', value: networkInfo.mDNS}, {name: 'MAC', value: networkInfo.MAC}]},
        {id: 'AP', svg: <Router size={30}/>, title: '無線基地台', list: [{name: '帳號', value: networkInfo.ap.ssid}, {name: 'IP', value: networkInfo.ap.ip}]},
        {id: 'STA', svg: <Wifi size={30}/>, title: 'Wi-Fi', list: [{name: '帳號', value: networkInfo.sta.ssid}, {name: 'IP', value: networkInfo.sta.ip}]}
    ];

    const netWorkFormList = [
        {id: 'AP', svg: <Router size={40}/>, title: '無線基地台', list: [{id: 'ssid', name: '帳號', type: 'text', text: '帳號請輸入25字以內', placeholder: networkInfo.ap.ssid}, {id: 'passwd', type: 'password', name: '密碼', text: '', placeholder: "請輸入密碼"}], buttonClick: setAPData},
        {id: 'STA', svg: <Wifi size={40}/>, title: 'Wi-Fi', list: [{id: 'ssid', name: '帳號', type: 'text', text: '帳號請輸入25字以內', placeholder: networkInfo.sta.ssid}, {id: 'passwd', type: 'password', name: '密碼', text: '', placeholder: "請輸入密碼"}], buttonClick: setSTAData},
        {id: 'mDNS', svg: <PinMap size={40}/>, title: 'mDNS', list: [{id: 'mDNS', name: '主機名稱', type: 'text', text: '主機名稱請輸入25字以內', placeholder: networkInfo.mDNS}], buttonClick:  setmDNSData}
    ];

    const getNetworkInfo = async () => {
        try {
            const response = await fetch(get_network_url);
            const data = await response.json();
            console.log("networkInfo:", data);
            setNetworkInfo(data);
        }
        catch (error) {
            console.log(`[${get_network_url}]error:`, error);
        }
    }

    useEffect(() => {
        getNetworkInfo();
    }, [])

    function setmDNSData() {
        let mDNS = document.getElementById('mDNS_mDNS').value;

        console.log(`mDNS[${mDNS.length}]: ${mDNS}`);

        if(mDNS.length > 0 && mDNS.length < 25) {
            setNetworkData(`mDNS=${mDNS}`);
        }
    }

    function setSTAData() {
        let STA_ssid   = document.getElementById('STA_ssid').value;
        let STA_passwd = document.getElementById('STA_passwd').value;

        console.log(`STA_ssid[${STA_ssid.length}]: ${STA_ssid}, STA_passwd[${STA_passwd.length}]: ${STA_passwd}`);

        if(STA_ssid.length > 0 && STA_ssid.length < 25 && STA_passwd.length >= 8 && STA_passwd.length < 25) {
            setNetworkData(`STA_ssid=${STA_ssid}&STA_passwd=${STA_passwd}`);
        }
    }

    function setAPData() {
        let AP_ssid   = document.getElementById('AP_ssid').value;
        let AP_passwd = document.getElementById('AP_passwd').value;

        console.log(`AP_ssid[${AP_ssid.length}]: ${AP_ssid}, AP_passwd[${AP_passwd.length}]: ${AP_passwd}`);

        if(AP_ssid.length > 0 && AP_ssid.length < 25 && AP_passwd.length >= 8 && AP_passwd.length < 25) {
            setNetworkData(`AP_ssid=${AP_ssid}&AP_passwd=${AP_passwd}`);
        }
    }

    function setNetworkData(data) {
        fetch(set_network_url, {
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
            console.log(`[response]${set_network_url}:`, data);
        });
    }

    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                {
                    netWorkFormList.map((item) => {
                        return (
                            <Col key={item.id}>
                                <Card>
                                    <Card.Header>
                                        {item.svg} {item.title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            {
                                                item.list.map((subItem) => {
                                                    return (
                                                        <Form.Group className="mb-3" key={subItem.id}>
                                                            <Form.Label>{subItem.name}</Form.Label>
                                                            <Form.Control type={subItem.type} id={`${item.id}_${subItem.id}`} placeholder={subItem.placeholder} size="lg"/>
                                                            <Form.Text className="text-muted">
                                                                {subItem.text}
                                                            </Form.Text>
                                                        </Form.Group>
                                                    )
                                                })
                                            }
                                            <ListGroup.Item className="d-grid gap-2">
                                                <Button id={`${item.id}_button`} variant="outline-success" size="lg" onClick={item.buttonClick}>
                                                    存檔
                                                </Button>
                                            </ListGroup.Item>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
                <Col>
                    <Card>
                        <Card.Header>
                            <HddNetwork size={40}/> 網路狀態
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {
                                    netWorkInfoList.map((item) => {
                                        return (
                                            <ListGroup.Item key={item.id}>
                                                <Card.Title>
                                                    {item.svg} {item.title}
                                                </Card.Title>
                                                    {
                                                        item.list.map((sItem) => {
                                                            return(
                                                                <Row key={sItem.name}>{`${sItem.name}: ${sItem.value}`}</Row>
                                                            )
                                                        })
                                                    }
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Network;