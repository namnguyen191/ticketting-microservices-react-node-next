import { Publisher, Subjects, TicketCreatedEvent } from '@nnticketting/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject =  Subjects.TicketCreated;
  
}