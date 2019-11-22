import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  name = '';
  result = '';

  constructor(private http: HttpClient) { }
  // constructor() { }
  ngOnInit() {
  }

  onchange(list: any){
    if(list.length <= 0){return;}

    let f = list[0];
    console.log(f);
    let handlog_data = new FormData();
    handlog_data.append('upfile', f, f.name);

    console.log(handlog_data);

    
  }

}
