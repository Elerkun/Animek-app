import { Usuario } from 'src/app/usuario/usuario';
import { Anime } from 'src/app/anime-page/anime';
export class Comment{
   id:number;
   foto:string;
	 texto:string;
   usuario:Usuario;
   anime: Anime;
   anime_name: string;
   type_anime:string;
}
