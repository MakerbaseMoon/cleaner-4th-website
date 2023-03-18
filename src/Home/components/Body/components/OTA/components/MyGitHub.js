import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'

import { Button, Card, Row, Col, Container, ListGroup, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Tag, FileEarmarkMedical } from 'react-bootstrap-icons';

const github_owner = "MakerbaseMoon";
const github_repo  = "cleaner-4th-esp32";

const set_ota_url = "http://cleaner/api/ota/"

const MyGitHub = () => {
    const [gitHubOTAData, setGitHubOTAData] = useState(undefined);
    const [githubReleasesList, setGithubReleasesList] = useState([]);

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
        getGitHubOTAData();
    }, [])

    const handleSelect = (eventKey) => {
        console.log('Selected event key:', eventKey);
        setGitHubOTAData(githubReleasesList.find(releases => releases.tag_name === eventKey))
    };

    function handleButtonClick(type, file) {
        fetch(`${set_ota_url}${type}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `type=${type}&name=${file.name}&url=${file.browser_download_url}`
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(`[response]${set_ota_url}${type}/:`, data);
        });
    }

    return (
        <Container>
            <Row xs={1} md={1} className="align-items-center" style={{height: '85vh'}} >
                <Col>
                    <Card style={{height: '80vh'}} >
                        <Card.Header>
                            <Row>
                                <Col>
                                    <h2>{gitHubOTAData === undefined? "OTA 雲端更新" : gitHubOTAData.name}</h2>
                                </Col>
                                <Col style={{textAlign: 'right'}}>
                                    <DropdownButton as={ButtonGroup} title={gitHubOTAData === undefined? "Tag" :gitHubOTAData.tag_name} onSelect={handleSelect}>
                                        {
                                            githubReleasesList.map(releases => {
                                                
                                                return (
                                                    <Dropdown.Item key={releases.tag_name} eventKey={releases.tag_name}>{releases.tag_name}</Dropdown.Item>
                                                )
                                            })
                                        }
                                    </DropdownButton>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        src={gitHubOTAData === undefined? "" : `https://github.com/${gitHubOTAData.author.login}.png`}
                                        height="20"
                                        className="d-inline-block rounded-circle"
                                        alt={gitHubOTAData === undefined? "" : gitHubOTAData.author.login}
                                    />
                                    {gitHubOTAData === undefined? "" : ` ${gitHubOTAData.author.login}`} released this 
                                    {gitHubOTAData === undefined? "" : " " + (new Date(gitHubOTAData.published_at)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </Col>
                                <Col>
                                    <Tag size={20} /> {gitHubOTAData === undefined? "" : gitHubOTAData.tag_name} 
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <ReactMarkdown>{gitHubOTAData === undefined? "" : gitHubOTAData.body}</ReactMarkdown>
                        </Card.Body>

                        <Card.Footer>
                            <Card>
                                <Card.Header>
                                    Assets
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup className="list-group-flush">
                                        {
                                            gitHubOTAData === undefined? ('No Assets') : gitHubOTAData.assets.map((file) => {
                                                if(!(/\.bin$/.test(file.name))) {
                                                    return null;
                                                }
                                                return(
                                                    <ListGroup.Item key={file.name}>
                                                        <Row className='align-items-center'>
                                                            <Col className='h3'>
                                                                <a href={file.browser_download_url}><FileEarmarkMedical size={30}/>{file.name}</a>
                                                            </Col>
                                                            <Col>
                                                                {(new Date(file.updated_at)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                            </Col>
                                                            <Col className="d-grid gap-2" style={{textAlign: "right"}}>
                                                                {
                                                                    file.name.toLowerCase().indexOf("spiffs") !== -1 ? (
                                                                        <Button variant="outline-warning" size="lg" onClick={() => handleButtonClick("spiffs", file)}>
                                                                            燒入 {file.name}
                                                                        </Button>
                                                                    ) : file.name.toLowerCase().indexOf("firmware") !== -1 ? (
                                                                        <Button variant="outline-danger" size="lg" onClick={() => handleButtonClick("firmware", file)}>
                                                                            燒入 {file.name}
                                                                        </Button>
                                                                    ) : (
                                                                        <ButtonGroup size="lg">
                                                                            <Button variant="outline-primary" onClick={() => handleButtonClick("firmware", file)}>Firmware</Button>
                                                                            <Button variant="outline-primary" onClick={() => handleButtonClick("spiffs", file)}>SPIFFS</Button>
                                                                        </ButtonGroup>
                                                                    )
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                );
                                            })
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MyGitHub;