import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
items: any;



    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home'
            },
            {
                label: 'About',
                icon: 'pi pi-star',
                routerLink:  ['/about'] 
            },
            {
                label: 'Products',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Core',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                        routerLink: '/products/core'
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                        routerLink: '/products/blocks'
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                        routerLink: '/products/uikit'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        items: [
                            {
                                label: 'Apollo',
                                icon: 'pi pi-palette',
                                badge: '2',
                                routerLink: '/products/templates/apollo'
                            },
                            {
                                label: 'Ultima',
                                icon: 'pi pi-palette',
                                badge: '3',
                                routerLink: '/products/templates/ultima'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                badge: '3',
                routerLink: '/contact'
            }
        ];
    }
    

}
