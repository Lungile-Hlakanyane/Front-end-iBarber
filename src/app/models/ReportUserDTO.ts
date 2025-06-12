export interface ReportUserDTO {
  id?:any;
  reportedUserId: number;
  reporterUserId: number;
  reason: string;
  reportedUserName?: string; 
  reporterUserName?: string;
  status?:string;
  timestamp?:string;
}
