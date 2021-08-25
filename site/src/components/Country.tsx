import { Card, CardActions, CardContent, CardHeader, IconButton, SvgIcon } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mdiMedal, mdiMinusCircle, mdiPlusCircle } from "@mdi/js";
import { CountryAward } from "../utils/util";

type Props = {
  data: CountryAward;
};
const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: 10,
  },
  medal: {
    color: "#d4af37",
  },
});

export default function Country(props: Props) {
  const [data, setData] = useState<CountryAward>(props.data);
  const classes = useStyles();

  const updateMedals = async (change: string) => {
    const medals = change === "up" ? data.medals + 1 : change === "down" ? data.medals - 1 : data.medals;
    const updateData: CountryAward = {
      id: data.id,
      country: data.country,
      medals: medals,
    };

    await fetch(`http://localhost:3001/api/awards`, {
      body: JSON.stringify(updateData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      method: "Post",
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  return (
    <Card className={classes.card}>
      <CardHeader title={data.country}></CardHeader>
      <CardContent>
        <SvgIcon className={classes.medal}>
          <path d={mdiMedal} />
        </SvgIcon>
        {data.medals}
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          onClick={() => {
            updateMedals("up");
          }}
        >
          <SvgIcon>
            <path d={mdiPlusCircle}></path>
          </SvgIcon>
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => {
            updateMedals("down");
          }}
        >
          <SvgIcon>
            <path d={mdiMinusCircle}></path>
          </SvgIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
}
