import { ROUTE_ARGS } from './constants';
import { ExecutionContext } from './contexts/execution-context';

export enum RouteParamtypes {
  REQUEST = 0,
  RESPONSE = 1,
  NEXT = 2,
  BODY = 3,
  QUERY = 4,
  PARAM = 5,
  HEADERS = 6,
  SESSION = 7,
  FILE = 8,
  FILES = 9,
  HOST = 10,
  IP = 11,
  RAW_BODY = 12,
  USER_AGENT = 13,
  ACCEPTS = 14,
}

export type RouteArgType = {
  type: RouteParamtypes;
  data: object | string | number;
  handler: CustomRouteParamDecoratorHandler;
};

function createRouteParamDecorator(paramType: RouteParamtypes) {
  return (data?: object | string | number): ParameterDecorator =>
    (target, key, index) => {
      const args =
        Reflect.getMetadata(ROUTE_ARGS, target.constructor, key) || [];
      args[index] = {
        type: paramType,
        data: data,
      };

      Reflect.defineMetadata(ROUTE_ARGS, args, target.constructor, key);
    };
}

type CustomRouteParamDecoratorHandler = (
  data: any,
  context: ExecutionContext,
) => any;

export function createParamDecorator(
  handler: CustomRouteParamDecoratorHandler,
): ParameterDecorator {
  return (data?: string | object | number) => (target, key, index) => {
    const args = Reflect.getMetadata(ROUTE_ARGS, target.constructor, key) || [];
    args[index] = {
      data: data,
      handler,
    };

    Reflect.defineMetadata(ROUTE_ARGS, args, target.constructor, key);
    console.log(Reflect.getMetadata(ROUTE_ARGS, target.constructor, key) || []);
  };
}

export const Req: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.REQUEST,
);

export const Res: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.RESPONSE,
);

export const Query: (key?: string) => ParameterDecorator =
  createRouteParamDecorator(RouteParamtypes.QUERY);

export const Param: (key?: string) => ParameterDecorator =
  createRouteParamDecorator(RouteParamtypes.PARAM);

export const Body: (key?: string) => ParameterDecorator =
  createRouteParamDecorator(RouteParamtypes.BODY);

export const Header: (key?: string) => ParameterDecorator =
  createRouteParamDecorator(RouteParamtypes.HEADERS);

export const IP: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.IP,
);

export const UserAgent: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.USER_AGENT,
);

export const Host: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.USER_AGENT,
);

export const Accepts: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.ACCEPTS,
);