import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-type': 'multipart/form-data',
    })
  }
  
  private errorHandler(err){
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }

  constructor(private http: HttpClient) { }

  public post_txt(filename, handlog_data){
    // バック側から送られてくるレスポンスがJSONでない場合
    // responseTypeを設定してあげないとダメ
    return this.http.post(
      "http://localhost:8808/upload/"+filename,
      handlog_data,
      {
        headers: this.httpOptions, responseType: 'text'
      })
    .toPromise()
    .then((res) => {
      console.log("送信完了")
    })
    .catch(this.errorHandler);
  }
}
