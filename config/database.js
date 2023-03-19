const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
module.exports = mongoose.connect(process.env.MONGODB_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
).then(()=>{
    console.log('connected to database');
 }).catch((err)=>{
    console.log('not connected');
    console.log(err.message);
 })
