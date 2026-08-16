import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profile`;
  private cache$?: Observable<Profile>;

  get(): Observable<Profile> {
    if (!this.cache$) {
      this.cache$ = this.http.get<Profile>(this.apiUrl).pipe(shareReplay(1));
    }
    return this.cache$;
  }

  update(profile: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(this.apiUrl, profile).pipe(
      tap((updated) => {
        this.cache$ = of(updated).pipe(shareReplay(1));
      })
    );
  }

  uploadFile(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${environment.apiUrl}/upload`, formData);
  }
}
