const express = require('express')
const app = express();
const tasks  = require('./routes/tasks')
const connectDb = require('./db/connect')
require('dotenv').config()
const notfound = require('./middleware/notfound');
const errorHandle = require('./middleware/error-handler')

//middlewire 
app.use(express.static('./public'))
app.use(express.json())
//routes
app.use('/api/v1/tasks',tasks)

app.use(notfound)
app.use(errorHandle)
const port = process.env.PORT || 3000;

const start = async ()=>{
    try
    {
        await connectDb(process.env.MONGO_URI);
        app.listen(port,console.log(`app is running on ${port}`))
    }
    catch(err)
    {
        console.log(err)
    }

    
}
start()
