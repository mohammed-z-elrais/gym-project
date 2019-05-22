import {DefaultCrudRepository} from '@loopback/repository';
import {Clients} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';
const jwt = require('jsonwebtoken');

interface User {
  username:string;
  _id:string;
  iat:number;
}


export class ClientsRepository extends DefaultCrudRepository<
  Clients,
  typeof Clients.prototype._id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Clients, dataSource);
  }



  
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  countDays(a:string, b:number) :number {
    if(a==="Day") {
      return b 
    }else if(a==="Month") {
      return (b * 30) 
    }else if(a==="Year") {
      return (b * 360) 
    }else{
      return 0
    }


  }
  verify(token:string) :User{
    const user:User = jwt.verify(token, 'TheVerySecurePrivateKey');
    return user;
  }


}
