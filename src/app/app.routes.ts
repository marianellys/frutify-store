import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Shop } from './pages/shop/shop';
import { ShopDetail } from './pages/shop-detail/shop-detail';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { MyAccount } from './pages/my-account/my-account';
import { Wishlist } from './pages/wishlist/wishlist';
import { Gallery } from './pages/gallery/gallery';
import { ContactUs } from './pages/contact-us/contact-us';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'shop', component: Shop },
    { path: 'shop-detail', component: ShopDetail },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: 'my-account', component: MyAccount },
    { path: 'wishlist', component: Wishlist },
    { path: 'gallery', component: Gallery },
    { path: 'contact-us', component: ContactUs }
];
