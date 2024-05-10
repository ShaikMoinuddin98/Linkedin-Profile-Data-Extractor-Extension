const express = require("express")
const app = express()
const bodyParser = require("body-parser")


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('atg', 'root', 'Moin7396', {
    host: 'localhost',
    dialect: 'mysql'
});

const { DataTypes } = require('sequelize');

//model
const Profile = sequelize.define('Profile', {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    link: {
        type: DataTypes.STRING,

    },
    about: {
        type: DataTypes.TEXT
    },
    bio: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING
    },
    followers: {
        type: DataTypes.INTEGER
    },
    connections: {
        type: DataTypes.INTEGER
    },
},
    {
        timestamps: false

    });



app.use(bodyParser.json());

//allowing cors access from any site
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//function for extracting number from text
function extractNumber(text) {
    // Check if text is a string
    if (typeof text !== 'string') {
        return null;
    }

    // Remove commas and non-numeric characters from the text
    const sanitizedText = text.replace(/[^\d]/g, '');

    // Parse the number from the sanitized text
    const number = parseInt(sanitizedText, 10);

    // If a valid number is parsed, return it; otherwise, return null
    return isNaN(number) ? null : number;
}


//api for saving profile data
app.post("/linkedinsave", async (req, res) => {
    try{
    
    console.log(req.body)

    let { name, link, bio, about, location, connections, followers } = req.body
    connections = extractNumber(connections)
    followers = extractNumber(followers)
    //saving the data
    const profile = await Profile.create({
        name,
        link,
        about,
        bio,
        location,
        connections,
        followers
    });
    console.log(profile)

   
    res.status(200).json({"message":"data extracted"})
}
catch(err)
{
    console.log(err)
    res.status(400).json({"message":err.message})
}

})



app.listen("9000", () => {
    console.log("listening")
})
