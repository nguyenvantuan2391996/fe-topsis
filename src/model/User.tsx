namespace UserModel {
  export interface User {
    id?: string;
    user_name: string;
    password: string;
    confirm_password?: string;
    phone: string;
    email: string;
    created_at: number;
    access_token: string;
  }
}

export default UserModel;
