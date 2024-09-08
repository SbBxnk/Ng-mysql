import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the user is authenticated
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']); // Redirect to login if not authenticated
        return false;
      }
    }
    // Handle case where `localStorage` is not available
    return false;
  }
}
