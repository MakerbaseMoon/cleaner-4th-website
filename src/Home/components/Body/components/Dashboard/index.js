import { useState } from 'react';

import MyController from './components/MyController';
// import EspInfo      from './components/EspInfo';
import Battery      from './components/Battery';

import { Card, Nav } from 'react-bootstrap/';

const Dashboard = () => {
    const links = [
        // { id: 1, text: 'ESP32狀態面板', item: <EspInfo />},
        { id: 2, text: '控制面板',      item: <MyController /> },
        { id: 3, text: '電池儀錶板',    item: <Battery /> },
    ];

    const [item, setItem] = useState(
        <MyController />
    );

    function clickHandler(_item) {
        setItem(
            _item
        );
    }

    return (
        <Card style={{height: "92vh"}}>
            <Card.Body>
                <Card.Title>
                    <Nav fill variant="tabs" defaultActiveKey="link-2">
                    {
                        links.map((link) => (
                            <Nav.Item key={link.id}>
                                <Nav.Link eventKey={`link-${link.id}`} onClick={() => clickHandler(link.item)}>
                                    {link.text}
                                </Nav.Link>
                            </Nav.Item>
                        ))
                    }
                    </Nav>
                </Card.Title>
                <Card.Body>
                    {item}
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

export default Dashboard;