import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
//isLoading: boolean=false;
isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
loadingText: Subject<string> = new Subject<string>()
  constructor() { }

  startLoading(loadingText= "loadingg"){
    //this.isLoading=true;
    this.isLoadingSubject.next(true);
    this.loadingText.next(loadingText)
  }

  stopLoading(){
   // this.isLoading=false;
   setTimeout(() => {
    this.isLoadingSubject.next(false);
   // this.loadingText.next("text finished")
  }, 1500);
  }
}
