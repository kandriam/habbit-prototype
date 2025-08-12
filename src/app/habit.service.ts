import { Injectable } from '@angular/core';
import { HabitInfo } from './habit';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  url = 'http://localhost:3000/habits';

  async getAllHabits(): Promise<HabitInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
    }
  
  async getHabitsById(id: number): Promise<HabitInfo | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};  }

  editHabit(id:number, name: string, timesperinstance: number, frequency: string, description: string, tags: string[]): void {
    console.log(
      `Editing habit: ${id}, ${name}, ${timesperinstance}, ${frequency}, ${description}, ${tags.join(",")}`
    );

    fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      id,
      name,
      timesperinstance,
      frequency,
      description,
      tags
      })
    });
    
  }

  createHabit(name: string, timesperinstance: number, frequency: string, description: string, tags: string): void {
    console.log(
      `Creating habit: ${name}, ${timesperinstance}, ${frequency}, ${description}, ${tags}`
    )
  }
}
