import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { CreateListPage } from '../create-list/create-list';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

export class ListsPage {
  public lists: Array<any>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.refreshLists();
  }

  private refreshLists(): void {
    this.api.getLists().subscribe((response: any) => {
      this.lists = response.lists;
    });
  }

  public addList() {
    const modal = this.modalCtrl.create(CreateListPage)
    modal.present();
    modal.onDidDismiss(() => {
      this.refreshLists();
    });
  }
}