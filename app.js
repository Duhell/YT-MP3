import express from 'express'
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT || 3000 
import {frontend} from './page/renderFrontend.js'
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROUTES
app.get('/',(req,res)=>{
    let data = {
        isSuccess: false,
        errorMessage: "Convert YT to Mp3",
        song_link: null,
        songTitle: null
    }
    return res.send(frontend(data.isSuccess,data.errorMessage,data.song_link,data.songTitle))
})

app.post('/',async (req,res)=>{
    const youtubeVideoId = req.body.youtubeID
    if(youtubeVideoId === undefined || youtubeVideoId === null || youtubeVideoId === ""){
        let data = {
            isSuccess: false,
            errorMessage: "Insert a Youtube Video Id",
            song_link: null,
            songTitle: null
        }
        return res.send(frontend(data.isSuccess,data.errorMessage,data.song_link,data.songTitle))
    }else{
        const parameters = {
            "method": 'GET',
            "url": `https://youtube-mp36.p.rapidapi.com/dl`,
            "params": {id: youtubeVideoId},
            "headers": {
                "X-RapidAPI-Key": process.env.API_KEY,
                "X-RapidAPI-Host": process.env.API_HOST
            }
        }
        axios.request(parameters)
        .then((response)=>{
            let data = {
                isSuccess: true,
                errorMessage: null,
                song_link: response.data.link,
                songTitle: response.data.title
            }
            return res.send(frontend(data.isSuccess,data.errorMessage,data.song_link,data.songTitle))
        }).catch((err)=>{
            console.log(err)
        })
    }
})

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})