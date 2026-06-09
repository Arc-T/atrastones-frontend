import ApiClient from "@/lib/api-client";
import { api } from "@/types/endpoints";
import type { User, UserLogin } from "@/types/user";

export class UserService {
  static async validateUserFromSession() {
    return ApiClient.for<User>(api.authentication.validate)
      .onError("validation_failed")
      .post();
  }

  static async logout() {
    return ApiClient.for(api.authentication.logout)
      .onSuccess("logout_success")
      .post();
  }

  static async authenticate(user: Partial<UserLogin>) {
    return ApiClient.for<boolean>(api.authentication.login)
      .onSuccess("login_success")
      .post(user);
  }
}
