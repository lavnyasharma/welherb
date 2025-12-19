import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ApiService } from "./api.service";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private savedProfilesSubject = new BehaviorSubject<UserProfile[]>([]);
  savedProfiles$ = this.savedProfilesSubject.asObservable();

  private selectedProfileSubject = new BehaviorSubject<UserProfile | null>(
    null
  );
  selectedProfile$ = this.selectedProfileSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadProfiles();
  }

  loadProfiles() {
    this.apiService.getUserProfile().subscribe({
      next: (res: any) => {
        if (res.profiles && Array.isArray(res.profiles)) {
          const profiles: UserProfile[] = res.profiles.map((p: any) => ({
            id: p._id || p.id,
            name: p.name,
            email: p.email,
            // Generate a random avatar using pravatar.cc with a random image index (1-70) if not present
            avatar:
              p.avatar ||
              `https://i.pravatar.cc/100?img=${
                Math.floor(Math.random() * 70) + 1
              }`,
          }));

          this.setProfiles(profiles);
        }
      },
      error: (err) => {
        console.error("Failed to load profiles", err);
        // Optionally try to load from local storage or keep empty
        this.savedProfilesSubject.next([]);
      },
    });
  }

  fetchMainProfile() {
    this.apiService.getUserProfile().subscribe({
      next: (res: any) => {
        const mainProfile: UserProfile = {
          id: res._id || res.id,
          name: res.fullName,
          email: res.email,
        };
        this.switchProfile(mainProfile);
      },
      error: (err) => console.error("Failed to load main profile", err),
    });
  }

  switchProfile(profile: UserProfile) {
    this.selectedProfileSubject.next(profile);
  }

  setProfiles(profiles: UserProfile[]) {
    this.savedProfilesSubject.next(profiles);
    // Ensure selected profile is still valid or select first
    const currentSelected = this.selectedProfileSubject.value;
    if (
      !currentSelected ||
      !profiles.find((p) => p.id === currentSelected.id)
    ) {
      if (profiles.length > 0) {
        this.switchProfile(profiles[0]);
      } else {
        this.selectedProfileSubject.next(null);
      }
    }
  }

  addProfile(profile: UserProfile) {
    const current = this.savedProfilesSubject.value;
    this.savedProfilesSubject.next([...current, profile]);
  }

  deleteProfile(id: string) {
    const current = this.savedProfilesSubject.value;
    const updated = current.filter((p) => p.id !== id);
    this.savedProfilesSubject.next(updated);

    if (this.selectedProfileSubject.value?.id === id) {
      this.selectedProfileSubject.next(updated.length > 0 ? updated[0] : null);
    }
  }
}
