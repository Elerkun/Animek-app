import { Anime } from "src/app/models/anime";

export class Usuario {
  id: number;
  nombre: string ;
  pass: string;
  createAt: string;
  email: string;
  foto : string;
  banner: string;
  anime: Anime[];


}
