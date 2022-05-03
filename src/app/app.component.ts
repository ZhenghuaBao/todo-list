import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './local-sotrage.service';
  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    constructor(private localStorageService: LocalStorageService) {}

    ngOnInit() {
      this.allStorage();
    }

    public items:any[] = [];
    public title:string = "Todo List"
    public u_id:number = 0

    public addTask(item:string)
    {
      this.items.push({id: this.u_id, name:item, checked:"false"})
      this.localStorageService.setItem(this.u_id.toString(), JSON.stringify({id: this.u_id, name:item, checked:"false"}))
      this.u_id = this.u_id + 1
    } 

    public removeTask(id:number)
    {
      this.items = this.items.filter(item => item.id !== id)
      this.localStorageService.removeItem(id.toString())
    }


    // retrieve all stored value
    public allStorage() 
    {
      var values = [],
      keys = Object.keys(localStorage),
      len = keys.length,
      tmp = 0,
      i = 0
      
      while (i < len) {
          var obj = localStorage.getItem(keys[i])
          if (obj !== null) {
            var value = JSON.parse(obj)
            values.push(value);
            if (Number(value.id) > tmp)
            {
              tmp = value.id
            }
            console.warn(localStorage.getItem(keys[i]))
          i = i+1
      }}
      
      this.items = values
      this.u_id = tmp+1

    }

    public clear()
    {
      this.localStorageService.clear()
      window.location.reload()
    }

    public changed(id:number, index:number)
    {
      this.items.map((item) => item.id == id? (item.cheked == "false"? item.checked = "true" : false) : null)
      this.localStorageService.removeItem(id.toString())
      this.localStorageService.setItem(id.toString(), JSON.stringify(this.items[index]))
    }

}