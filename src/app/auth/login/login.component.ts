import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  mobileSignIn: string = "";
  mobileSignUp: string = "";

  otpValue: string = "";
  isOtpSent: boolean = false;
  selectedMobile: string | null = null;
  isSignupMode: boolean = false;
  otpFlowType: "signin" | "signup" = "signin";
  isSendingOtp: boolean = false;
  isVerifyingOtp: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get otp(): string {
    return this.otpValue;
  }

  switchToSignup() {
    this.isSignupMode = true;
  }

  switchToSignin() {
    this.isSignupMode = false;
  }

  onGetOtp(type: "signin" | "signup") {
    let mobile = type === "signin" ? this.mobileSignIn : this.mobileSignUp;

    if (!mobile || mobile.trim().length < 10) {
      this.toastr.error("Please enter a valid mobile number.", "Error");
      return;
    }

    // Clean spaces & non-digits
    mobile = mobile.trim().replace(/\D/g, "");

    // Add 91 ONLY if not already present
    if (!mobile.startsWith("91")) {
      mobile = "91" + mobile;
    }

    this.isSendingOtp = true;

    this.authService.sendOtp(mobile).subscribe(
      () => {
        this.selectedMobile = mobile;
        this.isOtpSent = true;
        this.otpFlowType = type;
        this.otpValue = ""; // clear old OTP
        this.toastr.success("OTP sent successfully.", "Success");
        this.isSendingOtp = false;
      },
      () => {
        this.toastr.error("Failed to send OTP. Please try again.", "Error");
        this.isSendingOtp = false;
      }
    );
  }

  onOtpInput(rawValue: string) {
    // Single OTP string, max 4 digits
    let value = (rawValue || "").replace(/\D/g, "").slice(0, 4);
    this.otpValue = value;
  }

  onVerifyOtp() {
    if (!this.selectedMobile) {
      this.toastr.error("Please request an OTP first.", "Error");
      return;
    }

    if (!this.otpValue || this.otpValue.length < 4) {
      this.toastr.error("Please enter the full OTP.", "Error");
      return;
    }

    const otp = this.otp; // 4-digit OTP

    this.isVerifyingOtp = true;
    this.authService.verifyOtp(this.selectedMobile, otp).subscribe(
      () => {
        this.toastr.success("Login successful!", "Success");
        this.isVerifyingOtp = false;
        this.router.navigate(["/home"]);
      },
      () => {
        this.toastr.error("Invalid OTP. Please try again.", "Error");
        this.isVerifyingOtp = false;
      }
    );
  }
}
