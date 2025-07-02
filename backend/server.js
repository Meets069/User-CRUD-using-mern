const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const userRoutes=require('./routes/user');

const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => console.log('Mongoose Connected'))
.catch((err) => console.log('Connection failed',err))

app.use('/api/user',userRoutes);

app.listen(PORT,()=> {
    console.log(`Sever is running on http://localhost:${PORT}`);
});

