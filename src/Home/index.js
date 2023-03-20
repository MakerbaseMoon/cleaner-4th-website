import { useState } from 'react';
// import { useState, useEffect } from 'react';

import MyNav from './components/MyNav';
import Body  from './components/Body';

// const github_owner = "MakerbaseMoon";
// const github_repo  = "cleaner-4th-esp32";

const Home = () => {
    const [isClickItem,         setIsClickItem        ] = useState( false );
    // const [gitHubOTAData,       setGitHubOTAData      ] = useState( undefined );
    // const [ESPVersion,          setESPVersion         ] = useState( undefined );
    // const [githubReleasesList,  setGithubReleasesList ] = useState( [] );

    // const getESPVersion = async () => {
    //     try {
    //         const response = 
    //             await fetch(`/api/esp/version`, {
    //                 method: 'POST'
    //             });

    //         const data = await response.json();
    //         setESPVersion(data);
    //         console.log("ESP32 Version:", data['version']);
    //     }
    //     catch(error) {
    //         console.log("[/api/esp/version]error:", error);
    //     }
    // }

    // const getGitHubOTAData = async () => {
    //     try {
    //         const response = 
    //             await fetch(`https://api.github.com/repos/${github_owner}/${github_repo}/releases`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/vnd.github+json'
    //                 },
    //             });

    //         const data = await response.json();
    //         console.log("gitHubOTAData:", data);
    //         setGithubReleasesList(data);
    //         setGitHubOTAData(data[0]);
    //     }
    //     catch(error) {
    //         console.log(`[https://api.github.com/repos/${github_owner}/${github_repo}/releases]error:`, error);
    //     }
    // }

    // useEffect(() => {
    //      getESPVersion();
    //      getGitHubOTAData();
    // }, [])

    return (
        <div>
            <MyNav isClickItem={isClickItem} setIsClickItem={setIsClickItem} />
            <Body  isClickItem={isClickItem} setIsClickItem={setIsClickItem} />
        </div>
    );
}

export default Home;