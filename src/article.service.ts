import { Article } from "./article.interface";

// https://en.wikipedia.org/api/rest_v1/page/random/summary'

const { xeta } = require('xeta');

export class ArticleService {
  get(n: number): Promise<Array<Article>> {
    let articlesPromises = [];
    for (let i = 0; i < n; i++) {
        articlesPromises.push(xeta.get('https://en.wikipedia.org/api/rest_v1/page/random/summary')
        .toPromise());
    }
    return Promise.all(articlesPromises);
  }
}