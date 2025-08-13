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

    let strid = id.toString();
    fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      id: strid,
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
    );

    // Fetch all habits to determine the next id
    this.getAllHabits().then(habits => {
      console.log(habits.length);
      const maxId = habits.length > 0 ? Math.max(...habits.map(h => h.id)) : 0;
      const newId = String(maxId + 1);
      fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: newId,
        name,
        timesperinstance,
        frequency,
        description,
        tags: tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0),
        // tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())
      })
      });
    });
    window.location.reload();
  }
  // (this.applyForm.value.tags ?? '')
        // .split(',')
        // .map((tag: string) => tag.trim())
        // .filter((tag: string) => tag.length > 0),

  deleteHabit(id: number) {
    fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
      }
    });
    console.log(`habit: ${id} deleted`);

  }
}
