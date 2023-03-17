import { useState } from 'react';

import MyNav from './components/MyNav';
import Body  from './components/Body';

const Home = () => {
    const [isClickItem, setisClickItem] = useState(false);

    return (
        <div>
            <MyNav isClickItem={isClickItem} setisClickItem={setisClickItem} />
            <Body  isClickItem={isClickItem} setisClickItem={setisClickItem} />
        </div>
    );
}

export default Home;