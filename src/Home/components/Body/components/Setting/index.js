import { useState } from 'react';

import Network from './components/Network'
import Module from './components/Module';

import { Card, Nav } from 'react-bootstrap/';

const Setting = () => {
    const links = [
        { id: 1, text: '網路設定', item: <Network />},
        { id: 2, text: '模組腳位設定', item: <Module />},
    ];

    const [item, setItem] = useState(
        <Network />
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
                    <Nav fill variant="tabs" defaultActiveKey="link-1">
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
                {item}
            </Card.Body>
        </Card>
    );
}

export default Setting;