import express from "express";
import axios from "axios";

import bodyParser from "body-parser";
const app= express();
const port=3000;
const API_URL="https://api.codetabs.com/v1/weather/?city=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var tempinc;

app.get("/",async(req,res)=>{
    try{
        const result=await axios.get(API_URL+"nagpur");
        tempinc=result.data.tempC;
        console.log(tempinc);
        res.render("index.ejs",{
            current:"Default",
            location:result.data.city,
            temperature:result.data.tempC,
            tempF:result.data.tempF,
            country:result.data.country,
            lat:result.data.latitude,
            long:result.data.longitude,
            content: JSON.stringify(result.data),
        });
    }
    catch(error){
        console.log(error.response.data);
        res.status(500);
    }
});
app.get("/get-info",async(req,res)=>{
    try{
        const searchId = req.query.city;
        const result = await axios.get(API_URL+searchId);
        console.log(searchId);
        tempinc=result.data.tempC;
        res.render("index.ejs",{
            current:"Searched",
            location:(result.data.city),
            temperature:result.data.tempC,
            tempF:result.data.tempF,
            country:result.data.country,
            lat:result.data.latitude,
            long:result.data.longitude,
            });
        
    }
    catch(error){
        console.log(error.response.data);
        res.status(500);
    }
});



app.listen(port,()=>{
    console.log(`listening on ${port}`);
})