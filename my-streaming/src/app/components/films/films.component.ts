import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Category } from 'src/app/models/Category';
import { Film } from 'src/app/models/Film';
import { CategoriesService } from 'src/app/services/categories.service';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?: Film = new Film
  protected categories?: Category[]
  protected films?: Film[]

  constructor(private catService: CategoriesService, private filmsService: FilmsService) {


  }


  async ngOnInit(): Promise<void> {
    this.categories = await this.catService.getList()
    this.modal = Modal.getOrCreateInstance('#modal-film')
    this.films = await this.filmsService.getList()

  }

  public openModal(modalTitle: string, Id: number = 0): void {
    this.modalTitle = modalTitle

    if (Id == 0) {
      this.model = new Film()
    }
    else {
      this.model = this.films!.find(fil => {
        return fil.id == Id
      })
    }
    this.modal?.show()
  }

  public async removeFilm(id: number = 0): Promise<void> {
    this.filmsService.delete(id)
      .then(res => {
        this.films = this.films?.filter(add => add.id !== id)
        alert("Film rimosso con successo")
      })
  }
  public categoryName(id: number = 0): string {
    return this.categories?.find(c => {
      return c.id == id
    })?.description ?? ""
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.filmsService.add(this.model!)
        .then(res => {
          this.films?.push(res)
          this.modal?.hide()
          alert("Film aggiunto con successo")
        })
    }
    else {
      this.filmsService.update(this.model!)
        .then(res => {
          this.films = this.films?.filter(add => add.id !== res.id)
          this.films?.push(res)

          this.modal?.hide()
          alert("Film aggiornato con successo")
        })
    }
  }

}