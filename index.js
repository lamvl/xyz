const express = require('express');
const bodyParser = require('body-parser');

const upload = require('multer')({ dest: './public' });

const parser = bodyParser.urlencoded({ extended: false });
const app = express();
app.set('view engine', 'ejs');
app.set('views', './Views');
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => console.log('Server start'));

app.get('/', (req, res) => {
    res.render('home', { mang: arrTin });
});

app.get('/admin', (req, res) => res.render('admin', { mang: arrTin }));

app.post('/add', parser, (req, res) => {
    console.log(req.body);
    const tin = new Tin(req.body.title, req.body.desc, req.body.idVideo, req.body.image);
    arrTin.push(tin);    
    res.redirect('/admin');
});

app.get('/xoa/:index', (req, res) => {
    //console.log(req.params.stt);
    const { index } = req.params;
    arrTin.splice(index - 1, 1);
    res.redirect('/admin');
});

app.get('/sua/:index', (req, res) => {
    //console.log(req.params.stt);
    const { index } = req.params;
    const tin = arrTin[index - 1];
    tin.index = index;
    res.render('update', tin);
});

app.post('/sua', parser, (req, res) => {
    const { index, title, desc, idVideo, image } = req.body;
    const tin = new Tin(title, desc, idVideo, image);
    arrTin[index - 1] = tin;
    res.redirect('/admin');
});

app.get('/upload', (req, res) => res.render('upload'));
app.post('/upload', upload.single('avatar'), (req, res) => res.send('ThanhCong'));

class Tin {
    constructor(title, desc, idVideo, image) {
        this.title = title;
        this.desc = desc;
        this.idVideo = idVideo;
        this.image = image;
    }
}

const arrTin = [
    new Tin('Love In Public', 'So wise Noah, so wise. Beautiful and poignant as always', 
    '210876956', '18081777_th.jpg'),
    new Tin('LADY GAGA', 'LADY GAGA × Nobumichi Asai /Face mapping at Grammys 2016', '202890096', 
    '18081777_th.jpg')
];

