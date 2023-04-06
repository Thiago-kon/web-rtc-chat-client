import { Grid, Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
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
  },
}))

export function VideoPlayer() {
  const { name, callAccepted, userVideo, myVideo, callEnded, stream, call } =
    useContext(SocketContext)
  const classes = useStyles()

  const videoRef = useRef(null)

  useEffect(() => {
    getVideo()
  }, [videoRef])

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.error("error:", err)
      })
  }

  return (
    <Grid container className={classes.gridContainer}>
      {/**Our own Video */}
      {stream ? (
        <Paper className={classes.paper} elevation={10}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            ></video>
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
