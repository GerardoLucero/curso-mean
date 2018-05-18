import {ModuleWithProviders} from '@amgular/core';
import {Routes, RouterModule} from '@amgular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';

const appRouters: Routes = [
{path: '', component: UserEditComponent },
{path: 'mis-datos', component: UserEditComponent }, 
{path: '**', component: UserEditComponent }];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);