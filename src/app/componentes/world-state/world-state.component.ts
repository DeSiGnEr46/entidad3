import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../servicios/blockchain.service';
import { Router } from '@angular/router';
import { Trans } from '../../interfaces/trans.interface';
import { LogService } from 'src/app/servicios/log.service';

@Component({
  selector: 'app-world-state',
  templateUrl: './world-state.component.html',
  styleUrls: ['./world-state.component.scss']
})
export class WorldStateComponent implements OnInit {

  channelall: Trans[];
  channel13: Trans[];

  channelall_lastKey: string = ""; 
  channel13_lastKey: string = "";

  constructor(private _blockService:BlockchainService, private _router: Router, private _logService:LogService) { 
  }

  ngOnInit() {
    this.queryChannelAll();
    this.queryChannel13();
    this.getLastKeyAll();
    this.getLastKey13();
  }

  esAdmin():boolean{
    return this._logService.esAdmin();
  }

  getLastKeyAll(){
    this._blockService.getLastKey("channelall").subscribe( (key) => {
      console.log(key.response);
      this.channelall_lastKey = (+key.response + 1).toString();
    })
  }

  getLastKey13(){
    this._blockService.getLastKey("channel13").subscribe( (key) => {
      console.log(key.response);
      this.channel13_lastKey = (+key.response + 1).toString();
    })
  }

  queryChannelAll(): any{
    this.getLastKeyAll();

    let lastIdx;
    if(this.channelall_lastKey == ""){
      lastIdx = "9";
    }else{
      lastIdx = this.channelall_lastKey;
    }
    this._blockService.queryTransactions("channelall","1",lastIdx).subscribe((datos) => {
      console.log(JSON.parse(datos.response));
      this.channelall = JSON.parse(datos.response);
    })
  }

  queryChannel13(): any{
    this.getLastKey13();

    let lastIdx;
    if(this.channel13_lastKey == ""){
      lastIdx = "9";
    }else{
      lastIdx = this.channel13_lastKey;
    }
    this._blockService.queryTransactions("channel13","1",lastIdx).subscribe((datos) => {
      console.log(JSON.parse(datos.response));
      this.channel13 = JSON.parse(datos.response);
    })
  }

}
