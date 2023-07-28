import { Departement } from "./Departement";

export interface User {
     id?:number;
     firstName: string;
     lastName: string;
     email: string;
     departement: Departement;
     status:boolean;
  }