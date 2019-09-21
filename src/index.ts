/*!
 * wiki-app <https://github.com/nodeship/wiki-app>
 *
 * Copyright (c) Nodeship
 * Licensed under the MIT License.
 */
import './styles.css';
import { ArticleService } from "./article.service";
import { WikiApp} from './wikiapp';
import { StorageService} from './storage.service'

const articleService = new ArticleService();
const storageService = new StorageService();

export const wikiApp = new WikiApp(articleService, storageService);

wikiApp.start();

