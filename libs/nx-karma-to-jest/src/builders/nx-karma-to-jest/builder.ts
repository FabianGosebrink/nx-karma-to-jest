import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NxKarmaToJestBuilderSchema } from './schema';

export function runBuilder(
  options: NxKarmaToJestBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of({ success: true }).pipe(
    tap(() => {
      context.logger.info('Builder ran for nx-karma-to-jest');
    })
  );
}

export default createBuilder(runBuilder);
