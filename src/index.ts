/*!
 * wiki-app <https://github.com/nodeship/wiki-app>
 *
 * Copyright (c) Nodeship
 * Licensed under the MIT License.
 */

import { ArticleService } from "./article.service";
import { WikiApp} from './wikiapp';

const articleService = new ArticleService();

export const wikiApp = new WikiApp(articleService);

wikiApp.start();

