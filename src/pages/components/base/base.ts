import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../constants/header/header';
import { Sidebar } from '../../../constants/sidebar/sidebar';
import { Footer } from '../../../constants/footer/footer';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-base',
  imports: [CommonModule, Header, Sidebar, RouterOutlet, Footer],
  templateUrl: './base.html',
  styleUrl: './base.css',
})
export class Base {

}
