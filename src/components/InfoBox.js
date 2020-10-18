import React from 'react'
import {
    Card,  
    CardContent,
    Typography
} from "@material-ui/core"

import '../componentCSS/InfoBox.css'

function InfoBox({title, cases, total}) {
    return (
        <Card classname="infoBox" style={{
            flex: '1',
            marginRight: '15px',
            width: 'auto'
        }}>
            <CardContent>
                <Typography classname="infoBox__title" color="textSecondary">
                {title}
                </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography classname="infoBox__total" color="textSecondary"> 
                    {total} Total
                </Typography>
            </CardContent>  
        </Card>
    )
}

export default InfoBox
