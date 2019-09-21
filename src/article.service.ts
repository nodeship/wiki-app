import { Article } from "./article.interface";

// https://en.wikipedia.org/api/rest_v1/page/random/summary'

const { xeta } = require('xeta');

export class ArticleService {

  private fetchRandomArticle(): Promise<Article> {
    return xeta.get('https://en.wikipedia.org/api/rest_v1/page/random/summary').toPromise();
  }

  getMany(n: number): Promise<Array<Article>> {
    return Promise.all(this.getManyArticlesPromises(n));
  }

  getManyArticlesPromises (n: number): Array<Promise<Article>> {
    let articlesPromises = [];
    for (let i = 0; i < n; i++) {
        articlesPromises.push(this.fetchRandomArticle())
    }
    return articlesPromises;
  }



  getOne(): Promise<Article>  {
    return this.fetchRandomArticle();
  }

}




