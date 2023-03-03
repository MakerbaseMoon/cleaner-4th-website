import { Container, Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { BatteryFull, Megaphone, Github, Justify, ChatLeftDots } from 'react-bootstrap-icons';

const MyNav = ({ isClickItem, setisClickItem }) => {
    const endLinks = [
        {id: 0, herf: "https://github.com/MakerbaseMoon/cleaner-4th-esp32", svg: <Github size={40} />, text: "點我進入 GitHub 總專案"},
        {id: 1, herf: "https://github.com/MakerbaseMoon/cleaner-4th-esp32/discussions", svg: <ChatLeftDots size={40} />, text: "點我進入 GitHub 問題討論區"},
        {id: 2, herf: "", svg: <Megaphone    size={40} />, text: "更新通知"},
        {id: 3, herf: "", svg: <BatteryFull  size={40} />, text: "電池剩餘： 80%"},
    ];
    
    function showBarText() {
        if (isClickItem === true) {
            setisClickItem(false);
        } else {
            setisClickItem(true);
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
                                <OverlayTrigger
                                    key={link.id + 'bottom'}
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={link.id + `tooltip-bottom`}>
                                            <span className='h5'>{link.text}</span>
                                        </Tooltip>
                                    }
                                >
                                <Nav.Link key={link.id} href={link.herf}>
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