import { Typography, AppBar } from "@material-ui/core"

import { VideoPlayer } from "./components/VideoPlayer"
import { Notifications } from "./components/Notifications"
import { Options } from "./components/Options"

import { makeStyles } from "@material-ui/core/styles/"

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "0",
    background: "rgba(239, 243, 246, 0)",
    color: "rgba(239, 243, 246, 1)",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}))

function App() {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video chat App with socket io
        </Typography>
      </AppBar>

      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default App
