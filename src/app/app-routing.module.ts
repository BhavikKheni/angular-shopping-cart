import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product.component';
import { CartComponent } from './components/cart.component';

const routes: Routes = [{ path: '', component: ProductComponent },
{ path: 'products', component: ProductComponent },
{ path: 'cart', component: CartComponent },
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
