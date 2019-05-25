import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  data = {};

  constructor(public storage: Storage) { }

  addHistory(key: string, value: Array<string>) {
    this.storage.set(key, value).then((response) => {
      // console.log('set ' + key + ' ', response);

      this.getHistory(key);

    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }

  getHistory(key: string) {
    this.storage.get(key).then((val) => {
      // console.log('get ' + key + ' ', val);

      this.data[key] = [];
      this.data[key] = val;

    }).catch((error) => {
      console.log('get error for ' + key + ' ', error);
    });
    return this.data[key];
  }

  setHistoryMessage(key: string, value: string, message: string) {
    this.storage.set(key, [value, message]).then((response) =>{
    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }

  removeHistory(key: string) {
    this.storage.remove(key).then(() => {
      // console.log('removed ' + key);
      this.data[key] = "";
    }).catch((error) => {
      console.log('remove error for ' + key + ' ', error);
    });
  }

  traverseHistory() {
    this.storage.forEach((value: Array<string>, key: string, iterationNumber: Number) => {
      console.log("key: " + key);
      console.log("iterationNumber: " + iterationNumber);
      console.log("value: " + value[0]);
      console.log("Message: " + value[1]);
    });
  }

  listHistoryKeys() {
    this.storage.keys().then((k) => {
      console.table(k);
    });
  }

  getTotalNumHistory() {
    this.storage.length().then((keysLength: Number) => {
      console.log("Total Keys: " + keysLength);
    });
  }

  clearAll() {
    this.storage.clear();
  }

  getStorage() {
    return this.storage;
  }
}
