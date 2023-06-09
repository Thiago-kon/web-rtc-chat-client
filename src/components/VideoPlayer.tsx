import { Grid, Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"
import Webcam from "react-webcam"

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    height: "100%",
    borderRadius: 15,
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    borderRadius: 15,
    border: "0",
    margin: "10px",
    background: "rgba(239, 243, 246, 0)",
    color: "rgba(239, 243, 246, 1)",
    heigth: "100%",
  },
}))

export function VideoPlayer() {
  const { name, callAccepted, userVideo, callEnded, stream, call } =
    useContext(SocketContext)
  const classes = useStyles()

  return (
    <Grid container className={classes.gridContainer}>
      {/**Our own Video */}
      {stream ? (
        <Paper className={classes.paper} elevation={10}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <Webcam className={classes.video} audio={false} />
          </Grid>
        </Paper>
      ) : null}

      {/**user`s  Video */}
      {callAccepted && !callEnded ? (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call?.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            ></video>
          </Grid>
        </Paper>
      ) : null}
    </Grid>
  )
}
