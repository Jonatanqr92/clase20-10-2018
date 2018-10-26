import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  [x: string]: any;

  public list: any;
  public items: Array<any>
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, private alertCtrl: AlertController ){
  }

  ionViewDidLoad() {
    this.list = this.navParams.get('list');
    this.refresh();
    
  }

  public refresh ():void {
    this.api.getItems(this.list).subscribe((response: any) => {
      this.items = response.items;
      console.log(this.items);
    });
  }

  public addItem(): void {
    const prompt = this.alertCtrl.create({
      title: 'Nueva Tarea',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.api.createItem(data, this.list).subscribe((status: boolean)=>{
              if(status){
                this.refresh()

              } else {
                alert('Error');
              }
            });


          }
        }
      ]
    });
    prompt.present();
  }
  public updateItem(item): void {
    this.api.finishItem(item, this.list).subscribe((status: boolean) => {
      if(status){
        this.refresh();
      } else {
        alert('error');
      }
    })
  }
}