import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadService } from './upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private upload: UploadService) { }
  // constructor() { }
  ngOnInit() {
  }

  onchange(list: any){
    if(list.length <= 0){return;}

    let f = list[0];
    console.log(f);
    let handlog_data = new FormData();
    handlog_data.append('upfile', f, f.name);

    // console.log(handlog_data.get('upfile'));

    this.upload.post_txt(f.name, handlog_data)

    // 読み込み後にanalysis画面へ飛ぶ
  }

}
