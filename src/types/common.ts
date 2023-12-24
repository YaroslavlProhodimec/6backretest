import {Request} from 'express'
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBodyAndParams<P, B> = Request<P, {}, B, {}>

type  ErrorType = {
    errorsMessages: ErrorMessageType[]
}

type  ErrorMessageType = {
    field: string
    message: string
}