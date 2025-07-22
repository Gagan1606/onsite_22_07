const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('.'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlshortener');

const { User } = require('./models/user.js');

app.post('/userInput', async(req, res) => {
    let { userInput } = req.body;
    let tempUserInput = new User({
        url: userInput,
        stringGenerated: null
    });

    // let tempString = userInput.toString(36);
    let tempString = tempUserInput._id.toString();
    
    tempUserInput.stringGenerated = tempString;
    console.log(tempString);
    await tempUserInput.save();
    
    res.json({shorturl : `http://localhost:3000/${tempString}`});
})

app.get('/:tempString', async(req, res)=>{
    let {tempString} = req.params;
    let original = await User.findOne({stringGenerated : tempString});
    // let original = await User.findById(req.params);
    

    res.redirect(original.url);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
