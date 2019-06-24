import { Component, OnInit } from '@angular/core';

const CONFIG = {
  ELEMENTS: 50
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  makeChoice: any;
  componentData: Object = {};

  list: Array = [];
  filteredList: Array = [];
  selectedList: Array = [];
  tempSelectedList: Array = [];

  bufferObj: Array = [];

  //*** filter
  private _searchElement: string;

  get searchElement(): string {
    return this._searchElement;
  }

  set searchElement(value: string) {
    this._searchElement = value;
    this.filteredList = this.filterList(value);
  }

  filterList(search: string) {
    return this.list.filter(element => {
      return element.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
  }
  //filter ***

  _createData(length) {
    let _arr: Array = [];

    for (let i = 1; i <= length; i++) {
      _arr.push({
        name:`Элемент ${i}`,
        id: `el${i}`,
        selected: false,
        disabled: false
      });
    }

    return _arr;
  }

  _compareObjects(x, y) {
    let same = true;

    for(let prop in x) {
      if(x[prop].selected !== y[prop].selected) {
        same = false;
        break;
      }
    }

    return same;
  }

  constructor() {
    this.componentData = {
      main: {
        button: {
          text: "Изменить мой выбор",
          action: this.showUpdateModal.bind(this),
          remove: "x"
        },
        selected: {
          text: "На данный момент элементов выбрано",
          makeChoice: "Сделайте свой выбор, нажмите кнопку ниже"
        },
        title: {
          text: "Выбор элементов"
        }
      },
      update: {
        container: {
          show: false
        },
        header: {
          text: "Диалог выбора элементов",
          button: {
            text: "X",
            action: this.hideUpdateModal.bind(this)
          }
        },
        filter: {
          byName: "Поиск"
        },
        buttons: {
          save: {
            text: "Сохранить",
            action: this.saveUpdate.bind(this)
          },
          cancel: {
            text: "Отмена",
            action: this.cancelUpdate.bind(this)
          }
        },
        temporary: {
          text: "Выбранные элементы на данный момент:"
        }
      }
    }
  }

  ngOnInit() {
    this.list = this._createData(CONFIG.ELEMENTS);
    this.filteredList = this.list;
  }

  showUpdateModal() {
    this.componentData.update.container.show = true;
    this.tempSelectedList = this.getSelectedElements();
    this.bufferObj = JSON.parse(JSON.stringify(this.filteredList));
  }

  hideUpdateModal() {
    this.componentData.update.container.show = false;
  }

  saveUpdate() {
    this.selectedList = this.getSelectedElements();
    this.hideUpdateModal();
  }

  cancelUpdate() {
   if (!this._compareObjects(this.bufferObj, this.filteredList)) {
     this.filteredList = JSON.parse(JSON.stringify(this.bufferObj));
   }

   this.hideUpdateModal();
  }

  selectElement(el) {
    el.selected = !el.selected;
    this.tempSelectedList = this.getSelectedElements();
    this.setDisabledFields();
  }

  getSelectedElements() {
    return this.filteredList.filter(el => el.selected === true);
  }

  removeElementFromSelected(el, location) {
    el.selected = false;
    location === 'main' ? this.selectedList = this.getSelectedElements() : this.tempSelectedList = this.getSelectedElements();
  }

  setDisabledFields() {
    if (this.getSelectedElements().length == 3) {
      for(let i = 0; i < this.filteredList.length; i++) {
        if (!this.filteredList[i].selected) {
          this.filteredList[i].disabled = true;
        }
      }
    } else {
      for(let i = 0; i < this.filteredList.length; i++) {
        if (!this.filteredList[i].selected) {
          this.filteredList[i].disabled = false;
        }
      }
    }
  }
}
