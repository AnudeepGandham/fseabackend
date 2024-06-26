const exp = require('express')
const app = exp()
require('dotenv').config()
const mc = require('mongodb').MongoClient;
const path = require('path')
app.use(exp.json())

mc.connect(process.env.DB_URL)
.then(client=>{
    const fseadb = client.db('fseadb');
    const facultycollection = fseadb.collection('facultycollection');
    const admincollection = fseadb.collection('admincollection');
    const sdpcollection = fseadb.collection('sdpcollection');
    const reviewcollection = fseadb.collection('reviewcollection');
    app.set('facultycollection',facultycollection)
    app.set('admincollection',admincollection)
    app.set('sdpcollection',sdpcollection)
    app.set('reviewcollection',reviewcollection)
    console.log("Connection to FSEA Database successful")
})
.catch(err=>{
    console.log("ERROR in Database Connection")
})

const facultyApp = require('./api/facultyapi')
const adminApp = require('./api/adminapi')

app.use('/faculty-api',facultyApp)
app.use('/admin-api',adminApp)

app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message});
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{ console.log(`Web server running on port ${port}`)
})