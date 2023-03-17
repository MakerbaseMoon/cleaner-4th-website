import { useState } from 'react';

import { Card, Nav } from 'react-bootstrap/';

import MyGitHub from './components/MyGitHub';
// import MyHost from './components/MyHost';

const OTA = () => {
    const links = [
        { id: 1, text: '雲端更新', item: <MyGitHub />},
        // { id: 2, text: '本地端更新', item: <MyHost />},
    ];

    const [item, setItem] = useState(
        <MyGitHub />
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

export default OTA;