import {ArticleService} from './article.service';
import { Article } from './article.interface';
const articleTemplate = require('./articles.html');
export class WikiApp {

  element: HTMLElement | null = null;
  // dependency injection
  constructor(private articleService: ArticleService) {
    this.getElementRef();
  }

  async start() {
    console.log(articleTemplate);
    // fetch articles and render
    const articles = await this.articleService.get(3);
    this.render(this.mapToTemplate(articles).join('\n'));
  }

  getElementRef() {
      this.element = document.querySelector('#articles');
  }

  refresh() {
    // refresh articles and render again
  }

  mapToTemplate(articles: Article[]) {
    // map articles object to template
    return articles.map(article => `<div class="card">
    <img class="card-img-top" src="${article.thumbnail.source}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.extract}</p>
      <a href="${article.content_urls.desktop}" class="btn btn-primary">Read More</a>
      <button><i class="fas fa-heart"></i></button>
    </div>
  </div>`);
  }

  render(template: string) {
    // render to HTML
    if (this.element !== null) {
      this.element.innerHTML = template;
    }
  }
}

