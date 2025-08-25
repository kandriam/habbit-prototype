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

  editHabit(id:number, name: string, timesdone:number, timesperinstance: number, frequency: string, description: string, tags: string[], calendar: string[]): void {
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
      timesdone,
      timesperinstance,
      frequency,
      description: description.split('\n'), // Multiple lines
      tags,
      calendar
      })
    });
  }

  updateHabitCalendar(id:number, name: string, timesdone:number, timesperinstance: number, frequency: string, description: string[] | undefined, tags: string[], calendar: string[]): void {
  // updateHabitCalendar(id:number, name: string, calendar:Map<string,boolean>){
    console.log(
      "Calendar update:", id, calendar
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
      timesdone,
      timesperinstance,
      frequency,
      description,
      tags,
      calendar
      })
    });
  }

  updateProgress(id:number, name: string, timesdone:number, timesperinstance: number, frequency: string, description: string[] | undefined, tags: string[], calendar: string[]): void {
    console.log(
      "Progress update:", id, timesdone
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
      timesdone,
      timesperinstance,
      frequency,
      description,
      tags,
      calendar
      })
    });
  }

  async createHabit(name: string, timesperinstance: number | string, frequency: string, description: string, tags: string): Promise<void> {
    console.log(
      `Creating habit: ${name}, ${timesperinstance}, ${frequency}, ${description}, ${tags}`
    );

    this.getAllHabits().then(habits => {
      console.log(habits.length);
      // determine next id
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
        timesdone:0,
        timesperinstance,
        frequency,
        // description,
        description: description.split('\n'), // Multiple lines
        tags: tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0),
        calendar:{}
      })
      });
      window.location.reload(); // YOU are the problem
    });
  }

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
