require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     res.status(503).send()
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const multer = require('multer')

const upload = multer({
    'dest': 'images',
    'limits': {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("Please upload a Word Document"))
        }
        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})