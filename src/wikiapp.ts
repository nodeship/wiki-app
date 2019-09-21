import {ArticleService} from './article.service';
import { Article } from './article.interface';
import {compile, template} from 'handlebars';
import {StorageService} from './storage.service';

const articleTemplate = require('./articles.html');
const likedArticlesTemplate = require('./liked-articles.html');

export class WikiApp {

  storageKey = 'wiki-liked';

  articles: Article[] = [];

  likedArticles: Partial<Article>[] = [];

  element: HTMLElement | null = null;
  likedArticlesElement: HTMLElement | null = null;
  // dependency injection
  constructor(
    private articleService: ArticleService,
    private localStorageService: StorageService
    ) {
    this.getElementRef();
  }

  async start() {
    this.sync();
    this.render(this.mapToTemplate({likedArticles: this.likedArticles}, likedArticlesTemplate), this.likedArticlesElement);
    // fetch articles and render
    for await (let article of this.articleService.getManyArticlesPromises(20)) {
      this.articles.push(article);
      this.render(this.mapToTemplate({ article }, articleTemplate ), this.element, true);
    };
    this.bindClickHandlers();
  }

  render(template: string, element: HTMLElement | null, append?: boolean) {
    // render to HTML
    if (element !== null) {
      if (append) {
        element.insertAdjacentHTML('beforeend', template);
      } else {
        element.innerHTML = template;
      }
    }
  }

  sync() {
    const likedArticles = this.localStorageService.getItem<Article[]>('wiki-liked');
    if (likedArticles) this.likedArticles = likedArticles as Article[];
  }

  getElementRef() {
      this.element = document.querySelector('#articles');
      this.likedArticlesElement = document.querySelector('liked-articles')
  }

  refresh() {
    // refresh articles and render again
  }

  mapToTemplate(data: object, templateString: string) {
      const templateDelegate = compile(templateString);
      const template = templateDelegate(data);
      return template;
  }

  bindClickHandlers() {
    let articles = Array.from(document.querySelectorAll('.card-body>.like-article'));
    articles.forEach( article => article.addEventListener('click', event => {
      const likeButton = event.target as HTMLElement;
      const article = this.articles.find(article => likeButton.dataset.pageId === String(article.pageid));
      if (article) {
        this.toggleLike(article);
        console.table(article);
        likeButton.classList.toggle('liked');
      }
    }));
  }


  toggleLike(article: Article) {

    const { pageid, title, content_urls } = article;

    if (!article.liked) {
      article.liked = true
      this.likedArticles.push({pageid, title, content_urls});
    } else {
      article.liked = false;
      let index = this.likedArticles.findIndex( article => article.pageid === pageid && article.title === title );
      if (index >= 0)  this.likedArticles.splice(index, 1);
    }

    this.localStorageService.setItem(this.storageKey, this.likedArticles);
  }

}

