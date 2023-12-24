import express, {Request, Response} from "express";

export const app = express()

app.use(express.json())
// app.use(blogRoute)
// app.use(postRoute)
// /ht_02/api/testing/all-data
// app.delete('/testing/all-data', (req: Request, res: Response) => {
//     // clearAllData();
//     res.sendStatus(204)
//         // .send('All data is deleted');
// })
//
//


// app.get('/api/blogs', (req: Request, res: Response) => {
//
//     res.status(200).send(blogs)
//
// })
// app.get('/api/blogs/:id', authMiddleware, (req: Request, res: Response) => {
//
//     let found = blogs.find((el) => el.id === +req.params.id)
//     if (!found) {
//         res.sendStatus(404)
//     }
//     res.status(200).send(blogs)
//
// })

// app.post('/api/blogs', authMiddleware, blogPostValidation(), (req: any, res: any) => {
//
//     blogs.push(req.body)
//     res.status(201).send(blogs)
// })

// app.put('/api/blogs/:id', blogPostValidation(), (req: any, res: any) => {
//     let found = blogs.find((el) => el.id === +req.params.id)
//
//     if (!found) {
//         res.sendStatus(404)
//         return;
//     }
//
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     }
//     blogs.push(req.body)
//     res.sendStatus(204)
// })
//
// app.delete('/api/blogs/delete', (req: Request, res: Response) => {
//     blogs.length = 0
//     res.status(204)
// })

//
// app.get('/videos/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
//
//     let founded = videos.find((el) => el.id === +req.params.id)
//
//     if (!founded) {
//         res.sendStatus(404)
//         return;
//     }
//     res.send(founded)
//
// })
//
//
// app.post('/videos', (req: RequestWithBody<Body>, res: Response) => {
//
//     let errors: ErrorType = {
//         errorsMessages: []
//     }
//     let {title, author, availableResolutions} = req.body
//
//     if (!title || !title.trim() || title.trim().length > 40) {
//         errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
//     }
//     if (!author || !author.trim() || author.trim().length > 20) {
//         errors.errorsMessages.push({message: 'Invalid author', field: 'author'})
//     }
//
//     if (Array.isArray(availableResolutions)) {
//         availableResolutions.map((el) => {
//             !AvailableResolutions.includes(el) && errors.errorsMessages.push({
//                 message: "Invalid availableResolutions",
//                 field: 'availableResolutions'
//             })
//
//         })
//     } else {
//         availableResolutions = []
//     }
//     if (errors.errorsMessages.length) {
//         res.status(400).send(errors)
//         return;
//     }
//
//     const createdAt = new Date()
//     const publicationDate = new Date()
//
//     publicationDate.setDate(createdAt.getDate() + 1)
//
//     const newVideo = {
//         id: +(new Date()),
//         canBeDownloaded: false,
//         minAgeRestriction: null,
//         createdAt: createdAt.toISOString(),
//         publicationDate: publicationDate.toISOString(),
//         title,
//         author,
//         availableResolutions
//     }
//
//     videos.push(newVideo)
//
//     res.status(201).send(newVideo)
//
// })
// type UpdateVideoDto = {
//     "title": string,
//     "author": string,
//     "availableResolutions": typeof AvailableResolutions,
//     "canBeDownloaded": boolean,
//     "minAgeRestriction": number | null,
//     "publicationDate": string
// }
//
// app.put('/videos/:id', (req: RequestWithBodyAndParams<{ id: string }, UpdateVideoDto>, res: Response) => {
//
//
//     let errors: ErrorType = {
//         errorsMessages: []
//     }
//
//     let {
//         title, author, availableResolutions, publicationDate,
//         minAgeRestriction,
//         canBeDownloaded
//     } = req.body
//
//     if (!title || !title.trim() || title.trim().length > 40) {
//         errors.errorsMessages.push({message: 'Invalid title', field: 'title'},
//         )
//     }
//
//     if (!author || !author.trim() || author.trim().length > 20) {
//         errors.errorsMessages.push({message: 'Invalid author', field: 'author'})
//     }
//
//     if (Array.isArray(availableResolutions)) {
//         availableResolutions.map((el) => {
//             !AvailableResolutions.includes(el) && errors.errorsMessages.push({
//                 message: "Invalid availableResolutions",
//                 field: 'availableResolutions'
//             })
//
//         })
//     } else {
//         availableResolutions = []
//     }
//     if (typeof canBeDownloaded === 'undefined') {
//         canBeDownloaded = false
//     }
//     if (typeof canBeDownloaded === 'string') {
//         errors.errorsMessages.push({message: 'Invalid canBeDownloaded', field: 'canBeDownloaded'})
//     }
//     if (typeof canBeDownloaded === 'boolean') {
//         errors.errorsMessages.push({message: 'Invalid canBeDownloaded', field: 'canBeDownloaded'})
//     }
//     if (typeof minAgeRestriction !== 'undefined' && typeof minAgeRestriction === 'number'
//     ) {
//         minAgeRestriction < 1 ||
//         minAgeRestriction > 18 && errors.errorsMessages.push({
//             message: "Invalid minAgeRestriction",
//             field: 'minAgeRestriction'
//         })
//     } else {
//         minAgeRestriction = null
//     }
//     if(typeof publicationDate === 'number'){
//         errors.errorsMessages.push({message: 'Invalid publicationDate', field: 'publicationDate'})
//
//     }
//     if (errors.errorsMessages.length) {
//         res.status(400).send(errors)
//         return;
//     }
//
//     const videoIndex = videos.findIndex(v => v.id === +req.params.id)
//     const video = videos.find(v => v.id === +req.params.id)
//
//     if (!video) {
//         res.sendStatus(404)
//         return;
//     }
//
//     const updateItem = {
//         ...video,
//         canBeDownloaded,
//         minAgeRestriction,
//         title,
//         author,
//         availableResolutions,
//         publicationDate: publicationDate ? publicationDate : video.publicationDate
//     }
//     videos.splice(videoIndex, 1, updateItem)
//
//     res.sendStatus(204)
// })
//
// app.delete('/videos/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
//     const id = +req.params.id
//
//     const indexId = videos.findIndex((el) => el.id === id)
//     const element = videos.find((el) => el.id === id)
//
//     if (!element) {
//         res.sendStatus(404)
//         return;
//     }
//     videos.splice(indexId, 1)
//     res.sendStatus(204)
//
// })
//
// app.delete('/testing/all-data', (req: Request, res: Response) => {
//
//
//     res.status(204).send('All data is deleted');
// })
//
//
//
//
//
