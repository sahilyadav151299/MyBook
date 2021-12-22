import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';
import { PORT_NO } from '../util/config';
import { userToken } from '../util/config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(userData: User) {
    return this.http.post<any>(
      `http://localhost:${PORT_NO}/auth/register`,
      userData
    );
  }

  authenticateUser(credentials: any) {
    console.log(credentials);
    const body = { email: credentials.email, password: credentials.password };
    return this.http.post<any>(`http://localhost:${PORT_NO}/auth/login`, body);
  }

  changeAddress(newAddress: any) {
    const data = {
      newAddress: newAddress,
      customerId: userToken.userId,
    };

    return this.http.post(`http://localhost:${PORT_NO}/user/address`, data);
  }

  getAddress() {
    const params = new HttpParams().set('customerId', userToken.userId);

    return this.http.get(`http://localhost:${PORT_NO}/user/address`, {
      params: params,
    });
  }

  getUserById() {
    const params = new HttpParams().set('customerId', userToken.userId);

    return this.http.get(`http://localhost:${PORT_NO}/user/profile`, {
      params: params,
    });
  }

  onSave(data: User) {
    const body = {
      data: data,
      id: userToken.userId,
    };

    return this.http.put(
      `http://localhost:${PORT_NO}/user/profile-update`,
      body
    );
  }

  changePassword(data: User) {
    const body = {
      data: data,
      id: userToken.userId,
    };

    return this.http.put(
      `http://localhost:${PORT_NO}/auth/changepassword`,
      body
    );
  }
}
