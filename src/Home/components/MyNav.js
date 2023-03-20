import { useState, useEffect } from 'react';

import { Container, Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { BatteryFull, Megaphone, Github, Justify, ChatLeftDots } from 'react-bootstrap-icons';

const project_url     = "https://github.com/MakerbaseMoon/cleaner-4th-esp32";
const discussions_url = "https://github.com/MakerbaseMoon/cleaner-4th-esp32/discussions";

const MyNav = ({ isClickItem, setIsClickItem }) => {
    const [electricity, setElectricity] = useState("連線中...");

    const getESPElectricity = async () => {
        try {
            const response = 
                await fetch(`/api/get/battery`, {
                    method: 'POST'
                });

            const data = await response.json();
            console.log("ESP32 Battery electricity:", data['electricity']);
            setElectricity(`${data['electricity']}%`);
        }
        catch(error) {
            console.log("[/api/get/battery]error:", error);
        }
    }

    useEffect(() => {
        getESPElectricity();
        setInterval(() => {
            getESPElectricity();
        }, 10000);

    }, [])

    const endLinks = [
        {id: 0, href: project_url,      svg: <Github       size={40} />, text: "點我進入 GitHub 總專案"},
        {id: 1, href: discussions_url,  svg: <ChatLeftDots size={40} />, text: "點我進入 GitHub 問題討論區"},
        {id: 2, href: "",               svg: <Megaphone    size={40} />, text: "更新通知"},
        {id: 3, href: "",               svg: <BatteryFull  size={40} />, text: `電池剩餘： ${electricity}`},
    ];
    
    function showBarText() {
        if (isClickItem === true) {
            setIsClickItem(false);
        } else {
            setIsClickItem(true);
        }
    }

    return (
        <Navbar fill="1" style={{height: "7vh"}}>
            <Container fluid>
                <Nav className="flex-grow-1 pe-5">
                    <Nav.Link onClick={showBarText}>
                        <Justify size={40}/>
                    </Nav.Link>
                    <Navbar.Brand href="">
                        <img
                            src="/cleaner.png"
                            height="44"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Nav>

                <Navbar.Collapse>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        {
                            endLinks.map((link) => (
                                <OverlayTrigger key={link.id + 'bottom'} placement='bottom'
                                    overlay={
                                        <Tooltip id={link.id + `tooltip-bottom`}>
                                            <span className='h5'>{link.text}</span>
                                        </Tooltip>
                                    }
                                >
                                <Nav.Link key={link.id} href={link.href}>
                                    {link.svg}
                                </Nav.Link>
                                </OverlayTrigger>
                            ))
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNav;