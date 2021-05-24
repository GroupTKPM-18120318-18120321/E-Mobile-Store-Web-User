var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB=require('./data/db');
var expressHbs =  require('express-handlebars');

var indexRouter = require('./routes/index');
var brandsRouter = require('./routes/mobilephonesbrands');
var pagesRouter = require('./routes/pages');
//var usersRouter = require('./routes/users');
//var productsRouter = require('./routes/product'); //import den file js routing

connectDB();

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({ defaultLayout: '../layout', extname: '.hbs',  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }}))
app.set('view engine', '.hbs');

var hbs = expressHbs.create({});

// register new function
hbs.handlebars.registerHelper('for', function(from, to, incr, product ,block) {
  var accum = '';
  for(var i = from; i < to; i += incr)
      accum += block.fn(product[i]);
     
  return accum;
});

hbs.handlebars.registerHelper('equal', function(pagecurrent, value , block) {
  
    
    value = "?page=" + value;
    if(pagecurrent === value)
    {
      return true;
    }
    return false;
});

hbs.handlebars.registerHelper('forabc', function(from, to, incr, pagecurrent, totalpages, block) {
  var data = [];
  var object = {};
  var accum = '';
  for(var i = from; i < to; i += incr)
    {
      //console.log(totalpages);
      if(pagecurrent + i > totalpages - 1){
        break;
      }
      //console.log(i);
      //console.log("pageCurrent:  ");
      object ={linkhasnextpage: "?page=" + (+pagecurrent + i + 1),numnextpage:  +pagecurrent + i + 1};
      data.push(object);
      accum += block.fn(data[i]);
    }
  
  return accum;
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mobilephonesbrands', brandsRouter); 
app.use('/pages', pagesRouter); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

  
module.exports = app;