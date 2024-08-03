interface MenuItem {
  href: string
  title: string
}

type MenuItems = MenuItem[]

export const MENU_ITEMS: MenuItems = [
  { href: '/', title: 'Inicio' },
  { href: '/collection', title: 'Colecciones' },
  { href: '/contact', title: 'Contacto' },
]
