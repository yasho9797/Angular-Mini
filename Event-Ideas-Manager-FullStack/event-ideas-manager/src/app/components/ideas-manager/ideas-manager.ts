import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Idea } from './idea.model';
import { IdeaService } from '../../services/idea'; // מייבאים את הסרוויס החדש

@Component({
  selector: 'app-ideas-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ideas-manager.html',
  styleUrls: ['./ideas-manager.css']
})
export class IdeasManagerComponent implements OnInit {
  activityTypes: string[] = ['סדנה', 'הרצאה', 'משחק קבוצתי', 'הפעלה אקטיבית'];
  targetAudiences: string[] = ['ילדים', 'נוער', 'מבוגרים', 'משפחות'];

  ideas: Idea[] = []; // יתמלא ישירות מהשרת
  currentIdea: Partial<Idea> = this.getEmptyIdea();
  isEditing: boolean = false;
  errorMessage: string = '';

  // הזרקת ה-Service בבנאי
  constructor(private ideaService: IdeaService) {}

  // פונקציה שרצה אוטומטית כשהמסך עולה
  ngOnInit() {
    this.loadIdeas();
  }

  // 1. getAll - טעינת רשימת הרעיונות מהשרת
  loadIdeas() {
    this.ideaService.getIdeas().subscribe({
      next: (data) => this.ideas = data,
      error: (err) => this.errorMessage = 'שגיאה בקבלת הנתונים מהשרת.'
    });
  }

  getEmptyIdea(): Partial<Idea> {
    return { id: '', name: '', activityType: '', targetAudience: '', duration: undefined, status: 'ממתין לאישור' };
  }

  saveIdea() {
    this.errorMessage = '';

    // ולידציות בסיסיות (כמו בתרגיל הקודם)
    if (!this.currentIdea.name || this.currentIdea.name.length < 3) {
      this.errorMessage = 'שם הרעיון חייב להכיל לפחות 3 תווים.';
      return;
    }
    if (!this.currentIdea.activityType || !this.currentIdea.targetAudience) {
      this.errorMessage = 'חובה לבחור סוג פעילות וקהל יעד.';
      return;
    }
    if (!this.currentIdea.duration || this.currentIdea.duration <= 0) {
      this.errorMessage = 'משך הזמן חייב להיות מספר חיובי.';
      return;
    }

    if (this.isEditing) {
      // 4. update - עדכון הרעיון בשרת
      this.ideaService.updateIdea(this.currentIdea.id!, this.currentIdea as Idea).subscribe({
        next: () => {
          this.loadIdeas(); // רענון הטבלה מהשרת
          this.isEditing = false;
          this.currentIdea = this.getEmptyIdea();
        },
        error: (err) => this.errorMessage = 'עדכון הרעיון נכשל בשרת.'
      });
    } else {
      // בדיקת כפילויות מקומית זריזה לפני השליחה
      if (this.ideas.some(i => i.id === this.currentIdea.id)) {
        this.errorMessage = 'מזהה הרעיון (ID) כבר קיים במערכת.';
        return;
      }
      if (this.ideas.some(i => i.name.toLowerCase() === this.currentIdea.name?.toLowerCase())) {
        this.errorMessage = 'שם הרעיון כבר קיים במערכת.';
        return;
      }

      // 3. insert - הוספת רעיון חדש לשרת
      this.ideaService.addIdea(this.currentIdea as Idea).subscribe({
        next: () => {
          this.loadIdeas(); // רענון מהשרת
          this.currentIdea = this.getEmptyIdea();
        },
        error: (err) => this.errorMessage = 'הוספת הרעיון נכשלה בשרת.'
      });
    }
  }

  editIdea(idea: Idea) {
    this.isEditing = true;
    this.currentIdea = { ...idea };
  }

  // 5. delete - מחיקת רעיון מהשרת
  deleteIdea(id: string) {
    this.ideaService.deleteIdea(id).subscribe({
      next: () => this.loadIdeas(), // רענון מהשרת
      error: (err) => this.errorMessage = 'מחיקת הרעיון נכשלה בשרת.'
    });
  }

  // עדכון סטטוס מנהל דרך השרת
  changeStatus(idea: Idea, newStatus: 'ממתין לאישור' | 'מאושר' | 'נדחה') {
    const updatedIdea = { ...idea, status: newStatus };
    this.ideaService.updateIdea(idea.id, updatedIdea).subscribe({
      next: () => this.loadIdeas(),
      error: (err) => this.errorMessage = 'עדכון הסטטוס נכשל בשרת.'
    });
  }
}