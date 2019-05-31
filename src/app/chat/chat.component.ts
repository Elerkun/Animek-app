import { Component, OnInit } from '@angular/core';
import {Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Mensaje} from './models/mensaje';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private cliente: Client;
  conectado: boolean = false;
  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  escribiendo_texto: string;
  clienteId: string;
  constructor() {
    this.clienteId = 'id-' + new Date().getUTCMilliseconds() + '-' + Math.random().toString(36).substr(2);
  }

  ngOnInit() {
    this.cliente = new Client();
    this.cliente.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/chat-websocket")
    }
    this.cliente.onConnect=(frame) => {
      console.log("conectados" + this.cliente.connected + ':' + frame)
      this.conectado= true;

      this.cliente.subscribe('/chat/mensaje', e =>{
        let mensaje : Mensaje = JSON.parse(e.body) as Mensaje;
        mensaje.fecha = new Date(mensaje.fecha);
        if(!this.mensaje.color && mensaje.tipo=="Nuevo_usuario" &&
          this.mensaje.username == mensaje.username){
             this.mensaje.color = mensaje.color;
        }
        this.mensajes.push(mensaje);
      });
      this.cliente.subscribe('/chat/escribiendo', e=> {
        this.escribiendo_texto = e.body;
        setTimeout(() => this.escribiendo_texto='', 3000)
      });
      this.cliente.subscribe('/chat/historial/' + this.clienteId, e=>{
        const historial = JSON.parse(e.body) as Mensaje[];
        this.mensajes = historial.map(m => {
          m.fecha = new Date(m.fecha);
          return m;
        }).reverse();
      });
      this.cliente.publish({destination: '/app/historial', body:this.clienteId});
      this.mensaje.tipo='Nuevo_usuario';
      this.cliente.publish({destination: '/app/mensaje', body: JSON.stringify(this.mensaje)});
    }
    this.cliente.onDisconnect =(frame) =>{
      console.log("desconectados" + this.cliente.connected + ':' + frame)
      this.conectado= false;
      this.mensaje =new Mensaje();
      this.mensajes = [];
      
    }

  }
  conectar(): void{
    this.cliente.activate();
  }
  desconectar():void{
    this.cliente.deactivate();
  }
  enviarMensaje(): void{
    this.mensaje.tipo='Mensaje';
    this.cliente.publish({destination: '/app/mensaje', body: JSON.stringify(this.mensaje)});
    this.mensaje.texto='';
  }
  escribiendo():void{
    this.cliente.publish({destination: '/app/escribiendo', body: this.mensaje.username});

  }
}
