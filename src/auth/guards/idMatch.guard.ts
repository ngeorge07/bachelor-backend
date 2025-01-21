import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class IdMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Authenticated user's details (from JWT)
    const paramId = request.params.id; // ID passed as parameter

    // Check if the user has the superAdmin role
    if (user.roles && user.roles.includes('superAdmin')) {
      return true;
    }

    if (user.userId !== paramId) {
      throw new ForbiddenException(
        'You are not authorized to access this resource.',
      );
    }
    return true;
  }
}
