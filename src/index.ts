/*!
 * wiki-app <https://github.com/nodeship/wiki-app>
 *
 * Copyright (c) Nodeship
 * Licensed under the MIT License.
 */
import './styles.css';
import { ArticleService } from "./article.service";
import { WikiApp} from './wikiapp';
import { LocalStorageService} from './local-storage.service'

const articleService = new ArticleService();
const localStorageService = new LocalStorageService();

export const wikiApp = new WikiApp(articleService, localStorageService);

wikiApp.start();

