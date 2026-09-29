import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { ShopDetail } from './pages/shop-detail/shop-detail';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'shop', component: Shop },
    { path: 'shop-detail', component: ShopDetail },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: 'auth/login', component: Login },
    { path: 'auth/register', component: Register },
    { path: '**', redirectTo: '' }
];