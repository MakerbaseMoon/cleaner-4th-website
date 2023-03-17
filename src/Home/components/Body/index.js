import { useState } from 'react';

import Dashbord from './components/Dashbord';
import Bar      from './components/Bar';

import { Container, Row, Col } from 'react-bootstrap/';


const Body = ({ isClickItem, setisClickItem }) => {
    const [bodyCard, setIbodyCard] = useState(
        <Dashbord />
    );

    return (
        <Container fluid>
            <Row>
                <Col xs="auto">
                    <Bar isClickItem={isClickItem} setisClickItem={setisClickItem} setIbodyCard={setIbodyCard}/>
                </Col>
                <Col>
                    {bodyCard}
                </Col>
            </Row>
        </Container>
    );
}

export default Body;