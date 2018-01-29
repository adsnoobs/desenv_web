import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from '../../shared/service/login.service';
import { GlobalService } from '../../shared/service/global-variaveis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubs: Subscription;
  public Email: string;
  public Senha: string;
  public mensagem: string;
  public classMensagem: string;

  constructor(private loginService: LoginService, private router: Router, private globalService: GlobalService) {
    this.globalService.atualizaPaginaInteira(true);
    if (this.loginService.estaLogado()) {
      this.router.navigate([this.loginService.redirecionar || 'dashboard']);
    }
  }

  public login(e: Event) {
    e.preventDefault();
    this.loginSubs = this.loginService.login(this.Email, this.Senha).subscribe(
      resposta => {
        if (resposta.Sucesso) {
          this.classMensagem = 'alert-success';
          this.mensagem = 'Entrando no sistema';
          setTimeout(() => {
            this.router.navigate([this.loginService.redirecionar || 'dashboard']);
          }, 2000);
        } else {
          this.classMensagem = 'alert-danger';
          this.mensagem = resposta.Mensagem;
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.loginSubs) {
      this.loginSubs.unsubscribe();
    }
    this.loginService.redirecionar = undefined;
    this.globalService.atualizaPaginaInteira(false);
  }

}
