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
  setDescription(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslateService?: TranslateService
  ) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { description } = lastChild.data;
    const translate = lazyTranslateService || this.translateService;
    if (description) {
      translate
        .get(description)
        .pipe(filter(translatedTitle => translatedTitle !== description))
        .subscribe(translatedTitle =>
          this.meta.addTag({ name: 'description', content: translatedTitle })
        );
    } else {
      this.meta.addTag({
        name: 'description',
        content:
          'Book accommodation among the more than 2000 offers of Casas Particulares in Cuba. The best way to know Cuba is living it.'
      });
    }
  }
  setMetaTags(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslateService?: TranslateService
  ) {
    this.setTitle(snapshot);
    this.setDescription(snapshot);
    this.meta.addTags([
      { name: 'robots', content: 'INDEX, FOLLOW' },

      { name: 'author', content: 'Vhagar' },
      {
        name: 'keywords',
        content: 'Booking,Casa,Particular,Accommodation,Room,Apartment'
      },
      { name: 'date', content: '2018-06-02', scheme: 'YYYY-MM-DD' },
      { httpEquiv: 'Content-Type', content: 'text/html' },
      { property: 'og:title', content: 'RD Tec' },
      { property: 'og:type', content: 'Developers' },
      { charset: 'UTF-8' }
    ]);
  }

  generateTags(config) {
    // default values
    config = {
      title: 'Angular <3 Linkbots',
      description: 'My SEO friendly Angular Component',
      image: 'https://angularfirebase.com/images/logo.png',
      slug: '',
      ...config
    };

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description
    });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'AngularFirebase'
    });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description
    });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://instafire-app.firebaseapp.com/${config.slug}`
    });
  }
}
