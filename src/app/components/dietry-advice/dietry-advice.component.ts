import { Component, Input, OnInit } from "@angular/core";
import { ProfileService, UserProfile } from "../../../services/profile.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-dietry-advice",
  templateUrl: "./dietry-advice.component.html",
  styleUrls: ["./dietry-advice.component.css"],
})
export class DietryAdviceComponent implements OnInit {
  @Input() dietaryAdvice: string[] = [];
  @Input() helpsHow: string[] = [];
  @Input() helpsWho: string[] = [];

  savedProfiles$: Observable<UserProfile[]>;
  selectedProfile$: Observable<UserProfile | null>;

  isDropdownOpen = false;

  constructor(private profileService: ProfileService) {
    this.savedProfiles$ = this.profileService.savedProfiles$;
    this.selectedProfile$ = this.profileService.selectedProfile$;
  }

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectProfile(profile: UserProfile): void {
    this.profileService.switchProfile(profile);
    this.isDropdownOpen = false;
  }
}
