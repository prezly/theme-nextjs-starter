# Prezly Starter Theme

Prezly Starter Theme for your newsroom or blog based on Next.js 12+ framework:

- Made with [TypeScript], [Prezly SDK] and [Prezly Content React Renderer].
- Data-fetching is handled by [Prezly Theme Kit] and [Prezly SDK].
- Multi-language is powered by [React Intl] and [Prezly Themes Translations].
- Code-style is ensured by [ESLint] and [Prettier].
- Search is powered by [Algolia]

As we do not want to tell you how to style your project (CSS vs Sass vs CSS-in-JS vs styled components) and sure as hell do not want to force you on our preferred CSS framework **this theme does not have any styling loaded**. It is intended to be used as a boilerplate to start a new theme from.

## Features

### Content/Newsroom features

* Homepage with list of stories
* Story page including images, galleries, cards and video using our [Prezly Content React Renderer]
* Category page with list of stories based on the selected category
* Galleries page with list of galleries
* Gallery page using our [Prezly Content React Renderer]
* i18n support for 40+ languages
* sitemap.xml, SEO metadata and Open Graph Tags
* Maximize lighthouse score

### Developer experience:

* [Next.js] with SSR, SSG or ISR option
* Test/Seed data in 3 categories
* Type checking with [TypeScript]
* Strongly typed content/entities

### Built-in features from Next.js:

* Minify HTML & CSS
* Live reload/Fast refresh
* Code splitting and bundling
* Hybrid: SSR, SSG or ISR
* Image optimization

### Requirements

* Node.js and npm

## Quick Start

### Getting Started

Run the following command on your local environment

```
git clone https://github.com/prezly/theme-nextjs-starter
cd theme-nextjs-starter
npm i
```

Set up your .env.local file by copying .env.example and filling in Prezly API key and newsroom UUID.

```
cp .env.example .env.local
```

After that you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

### Deploy your own

Deploy the example using [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com/):

| Vercel  | Netlify |
| ------------- | ------------- |
| [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/prezly/theme-nextjs-starter)  | [![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/prezly/theme-nextjs-starter)  |

## Documentation

### Routes

List of routes we automatically generate:

* **/** : Homepage listing stories
* **/[slug]** : Story page with slug provided by [Prezly SDK]
* **/s/[uuid]**: Story preview page used for previewing non-published stories
* **/category/[slug]** : Category page listing stories in respective category
* **/media**: Galleries page with infinite loading
* **/media/album/[uuid]**: Gallery page
* **/search**: Search page using realtime search with [Algolia]
* **/sitemap.xml**: Sitemap

### Testing/Token

To make development and testing easier we have created a few sample newsrooms:

* **The Good Newsroom** [(preview on vercel)](https://theme-nextjs-starter-the-good-newsroom.vercel.app/): A newsroom filled with good news
* **Cookbook** [(preview on vercel)](https://theme-nextjs-starter-cookbook.vercel.app/): Recipes shared by the Prezly team
* **Anonymous Photographer** [(preview on vercel)](https://theme-nextjs-starter-photography.vercel.app/):  Pictures from a photographer. Combination of albums and imagery

A list of tokens/newsroom uuids that can be used to kickstart the theme.

| Name  | API Token  | Newsroom UUID |
|---|---|---|
| Good Newsroom  | `HKcab_nEbab_a7b2fe3a3465d3729772fa5381800ab5a0c30d8d`  | `578e78e9-9a5b-44ad-bda2-5214895ee036` |
| Cookbook  | `TKcab_nEbab_28432b75d3a85a826e51cd0b502a3d76acf98d19`  | `9d90b2c1-aed9-4415-a9fb-82dd3a2a1b52` |
| Anonymous Photographer | `SKcab_nEbab_0b63a6dd0b09286cc99fab93e6e80bfd9aecfbb5`  | `ce8299f6-a293-41df-8ffc-1c064d4401bc` |

### Accessing common data

The entire application is wrapped with `NewsroomContextProvider` and `IntlProvider` from [Next.js Theme Kit]
making it easy to access common objects like `newsroom`, `companyInformation`, `categories`, `languages`, `locale`
anywhere in the component tree.

For more information about these hooks please visit our [Next.js Theme Kit].

### Hooks

#### `useInfiniteLoading()`

Generic hook for continuous loading of any dataset keeping track of current page internally. An example implementation
for continuous loading of galleries can be found in the [`Galleries`](./tree/main/modules/Galleries/lib/useInfiniteGalleriesLoading.ts) module.

### Modules

#### `Layout`

This module takes care of rendering header and footer components as well as the subscribe form.
It also uses `PageSeo` component to render all the necessary meta tags with optional props to override
certain meta tag content like title (`og:title`), description (`og:description`) and image (`og:image`, `twitter:image`).

#### `PaginatedStories`

Classic query-parameter-based pagination, used in the starter theme by default in [`Stories`](./tree/main/modules/Stories) and [`Category`](./tree/main/modules/Category) modules.

#### `InfiniteStories`

Infinite loading of data with `Load More` button. Not used in the starter theme by default but an example usage can be found
in both [`Stories`](./tree/main/modules/Stories) and [`Category`](./tree/main/modules/Category) modules.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

### License

Prezly Starter Theme is [MIT licensed](LICENSE).

---

Made with ♥ by [Prezly]

[Prezly]: https://www.prezly.com/developers
[Prezly SDK]: https://github.com/prezly/javascript-sdk
[Prezly Theme Kit]: https://github.com/prezly/theme-kit-nextjs
[Next.js]: https://nextjs.org
[TypeScript]: https://www.typescriptlang.org
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[React Intl]: https://www.npmjs.com/package/react-intl
[Prezly Content React Renderer]: https://www.npmjs.com/package/@prezly/content-renderer-react-js
[Prezly Themes Translations]: https://www.npmjs.com/package/@prezly/themes-intl-messages
[Algolia]: https://algolia.com
