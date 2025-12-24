import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PwaService } from '../services/pwa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('payroll');
  showInstallButton = false;
  private installPromptSubscription: Subscription = new Subscription();

  constructor(private pwaService: PwaService) {}

  ngOnInit() {
    this.installPromptSubscription = this.pwaService.installPrompt.subscribe(show => {
      this.showInstallButton = show;
    });
  }

  ngOnDestroy() {
    this.installPromptSubscription.unsubscribe();
  }

  installPwa() {
    this.pwaService.installPwa();
  }
}
