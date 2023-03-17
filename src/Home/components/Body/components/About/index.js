import { useState } from 'react';

import { Card, Nav } from 'react-bootstrap/';

import Maker from './components/maker';
import Teem from './components/Teem';

const About = () => {
    const links = [
        { id: 1, text: '創客基地', item: <Maker />},
        { id: 2, text: '望月智聯網研究團隊', item: <Teem />},
        // { id: 3, text: 'About', item: "< />" },
    ];

    const [item, setItem] = useState(
        <Maker />
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

export default About;