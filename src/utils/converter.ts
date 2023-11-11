import { IAPIStream, ICameraStream, IPostStream } from "../interfaces/common";

export function convertStream(backStream: IAPIStream): ICameraStream {
    const backUrl = import.meta.env.VITE_API_HOST;
    if (!backUrl) {
        throw new Error('Provide VITE_API_HOST');
    }

    return {
        id: backStream.uid,
        name: backStream.stream_name,
        login: backStream.username,
        password: backStream.password,
        url: backUrl + "back/transmition/",
        ip: backStream.url,
    }
}

export function convertFrontStream(frontStream: ICameraStream): IPostStream {
    const backUrl = import.meta.env.VITE_API_HOST;
    if (!backUrl) {
        throw new Error('Provide VITE_API_HOST');
    }

    return {
        stream_name: frontStream.name,
        username: frontStream.login,
        password: frontStream.password,
        url: frontStream.ip,
    }
}