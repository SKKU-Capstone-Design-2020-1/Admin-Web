import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
const MapTabs = ({ maps }) => {
    return (
        <Tabs
            variant="scrollable"
            textColor="primary"
            indicatorColor="primary"
            value={0}
        >
            {maps && maps.map(map => (
                <Tab label={map.name} />
            ))}

        </Tabs>
    )
}

export default MapTabs;