import { ReactNode, useContext, useState } from "react"
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { SocketContext } from "../context/SocketContext"

interface OptionsProps {
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "0",
    borderRadius: 15,
    background: "rgba(239, 243, 246, 0)",
    color: "rgba(239, 243, 246, 1)",
  },
  input: {
    color: "rgba(239, 243, 246, 1)",
  },
}))

export function Options({ children }: OptionsProps) {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext)
  const [idToCall, setIdToCall] = useState("")

  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                InputLabelProps={{ className: classes.input }}
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CopyToClipboard text={me}>
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                InputLabelProps={{ className: classes.input }}
                fullWidth
                label="ID To call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<PhoneDisabled fontSize="large" />}
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Phone fontSize="large" />}
                  onClick={() => callUser(idToCall)}
                  className={classes.margin}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}
