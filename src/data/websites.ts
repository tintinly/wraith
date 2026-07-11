export interface Website {
  websiteName: string
  websiteDescription: string
  websiteLink: string
  websiteIcon: string,
}

export const websites: Website[] = [
  {
    websiteName: 'Portal',
    websiteDescription: 'Personal portal homepage.',
    websiteLink: 'https://tintinly.top',
    websiteIcon: 'icon-[twemoji--door]',
  },
  {
    websiteName: 'Blog',
    websiteDescription: 'Personal blog for sharing thoughts and experience.',
    websiteLink: 'https://blog.tintinly.top',
    websiteIcon: 'icon-[twemoji--speech-balloon]',
  },
  {
    websiteName: 'Notes',
    websiteDescription: 'Personal notes website for recording knowledge and learning.',
    websiteLink: 'https://notes.tintinly.top',
    websiteIcon: 'icon-[twemoji--notebook-with-decorative-cover]',
  },
]
