import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
const MapTabs = () => {
    return (
        <Tabs
            variant="scrollable"
            textColor="primary"
            indicatorColor="primary"
            value={1}
        >
            <Tab label="one" />
            <Tab label="two" />
            <Tab label="three" />

        </Tabs>
    )
}

export default MapTabs;