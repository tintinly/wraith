export interface Project {
  projectName: string
  projectDescription: string
  projectLink: string
  projectIcon: string
}

export const projects: Project[] = [
  {
    projectName: 'Wraith',
    projectDescription: 'A personal website with concise style | 一个风格简洁的个人网站',
    projectLink: 'https://github.com/tintinly/wraith',
    projectIcon: 'icon-[twemoji--open-file-folder]',
  },
  {
    projectName: 'Detection Applet',
    projectDescription: 'UniApp based detection entrusting applet | 基于 uni-app 的检测委托小程序',
    projectLink: 'https://github.com/tintinly/qhjcminiapp',
    projectIcon: 'icon-[twemoji--test-tube]',
  },
  {
    projectName: 'Wattson',
    projectDescription: 'A blog template based on Nuxt | 基于 NuxtJS 的博客模板',
    projectLink: 'https://github.com/tintinly/wattson',
    projectIcon: 'icon-[twemoji--speech-balloon]',
  },
]
