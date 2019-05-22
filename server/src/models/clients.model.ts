import {Entity, model, property} from '@loopback/repository';


@model()
export class Attendance extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  attendBy: string;

  @property({
    type: 'string',
    required: true,
  })
  usreId: string;

  @property({
    type: 'string',
    required: true,
  })
  action: string;

  @property({
    type: 'Date',
    required: true,
  })
  time: Date;
}
// name:user.username,
// id:user._id,
// time: new Date()


@model()
export class Clients extends Entity {
  @property({
    type: 'string',
    id: true,
    
  })
  _id?: string;

  @property({
    type: 'object',
   
  })
  addedBy: object;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  eMail: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNum: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    // required: true,
    default: 'Ok',
  })
  supStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  numberOfDays: string;

  @property({
    type: 'number',
    required: true,
  })
  daysLeft: number;

  @property({
    type: 'boolean',
    // required: true,
    default: false,
  })
  purchasingStatus: boolean;

  @property({
    type: 'boolean',
    // required: true,
    default: false,
  })
  attendance: boolean;

  @property({
    type: 'string',
    // required: true,
    default: 'Active',
  })
  clientStatus: string;

  // need entrface  ***tooo doooo***
  @property({
    type: 'object',
    required: true,
  })
  subscription: object;

  @property({
    type: 'string',
    required: true,
  })
  money: string;

  @property({
    type: 'array',
    itemType: Attendance,
    // required: true,
  })
  attendanceHistory: Attendance[];

  @property({
    type: 'array',
    
    itemType: 'object',
  })
  storeHistory: object[];

  constructor(data?: Partial<Clients>) {
    super(data);
  }
}

// interface Attendance {
//   attendBy: string;
//   time: Date;
// }