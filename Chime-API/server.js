var createError = require("http-errors");
var cors = require("cors");
var express = require("express"); 
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var chimeRouter = require("./routes/chime");
var app = express();

// try commenting this out
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(cors());
const port = process.env.PORT;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/chime", chimeRouter);

app.get('/', (req, res) => {
    res.send('Chime API is running....');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
