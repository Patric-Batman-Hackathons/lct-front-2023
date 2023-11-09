import { ICameraStream } from "../common";

export interface INavigationState {
    items: ICameraStream[];
    addCameraDialogOpened: boolean;
}

export interface ICreateCameraStreamPayload {
    name: string;
    ip: string;
    login: string;
    password: string;
}