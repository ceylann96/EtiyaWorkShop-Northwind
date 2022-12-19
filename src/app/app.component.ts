import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string = 'etiya-kadir-angular';
  constructor(private loadingService: LoadingService){}
  
  isLoading: boolean =false;
  isLoadingText!: string;
  
  ngOnInit(): void {
    this.subscribeToLoading();
    this.subscribeToLoadingText();
  }
  
  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading)=> {
      this.isLoading = isLoading;
    });
  }
  subscribeToLoadingText() {
    this.loadingService.loadingText.subscribe((isLoadingText)=> {
      this.isLoadingText = isLoadingText;
    });
  }
  
}
