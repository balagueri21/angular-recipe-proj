import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed: boolean;

    isAuthenticated = false;

    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}
    
    ngOnInit() {
        this.userSub = this.store.select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                this.isAuthenticated = !!user;        
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }
    
    onLogout() {
        this.authService.logout();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}