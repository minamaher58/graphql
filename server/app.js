const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// alloww cross-origin requests
app.use(cors());

const uri = "mongodb+srv://mina:3N3xwn8ADxmQbC67@cluster0.opyvs.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true});

mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema: schema,   // or just type schema
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log('now listening for requests on port 4000');
});