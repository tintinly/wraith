export interface Nav {
  name: string
  href: string
  icon: string
  external: boolean
}

export const navs: Nav[] = [
  { name: 'Portal', href: 'https://tintinly.top', icon: 'icon-[fa7-solid--home]', external: false },
  { name: 'Blog', href: 'https://blog.tintinly.top', icon: 'icon-[fa7-solid--blog]', external: true },
  { name: 'Notes', href: 'https://notes.tintinly.top', icon: 'icon-[fa7-solid--book]', external: true },
]
