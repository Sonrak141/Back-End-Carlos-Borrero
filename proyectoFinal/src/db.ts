const dotenv = require('dotenv');
const mongoose = require('mongoose');
const emoji = require('node-emoji');

dotenv.config();

mongoose.connect(
    process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error(err);
        }else{
            console.log(emoji.get('fire'), 'Conectado')
        }
    }
)

export default mongoose