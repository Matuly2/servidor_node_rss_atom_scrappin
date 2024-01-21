const express = require('express');
const fs = require('fs');
const path = require('path');
const axios=require('axios');
const xml2js=require('xml2js');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{//devuelve el index
    var contenido=fs.readFileSync('public/index.html');
    res.setHeader('Content-type','text/html');
    res.send(contenido);
});

app.get('/json',(req,res)=>{
    fs.readFile('archivo.json','utf8',(err,data)=>{
        if(err){
            console.error('Error al leer el archivo JSON',err);
            res.status(500).send('Error interno del servidor');
        }else{
            const jsonData=JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.get('/rss',async(req,res)=>{
    try{
        const response=await axios.get('https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada');
        const xml=response.data;

        xml2js.parseString(xml,{explicitArray:false},(err,result)=>{
            if(err){
                throw err;
            }
            res.json(result);
        });
    }catch(error){
        res.status(500).send('Error al obtener el feed RSS');
    }
});
app.get('/atom', async (req, res) => {
    try {
        const response = await axios.get('https://www.bbc.com/mundo/ultimas_noticias/index.xml');
        const xml = response.data;
        
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error al parsear XML:', err);
                res.status(500).send('Error al parsear el feed RSS');
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error('Error al obtener el feed RSS:', error.message);
        res.status(500).send('Error al obtener el feed RSS');
    }
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
