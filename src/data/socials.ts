export interface Social {
  title: string
  href: string
  icon: string
  hoverClass: string
  translateClass: string
  activeClass: string
}

export const socials: Social[] = [
  { title: 'GitHub', href: 'https://github.com/tintinly', icon: 'icon-[fa7-brands--github]', hoverClass: 'hover:text-foreground', translateClass: 'hover:-translate-y-1', activeClass: 'active:text-foreground' },
  { title: 'Bilibili', href: 'https://space.bilibili.com/406137704', icon: 'icon-[fa7-brands--bilibili]', hoverClass: 'hover:text-[#FB7299]', translateClass: 'hover:-translate-y-0.5', activeClass: 'active:text-[#FB7299]' },
  { title: 'Twitter', href: 'https://twitter.com/TintinMrLiu', icon: 'icon-[fa7-brands--x-twitter]', hoverClass: 'hover:text-foreground', translateClass: 'hover:-translate-y-1', activeClass: 'active:text-foreground' },
  { title: 'YouTube', href: 'https://www.youtube.com/@丁丁-i2b', icon: 'icon-[fa7-brands--youtube]', hoverClass: 'hover:text-[#FF0033]', translateClass: 'hover:-translate-y-1', activeClass: 'active:text-[#FF0033]' },
  { title: 'Email', href: 'mailto:821294434@qq.com', icon: 'icon-[fa7-solid--envelope]', hoverClass: 'hover:text-[#2caafc]', translateClass: 'hover:-translate-y-1', activeClass: 'active:text-[#2caafc]' },
]
