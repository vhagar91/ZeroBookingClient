import { Title, Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { environment as env } from '@env/environment';

@Injectable()
export class SeoService {
  constructor(
    private translateService: TranslateService,
    private title: Title,
    private meta: Meta
  ) {}

  setTitle(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslateService?: TranslateService
  ) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    const translate = lazyTranslateService || this.translateService;
    if (title) {
      translate
        .get(title)
        .pipe(filter(translatedTitle => translatedTitle !== title))
        .subscribe(translatedTitle =>
          this.title.setTitle(`${translatedTitle} - ${env.appName}`)
        );
    } else {
      this.title.setTitle(env.appName);
    }
  }
  setMetaTags(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslateService?: TranslateService
  ) {
    this.setTitle(snapshot);
    this.meta.addTags([
      { name: 'robots', content: 'INDEX, FOLLOW' },
      {
        name: 'description',
        content:
          'Book accommodation among the more than 2000 offers of Casas Particulares in Cuba. The best way to know Cuba is living it.'
      },
      { name: 'author', content: 'ABCD' },
      { name: 'keywords', content: 'TypeScript, Angular' },
      { name: 'date', content: '2018-06-02', scheme: 'YYYY-MM-DD' },
      { httpEquiv: 'Content-Type', content: 'text/html' },
      { property: 'og:title', content: 'My Text' },
      { property: 'og:type', content: 'website' },
      { charset: 'UTF-8' }
    ]);
  }
}
