import { useState } from 'react';

import MyNav from './components/MyNav';
import Body  from './components/Body';

const github_owner = "MakerbaseMoon";
const github_repo  = "cleaner-4th-esp32";

const Home = () => {
    const [isClickItem,         setIsClickItem        ] = useState( false );
    const [gitHubOTAData,       setGitHubOTAData      ] = useState( undefined );
    const [githubReleasesList,  setGithubReleasesList ] = useState( [] );

    const getESPVersion = async () => {
        try {
            const response = 
                await fetch(`/api/esp/version`, {
                    method: 'POST'
                });

            const data = await response.json();
            console.log("ESP32 Version:", data['version']);
        }
        catch (e) {
            console.log(e)
        }
    }

    const getGitHubOTAData = async () => {
        try {
            const response = 
                await fetch(`https://api.github.com/repos/${github_owner}/${github_repo}/releases`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.github+json'
                    },
                });

            const data = await response.json();
            console.log("gitHubOTAData:", data);
            setGithubReleasesList(data);
            setGitHubOTAData(data[0]);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getESPVersion();
        getGitHubOTAData();
    }, [])

    return (
        <div>
            <MyNav isClickItem={isClickItem} setIsClickItem={setIsClickItem} />
            <Body  isClickItem={isClickItem} setIsClickItem={setIsClickItem} />
        </div>
    );
}

export default Home;