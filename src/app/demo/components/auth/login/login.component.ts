import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccountService } from './shared/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    login = {
        email: '',
        senha: ''
      };

    valCheck: string[] = ['remember'];

    password!: string;

    username!: string;

        

    constructor(public layoutService: LayoutService,
        private accountService: AccountService,
        public router:Router
        ) {}


    async onSubmit() {

        console.log(this.login)
        try {
            const result = await this.accountService.login(this.login);
            console.log(`Login efetuado: ${result}`);

            this.router.navigate(['/dashboard']);
        } catch (error) {
            console.error(error);
        }
    }


        

    ngOnInit(): void {
        this.layoutService.onMenuToggle();
    }

    onLogin() {
        if (this.username === 'admin' && this.password === 'admin') {
            Swal.fire({
                title: 'Login realizado com sucesso!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                didClose: () => {
                    this.router.navigate(['/dashboard']);
                }
            })
        } else {
            Swal.fire({
                title: 'Login ou senha incorretos!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });

            
        }




        console.log('Este é o login', this.username, this.password);
    }


}
