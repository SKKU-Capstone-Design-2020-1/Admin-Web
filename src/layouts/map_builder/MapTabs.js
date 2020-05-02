import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const MapTabs = ({ maps, mapIdx, setMapIdx }) => {

    const handleChange = (event, value) => {
        setMapIdx(value);
    }

    return (
        <Tabs
            variant="scrollable"
            textColor="primary"
            onChange={handleChange}
            indicatorColor="primary"
            value={mapIdx}
        >
            {maps && maps.map((map, idx) => (
                <Tab key={idx} label={map.name} />
            ))}

        </Tabs>
    )
}

export default MapTabs;