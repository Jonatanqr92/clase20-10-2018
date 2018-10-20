import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { RegisterPage } from '../register/register';
import { ListsPage } from '../list/list';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  public login(): void {
    const params = {
      email: this.email,
      password: this.password
    }
    const loading = this.loadingCtrl.create({
      content: 'cargando.....'
    })

    loading.present();
    this.api.auth(params).subscribe((status: boolean) => {
      loading.dismiss();
      const toast = this.toastCtrl.create();
      if (status) {
        toast.setMessage('Autenticado con exito')
        toast.setDuration(1000);
        //cambiamos la pantalla que estamos viendo
        this.navCtrl.setRoot(ListsPage);
      } else {

        toast.setMessage('se presento un error')
        toast.setDuration(1000);}
   
      toast.present();
    });
  }

  public register(): void {
    this.navCtrl.push(RegisterPage);
  }

}