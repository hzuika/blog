const config = {
  gatsby: {
    pathPrefix: '',
    siteUrl: 'https://blog.hzuika.com',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: '',
    title: 'hzuika blog',
    githubUrl: 'https://github.com/hzuika/blog',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction',
      '/frs_reading',
      '/frs_cleanup',
      '/blender_ime',
      '/rust_learning',
      '/gatsby_learning',
      '/snippet',
      '/misc',
      '/setup',
    ],
    collapsedNav: [
      // add trailing slash if enabled above
      '/frs_reading',
      '/frs_cleanup',
      '/blender_ime',
      '/rust_learning',
      '/gatsby_learning',
    ],
    links: [{ text: 'hzuika.com', link: 'https://hzuika.com' }],
    frontline: false,
    ignoreIndex: true,
    title: "hzuika <div class='greenCircle'></div> blog",
  },
  siteMetadata: {
    title: 'blog | hzuika',
    description: "hzuika's blog",
    ogImage: null,
    docsLocation: 'https://github.com/hzuika/blog/tree/master/content',
    favicon:
      'data:image/png;base64,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',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
