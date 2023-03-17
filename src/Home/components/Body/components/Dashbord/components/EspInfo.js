import { useEffect } from "react";

const esp_info_url = "/api/esp/info/"

const EspInfo = () => {
    const getESPInfo = async () => {
        try {
            const response = await fetch( esp_info_url, { method: "POST" } );
            const data = await response.json();
            console.log("ESPInfo:", data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getESPInfo();
    }, [])

    return (
        <h1>EspInfo</h1>
    );
}

export default EspInfo;