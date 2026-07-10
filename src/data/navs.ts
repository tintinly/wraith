export interface Nav {
  name: string
  href: string
  icon: string
  external: boolean
  translate: string
}

export const navs: Nav[] = [
  { name: 'Portal', href: 'https://tintinly.top', icon: 'icon-[fa7-solid--home]', external: false, translate: 'hover:-translate-y-1' },
  { name: 'Blog', href: 'https://blog.tintinly.top', icon: 'icon-[fa7-solid--blog]', external: true, translate: 'hover:-translate-y-0.5' },
  { name: 'Notes', href: 'https://notes.tintinly.top', icon: 'icon-[fa7-solid--book]', external: true, translate: 'hover:-translate-y-0.5' },
]
