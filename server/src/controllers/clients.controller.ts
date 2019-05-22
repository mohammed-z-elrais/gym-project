import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  
} from '@loopback/repository';

import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {Clients, Attendance} from '../models';
import {ClientsRepository} from '../repositories';
import {inject} from '@loopback/context';
interface Client {
  firstName: string;
  lastName: string;
  eMail: string;
  address: string;
  phoneNum: string;
  type: string;
  time: string;
  num: number;
  addedBy: string;
  money: string;
}

export class ClientsController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: UserProfile,
    @repository(ClientsRepository)
    public clientsRepository: ClientsRepository,
  ) {}







  @authenticate('BearerStrategy')
  @post('/clients', {
    responses: {
      '200': {
        description: 'Clients model instance',
        content: {'application/json': {schema: {'x-ts-type': Clients}}},
      },
    },
  })
  async create(@requestBody() client: Client): Promise<Clients> {


    let numOfDaysHave =this.clientsRepository.countDays( client.time, client.num )

    if (numOfDaysHave===0) {
      throw new HttpErrors.BadRequest('Time is not defined');
    }
    let user= this.clientsRepository.verify(client.addedBy)
    let endDate = this.clientsRepository.addDays( new Date(), numOfDaysHave + 7 );
    let alertDate = this.clientsRepository.addDays( new Date(), numOfDaysHave - 7 );
    let chanceDate = this.clientsRepository.addDays( new Date(), numOfDaysHave );

    
   let clients={
     addedBy:{
       name:user.username,
       id:user._id,
       time: new Date()
     },
     firstName: client.firstName,
     lastName: client.lastName,
     eMail: client.eMail,
     phoneNum: client.phoneNum,
     address: client.address,
     supStatus:'ok',
     numberOfDays: numOfDaysHave.toString(),
     money: client.money,
     daysLeft: numOfDaysHave ,
     subscription: {startDate: new Date(),
                      endDate: endDate,
                      alertDate: alertDate,
                      chanceDate: chanceDate,
                      type: client.type
                    },
    attendanceHistory:[new Attendance,]     
   };
   if(numOfDaysHave <= 7){
     clients.supStatus='On Alert'
   }
  //  this.clientsRepository.
    return await this.clientsRepository.create(clients);
  }





  // @authenticate('BearerStrategy')
  @get('/clients/count', {
    responses: {
      '200': {
        description: 'Clients model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Clients)) where?: Where,
  ): Promise<Count> {
    return await this.clientsRepository.count(where);
  }




  // @authenticate('BearerStrategy')
  @get('/clients', {
    responses: {
      '200': {
        description: 'Array of Clients model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Clients}},
          },
        },
      },
    },
  })
  async find(@param.query.object('filter', getFilterSchemaFor(Clients)) filter?: Filter,): Promise<Clients[]> {
    // let rgx= / ;
    console.log(filter)
    return await this.clientsRepository.find(filter);
  }




  // @authenticate('BearerStrategy')
  @patch('/clients', {
    responses: {
      '200': {
        description: 'Clients PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() clients: object,
    @param.query.object('where', getWhereSchemaFor(Clients)) where?: Where,
  ): Promise<Count> {
    console.log(clients, where)
    return await this.clientsRepository.updateAll(clients, where);
  }





  // @authenticate('BearerStrategy')
  @get('/clients/{id}', {
    responses: {
      '200': {
        description: 'Clients model instance',
        content: {'application/json': {schema: {'x-ts-type': Clients}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Clients> {
    console.log(id)
    return await this.clientsRepository.findById(id);
  }





  // @authenticate('BearerStrategy')
  @patch('/clients/{id}', {
    responses: {
      '204': {
        description: 'Clients PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() clients: object,
  ): Promise<void> {
    console.log(id,clients)
    // this.clientsRepository.
    await this.clientsRepository.updateById(id, clients);
  }





  // @authenticate('BearerStrategy')
  @put('/clients/{id}', {
    responses: {
      '204': {
        description: 'Clients PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clients: Clients,
  ): Promise<void> {
    await this.clientsRepository.replaceById(id, clients);
  }





  // @authenticate('BearerStrategy')
  @del('/clients/{id}', {
    responses: {
      '204': {
        description: 'Clients DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientsRepository.deleteById(id);
  }

}