require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var expressHbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require("express-session");
const methodOverride = require('method-override');
const { helpers } = require('handlebars');



const passport = require('./passport/passport');
const nodemailer = require('./models/service/nodemailerService');
const connectDB = require('./data/db');
const indexRouter = require('./routes/index');
const brandsRouter = require('./routes/mobilephonesbrands');
const pagesRouter = require('./routes/pages');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const mailerRouter = require('./routes/mailer');


//var usersRouter =  require('./routes/users');
//var usersRouter = require('./routes/users');



//var productsRouter = require('./routes/product'); //import den file js routing

connectDB();

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({
  defaultLayout: '../layout',
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    section: hbs_sections(),
  }
}))
app.set('view engine', '.hbs');

var hbs = expressHbs.create({});

// register new function
hbs.handlebars.registerHelper('for', function (from, to, incr, product, block) {
  var accum = '';
  for (var i = from; i < to; i += incr)
    accum += block.fn(product[i]);

  return accum;
});

hbs.handlebars.registerHelper('equal', function (pagecurrent, value, block) {


  value = "?page=" + value;
  if (pagecurrent === value) {
    return true;
  }
  return false;
});

hbs.handlebars.registerHelper('forabc', function (from, to, incr, pagecurrent, totalpages, block) {
  var data = [];
  var object = {};
  var accum = '';
  for (var i = from; i < to; i += incr) {
    //console.log(totalpages);
    if (pagecurrent + i > totalpages - 1) {
      break;
    }
    //console.log(i);
    //console.log("pageCurrent:  ");
    object = {
      linkhasnextpage: "?page=" + (+pagecurrent + i + 1),
      numnextpage: +pagecurrent + i + 1
    };
    data.push(object);
    accum += block.fn(data[i]);
  }

  return accum;
});

app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.set('trust proxy',1);
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// pass req.user
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})


app.use('/', indexRouter);
app.use('/mobilephonesbrands', brandsRouter);
app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/mail', mailerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;