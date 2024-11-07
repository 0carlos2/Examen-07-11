import { Routes } from '@angular/router';
import { HomeComponent } from './home/component/home/home.component';
import { ClienteComponent } from './cliente/component/cliente/cliente.component';
import { CarritoComponent } from './carrito/component/carrito/carrito.component';
import { FacturaComponent } from './factura/component/factura/factura.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'cliente',
        component: ClienteComponent,
        title: 'cliente'
    },
    {
        path: 'carrito',
        component: CarritoComponent,
        title: 'carrito'
    },
    {
        path:'factura',
        component: FacturaComponent,
        title: 'factura'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }
];
