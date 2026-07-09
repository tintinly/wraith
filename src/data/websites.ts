export interface Website {
  websiteName: string
  websiteDescription: string
  websiteLink: string
  websiteIcon: string
}

export const websites: Website[] = [
  {
    websiteName: 'Website1',
    websiteDescription: 'Some description.',
    websiteLink: 'https://www.website.com',
    websiteIcon: 'icon-[twemoji--globe-with-meridians]',
  },
  {
    websiteName: 'Website2',
    websiteDescription: 'Some description Some description Some description Some description.',
    websiteLink: 'https://www.website2.com',
    websiteIcon: 'icon-[twemoji--globe-with-meridians]',
  },
]