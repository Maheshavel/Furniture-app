import { GuardService } from './services/guard.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products-admin', component: AdminComponent, canActivate: [GuardService]},
  {path: 'cart', component: CartComponent, canActivate: [GuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [GuardService]},
  {path: 'orders-admin', component: OrdersAdminComponent, canActivate: [GuardService]},
  {path: 'products', component: ProductsComponent, canActivate: [GuardService]},
  {path: 'signup', component: SingUpComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
