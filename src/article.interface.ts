export interface Namespace {
    id: number;
    text: string;
}

export interface Titles {
    canonical: string;
    normalized: string;
    display: string;
}

export interface Thumbnail {
    source: string;
    width: number;
    height: number;
}

export interface Originalimage {
    source: string;
    width: number;
    height: number;
}

export interface Desktop {
    page: string;
    revisions: string;
    edit: string;
    talk: string;
}

export interface Mobile {
    page: string;
    revisions: string;
    edit: string;
    talk: string;
}

export interface ContentUrls {
    desktop: Desktop;
    mobile: Mobile;
}

export interface ApiUrls {
    summary: string;
    metadata: string;
    references: string;
    media: string;
    edit_html: string;
    talk_page_html: string;
}




export interface Article {
    type: string;
    title: string;
    displaytitle: string;
    namespace: Namespace;
    wikibase_item: string;
    titles: Titles;
    pageid: number;
    thumbnail: Thumbnail;
    originalimage: Originalimage;
    lang: string;
    dir: string;
    revision: string;
    tid: string;
    timestamp: Date;
    description: string;
    content_urls: ContentUrls;
    api_urls: ApiUrls;
    extract: string;
    extract_html: string;
    liked?: boolean;
}
