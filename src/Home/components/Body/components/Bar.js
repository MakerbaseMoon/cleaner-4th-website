import Dashbord from './Dashbord';
import Setting  from './Setting';
import About    from './About';
import OTA      from './OTA';

import { Navbar, Nav } from 'react-bootstrap';
import { HouseHeartFill, CloudArrowUp, Gear, InfoCircle} from 'react-bootstrap-icons';

import { useState, useEffect } from 'react';

const Bar = ({ isClickItem, setisClickItem, setIbodyCard }) => {
    const [activeItem, setActiveItem] = useState(undefined);

    const links = [
        { id: 0, svg: <HouseHeartFill size={40} className='pb-2'/>, item: <Dashbord /> },
        { id: 1, svg: <Gear           size={40} className='pb-2'/>, item: <Setting  /> },
        { id: 2, svg: <CloudArrowUp   size={40} className='pb-2'/>, item: <OTA      /> },
        { id: 3, svg: <InfoCircle     size={40} className='pb-2'/>, item: <About    /> },
    ];

    function clickHandler(_item) {
        setIbodyCard(
            _item
        );
    }

    const getESPVersion = async () => {
        try {
            const response = 
                await fetch(`/api/esp/verion`, {
                    method: 'POST'
                });

            const data = await response.json();
            console.log("ESP32 Version:", data['version']);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getESPVersion();
    }, [])

    function showText() {
        setActiveItem([
            "Dashbord",
            "Setting",
            "OTA Update",
            "About Us",
        ]);
    }

    function hideText() {
        if(!isClickItem) {
            setActiveItem(undefined);
        }
    }

    return (
        <Navbar>
            <Nav defaultActiveKey="link-0" className="flex-sm-column" onMouseMove={ () => {showText()} } onMouseOut={ () => {hideText()} }>
                {
                    links.map((link) => (
                        <Nav.Link key={link.id} onClick={() => clickHandler(link.item)} eventKey={"link-" + link.id}>
                            <div key={link.id} className="fs-3">
                                    {link.svg}
                                    {(activeItem === undefined)? "" : activeItem[link.id]}
                            </div>
                        </Nav.Link>
                    ))
                }
            </Nav>
        </Navbar>
    );
}

export default Bar;