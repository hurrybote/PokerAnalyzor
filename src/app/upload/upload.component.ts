import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from './upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput', {static:false}) fileInput;

  file: File | null = null;

  constructor(private upload: UploadService) { }
  // constructor() { }
  ngOnInit() {
  }

  onClickFileInputButton(): void{
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(){
    // const files: {[key: string]: File } = this.fileInput.nativeElement.files;
    const files = this.fileInput.nativeElement.files;
    console.log(files);
    if(files.length <= 0){return;}

    let file = files[0];
    console.log(file);
    let handlog_data = new FormData();
    handlog_data.append('upfile', file, file.name);

    // console.log(handlog_data.get('upfile'));

    this.upload.post_txt(file.name, handlog_data)

    // 読み込み後にanalysis画面へ飛ぶ
  }

}
