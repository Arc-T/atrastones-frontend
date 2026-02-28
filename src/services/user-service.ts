import ApiClient from "@/lib/api-client";
import { api } from "@/types/endpoints";
import type { User } from "@/types/user";

export class UserService {

  static async validateUserFromSession() {
    return ApiClient
      .for<boolean>(api.authentication.validate)
      .post();
  }

  static async authenticate(user: Partial<User>) {
    return ApiClient
      .for<boolean>(api.authentication.login)
      .onSuccess("ورود موفق")
      .post(user);
  }

}
