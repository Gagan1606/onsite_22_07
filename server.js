const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('.'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlshortener')
    .then(() => console.log('connected to db'));


const User = require('./models/user.js');

app.post('/userInput', async (req, res) => {
    try {
        let { userInput, customNameInput } = req.body;

        console.log('entered the userInnput route');

        let exists = await User.findOne({ customName: customNameInput });

        if (exists) {
            console.log('exists');
            return res.json({ message: 'custom name already exists' });
        }

        let tempUserInput = new User({
            url: userInput,
            customName: customNameInput
        });

        await tempUserInput.save();

        res.json({ shorturl: `http://localhost:3000/${customNameInput}` });
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send('Invalid Request');
    }
})

app.get('/:customNameInput', async (req, res) => {
    try {
        let { customNameInput } = req.params;
        let original = await User.findOne({ customName: customNameInput });
        // let original = await User.findById(req.params);
        res.redirect(original.url);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});







// const express = require('express');
// const app = express();
// const PORT = 3000;
// app.use(express.json());
// app.use(express.static('.'));

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/urlshortener')
//     .then(() => console.log('connected to db'));


// const User = require('./user.js');

// app.post('/userInput', async (req, res) => {
//     let { userInput, customNameInput } = req.body;


//     // let tempString = tempUserInput._id.toString();

//     // let tempString = tempUserInput.customName;


//     // tempUserInput.stringGenerated = tempString;
//     // console.log(tempString);

//     let exists = await User.findOne({ customName: customNameInput });
//     if (exists) return res.json({ error: 'Custom name exists already!' });

//     let tempUserInput = new User({
//         url: userInput,
//         customName: customNameInput
//     });

//     await tempUserInput.save();

//     res.json({ shorturl: `http://localhost:3000/${customNameInput}` });
// })

// app.get('/:customNameInput', async (req, res) => {
//     let { customNameInput } = req.params;
//     let original = await User.findOne({ customName: customNameInput });
//     // let original = await User.findById(req.params);
//     res.redirect(original.url);
// })

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



