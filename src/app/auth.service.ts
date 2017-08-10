import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs"; 


@Injectable()
export class AuthService {
	constructor(private http:Http){

	}

	signup(username: string, email: string, password: string){
		return this.http.post('http://penktas.app/api/user',
			{name: username, email: email, password: password},
			{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
	}

	signin(email: string, password: string){
		return this.http.post('http://penktas.app/api/user/signin',
			{email: email, password: password},
			{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
			.map(
				(response: Response) => {
					const token = response.json().token;
					const base64Url = token.split('.')[1];
					const base64 = base64Url.replace('-', '+').replace('_', '/');
					return {token: token, decoded: JSON.parse(window.atob(base64))};
				}
			)
			.do(
				tokenData => {
					localStorage.setItem('token', tokenData.token);
				}
			);
	}

	getToken() {
		return localStorage.getItem('token');
	}

}