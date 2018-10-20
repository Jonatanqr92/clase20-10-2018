import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the CreateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-list',
  templateUrl: 'create-list.html',
})
export class CreateListPage {

  public name: string;
  public description: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private api: ApiProvider) {
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  public createList(): void {
    const params = {
      name: this.name,
      description: this.description
    };
    this.api.createList(params).subscribe((status: boolean) => {
      if (status) {
        alert('lista creada');
      } else {
        alert('error');
      }
    })
  }

}