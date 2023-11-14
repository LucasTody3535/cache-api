import { ErrorSubjects } from 'src/enums/error/subjects/error-subjects';
import { ErrorMessages } from 'src/enums/error/messages/error-messages';
import { ErrorSugestions } from 'src/enums/error/sugestions/error-sugestions';

export class ErrorInfo {
  private readonly subject: ErrorSubjects;
  private readonly message: ErrorMessages;
  private readonly sugestions: Array<ErrorSugestions>;
  private readonly endpoint: string;

  constructor(
    subject: ErrorSubjects,
    message: ErrorMessages,
    sugestions: Array<ErrorSugestions>,
    endpoint: string,
  ) {
    this.subject = subject;
    this.message = message;
    this.sugestions = sugestions;
    this.endpoint = endpoint;
  }
}
