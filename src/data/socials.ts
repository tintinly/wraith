export interface Social {
  title: string
  href: string
  icon: string
  color?: string
}

export const socials: Social[] = [
  { title: 'GitHub', href: 'https://github.com/tintinly', icon: 'icon-[fa7-brands--github]' },
  { title: 'Bilibili', href: 'https://space.bilibili.com/406137704', icon: 'icon-[fa7-brands--bilibili]', color: '#FB7299' },
  { title: 'Twitter', href: 'https://twitter.com/TintinMrLiu', icon: 'icon-[fa7-brands--x-twitter]' },
  { title: 'YouTube', href: 'https://www.youtube.com/@丁丁-i2b', icon: 'icon-[fa7-brands--youtube]', color: '#FF0033' },
  { title: 'Email', href: 'mailto:821294434@qq.com', icon: 'icon-[fa7-solid--envelope]', color: '#2caafc' },
]
