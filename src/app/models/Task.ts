import { Project } from "./Project";
import { User } from "./Users";

export interface Task {
    id?:number,
    description?:string
    project?: Project 
    users?: User 
    }