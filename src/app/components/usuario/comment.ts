import { Anime } from "src/app/model/anime";
import { Usuario } from "src/app/services/usuario/usuario";

export class Comment{
   id:number;
   foto:string;
	texto:string;
   usuario:Usuario;
   anime: Anime;
   anime_name: string;
   type_anime:string;
}
