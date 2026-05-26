import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idea } from '../components/ideas-manager/idea.model';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  // התאמנו את הפורט ל-5017 לפי השרת שרץ אצלך ברקע
  private apiUrl = 'http://localhost:5017/api/ideas'; 

  constructor(private http: HttpClient) { }

  // 1. getAll
  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(this.apiUrl);
  }

  // 2. getById
  getIdeaById(id: string): Observable<Idea> {
    return this.http.get<Idea>(`${this.apiUrl}/${id}`);
  }

  // 3. insert
  addIdea(idea: Idea): Observable<Idea> {
    return this.http.post<Idea>(this.apiUrl, idea);
  }

  // 4. update
  updateIdea(id: string, idea: Idea): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, idea);
  }

  // 5. delete
  deleteIdea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}