import { Usuario } from 'src/app/usuario/usuario';
import { Anime } from './Anime';
export class Comment{
   id:number;
   foto:string;
	 texto:string;
   usuario:Usuario;
   anime: Anime;
}
