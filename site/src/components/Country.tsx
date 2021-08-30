import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mdiMedal, mdiMinusCircle, mdiPlusCircle } from "@mdi/js";
import { OlympicCountry } from "../utils/util";

type Props = {
  data: OlympicCountry.CountryAward;
  refresh: () => void;
};
const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: 10,
  },
  gold: {
    color: "#d4af37",
  },
  silver: {
    color: "#c0c0c0",
  },
  bronze: {
    color: "#cd7f32",
  },
});

export default function Country(props: Props) {
  const { refresh } = props;
  const [data, setData] = useState<OlympicCountry.CountryAward>(props.data);
  const classes = useStyles();
  const rows = [
    { name: "gold", number: data.gold },
    { name: "silver", number: data.silver },
    { name: "bronze", number: data.bronze },
  ];

  const updateMedals = async (type: string, change?: string) => {
    const updateData: OlympicCountry.Country = {
      id: data.id,
      country: data.country,
      gold: type === "gold" ? (change === "up" ? data.gold + 1 : data.gold - 1) : data.gold,
      silver: type === "silver" ? (change === "up" ? data.silver + 1 : data.silver - 1) : data.silver,
      bronze: type === "bronze" ? (change === "up" ? data.bronze + 1 : data.bronze - 1) : data.bronze,
    };

    await fetch(`http://localhost:3001/api/awards`, {
      body: JSON.stringify(updateData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      method: "Post",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(new OlympicCountry.CountryAward(res));
        refresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className={classes.card}>
      <CardHeader title={`${data.country} Medals: ${data.totalMedals()}`}></CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name + Date.now()}>
                <TableCell>{row.number}</TableCell>
                <TableCell>
                  <SvgIcon
                    className={
                      row.name === "gold" ? classes.gold : row.name === "silver" ? classes.silver : classes.bronze
                    }
                  >
                    <path d={mdiMedal} />
                  </SvgIcon>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      updateMedals(row.name, "up");
                    }}
                  >
                    <SvgIcon>
                      <path d={mdiPlusCircle} />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      updateMedals(row.name);
                    }}
                  >
                    <SvgIcon>
                      <path d={mdiMinusCircle} />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
