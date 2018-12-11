module.exports = {
    port : process.env.PORT || 8000 ,
    db   : process.env.MONGODB || 'mongodb://localhost:27017/recove',
    SECRET_TOKEN : process.env.KEY_SECRET || 'miclavetokenXD',
    DOMAIN_NAME  : 'http://localhost:8000'
}