import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { SocketProvider } from "./context/SocketContext"

import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
)
