import { Departement } from "./Departement";
import { Task } from "./Task";
    export interface Project {
    id?:number,
    description?:string
    name?: String 
    departement?: Departement 
    tasks?: Task[]  ;
    }