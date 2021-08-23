import { Button, Card, CardActions, CardContent, CardHeader, SvgIcon } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { mdiMedal } from '@mdi/js'; 

type Props = {
    name: string;
}
const useStyles = makeStyles({
    card: {
        maxWidth: 300,
        margin: 10
    },
    medal: {
        color: "#d4af37"
    }
})

export default function Country(props: Props) {
    const { name } = props;
    const classes = useStyles();
    const [medals,  setMedals] = useState<number>(0);

    console.log(name)

    return(
        <Card className={classes.card}>
            <CardHeader title={name}></CardHeader>
            <CardContent><SvgIcon className={classes.medal} ><path d={mdiMedal} /></SvgIcon>{medals}</CardContent>
            <CardActions >
                
                <Button variant="contained" color="primary" onClick={() => {
                setMedals(medals + 1)
            }}>add</Button>
            </CardActions>
        </Card>
    )
}