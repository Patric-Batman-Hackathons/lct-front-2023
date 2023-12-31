import { ICameraStream } from "../common";

export interface INavigationState {
    items: ICameraStream[];
    selectedItem: ICameraStream | null;
    addCameraDialogOpened: boolean;
}

export interface ICreateCameraStreamPayload {
    name: string;
    ip: string;
    login: string;
    password: string;
}