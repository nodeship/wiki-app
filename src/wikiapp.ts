import {ArticleService} from './article.service';
import { Article } from './article.interface';
const articleTemplate = require('./articles.html');
import {compile, template} from 'handlebars';
import {LocalStorageService} from './local-storage.service';

export class WikiApp {

  storageKey = 'wiki-liked';

  articles: Article[] = [];

  likedArticles: Partial<Article>[] = [];

  element: HTMLElement | null = null;
  // dependency injection
  constructor(
    private articleService: ArticleService,
    private localStorageService: LocalStorageService
    ) {
    this.getElementRef();
  }

  async start() {
    this.sync();
    // fetch articles and render
    for await (let article of this.articleService.getManyArticlesPromises(1)) {
      this.articles.push(article);
      this.render(this.mapToTemplate([article]).join('\n'));
    };
    this.bindClickHandlers();
  }

  render(template: string) {
    // render to HTML
    if (this.element !== null) {
      this.element.insertAdjacentHTML('beforeend', template);
    }
  }

  sync() {
    const likedArticles = this.localStorageService.getItem<Article[]>('wiki-liked');
    if (likedArticles) this.likedArticles = likedArticles as Article[];
  }

  getElementRef() {
      this.element = document.querySelector('#articles');
  }

  refresh() {
    // refresh articles and render again
  }

  mapToTemplate(articles: Article[]) {
    // map articles object to template
    return articles.map(article => {
      const templateDelegate = compile(articleTemplate);
      const template = templateDelegate({article});
      return template;
    });
  }

  bindClickHandlers() {
    let articles = Array.from(document.getElementsByClassName('like-article'));
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
      if (index >= 0)  delete this.likedArticles[index];
    }

    this.localStorageService.setItem(this.storageKey, this.likedArticles);
  }

}

