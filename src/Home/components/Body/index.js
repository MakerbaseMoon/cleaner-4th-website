import { useState } from 'react';

import Dashboard from './components/Dashboard';
import Bar      from './components/Bar';

import { Container, Row, Col } from 'react-bootstrap/';


const Body = ({ isClickItem, setIsClickItem }) => {
    const [bodyCard, setBodyCard] = useState(
        <Dashboard />
    );

    return (
        <Container fluid>
            <Row>
                <Col xs="auto">
                    <Bar isClickItem={isClickItem} setIsClickItem={setIsClickItem} setBodyCard={setBodyCard}/>
                </Col>
                <Col>
                    {bodyCard}
                </Col>
            </Row>
        </Container>
    );
}

export default Body;