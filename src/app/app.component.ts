import { Component, OnInit } from '@angular/core';

const CONFIG = {
  ELEMENTS: 300
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  makeChoice: any;
  list: Array = [];
  filteredList: Array = [];
  selectedList: Array = [];
  tempSelectedList: Array = [];
  componentData: Object = {};

  private _searchElement: string;

  get searchElement(): string {
    return this._searchElement;
  }

  set searchElement(value: string) {
    this._searchElement = value;
    this.filteredList = this.filterList(value);
  }

  constructor() {
    this.componentData = {
      main: {
        button: {
          text: "Изменить мой выбор",
          action: this.triggerUpdateBlock.bind(this),
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
            action: this.triggerUpdateBlock.bind(this)
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
    this.list = this.createData(CONFIG.ELEMENTS);
    this.filteredList = this.list;
  }

  createData(length) {
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

  triggerUpdateBlock() {
    this.componentData.update.container.show = !this.componentData.update.container.show;
  }

  saveUpdate() {
    this.selectedList = this.tempSelectedList;

    this.triggerUpdateBlock();
  }

  cancelUpdate() {
    this.triggerUpdateBlock();
  }

  filterList(search: string) {
    return this.list.filter(element => {
      return element.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
  }

  selectElement(el) {
    el.selected = !el.selected;

    this.tempSelectedList = this.list.filter(el => {
      return el.selected === true;
    });

    if (this.tempSelectedList.length == 3) {
      this._setDisabledFields(true);
    } else {
      this._setDisabledFields(false);
    }
  }

  removeElementFromSelected(el) {
    el.selected = false;

    for(let i = 0; i < this.selectedList.length; i++) {
      if (this.selectedList[i].id === el.id) {
        this.selectedList.splice(i, 1);
      }
    }
  }

  removeElementFromTemporarySelected(el) {
    el.selected = false;

    for(let i = 0; i < this.tempSelectedList.length; i++) {
      if (this.tempSelectedList[i].id === el.id) {
        this.tempSelectedList.splice(i, 1);
      }
    }
  }

  _setDisabledFields(bool) {
    for(let i = 0; i < this.filteredList.length; i++) {
      if (!this.filteredList[i].selected) {
        this.filteredList[i].disabled = bool;
      }
    }
  }
}
