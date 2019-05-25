import { Component, OnInit } from '@angular/core';
import { HistoryService } from './../services/history.service';

@Component({
  selector: 'app-full-history',
  templateUrl: './full-history.page.html',
  styleUrls: ['./full-history.page.scss'],
})
export class FullHistoryPage implements OnInit {

  data = {};
  keys = [];
  keysToPrint = [];
  edit = [];
  inputMessage: string = "";

  constructor(public historyStorage : HistoryService) { }

  ngOnInit() {
    var tempStorage;
    tempStorage = this.historyStorage.getStorage();
    tempStorage.forEach((value: Array<string>, key: string, iterationNumber: Number) => {
      this.data[key] = value;
      this.keys.push(key);
      this.keysToPrint.push(key.split("!",2)[0]);
      this.edit.push(false);
    });
  }

  printData() {
    console.log(this.data);
    console.log(this.keys);
    console.log(this.keysToPrint);
    console.log(this.edit);
  }

  removeHistoryEvent(key) {
    this.historyStorage.removeHistory(key);
    delete this.data[key];
    var index = this.keys.indexOf(key, 0);
    if (index > -1) {
       this.keys.splice(index, 1);
    }
    index = this.keysToPrint.indexOf(key, 0);
    if (index > -1) {
       this.keysToPrint.splice(index, 1);
    }
    index = this.edit.indexOf(key, 0);
    if (index > -1) {
       this.edit.splice(index, 1);
    }
  }

  editInit(key) {
    const index = this.keys.indexOf(key, 0);
    for(var i = 0; i < this.keys.length; i++) {
      if(index != i) {
        this.edit[i] = false;
      } else {
        this.edit[i] = true;
      }
    }
    this.inputMessage = "";
  }

  editHistoryMessage(key) {
    this.historyStorage.setHistoryMessage(key, this.data[key][0], this.inputMessage);
    this.edit[this.keys.indexOf(key, 0)] = false;
    this.data[key][1] = this.inputMessage;
  }


}
