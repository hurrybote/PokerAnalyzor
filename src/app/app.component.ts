import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { literal } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PokerAnalyzor';
  name = '';
  result = '';

  constructor(private http: HttpClient){}

  onchange(list: any){
    if(list.length <= 0){return;}

    let f = list[0];
    let data = new FormData();
    data.append('upfile', f, f.name);

    
  }
}
