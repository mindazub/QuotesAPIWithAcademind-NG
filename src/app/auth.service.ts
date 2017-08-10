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
			{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
	}

}