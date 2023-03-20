import { useState } from 'react';

import MyNav from './components/MyNav';
import Body  from './components/Body';

const Home = () => {
    const [isClickItem, setIsClickItem] = useState( false );

    return (
        <div>
            <MyNav isClickItem={isClickItem} setIsClickItem={setIsClickItem} />
            <Body  isClickItem={isClickItem} />
        </div>
    );
}

export default Home;