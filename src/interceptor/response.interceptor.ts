import {CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiResponseServ} from './api.response.dto';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponseServ<T>> {
   intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseServ<T>> {
      return next.handle().pipe(
          catchError((error) => {
             // Обработка ошибок
             const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
             let errorMessage = 'Internal Server Error'; // Default error message

             if (error instanceof HttpException && error.getResponse() && error.getResponse()['message']) {
                // Extract error messages from BadRequestException
                errorMessage = error.getResponse()['message'];
             }

             console.log('error-', error);

             return throwError(() => {
                throw new HttpException(
                    {
                       success: false,
                       errors_message: errorMessage,
                       data: null,
                    },
                    status,
                );
             });
          }),

          map((data) => ({
             success: true,
             errors_message: null,
             data: data.id,
          })),
      );
   }
}
