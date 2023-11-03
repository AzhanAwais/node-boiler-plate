const App = require("./app")
const { PORT, DB_URL } = require("./config/index")

const app = new App(PORT, DB_URL)

app.initServer()