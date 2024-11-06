import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { Envs } from '../../envs/env';

export const ApiDataResponse = <TModel extends Type>(
    model: TModel,
    description?: string,
    isArray = false,
): MethodDecorator => {
    if (!Envs.swagger.isWriteConfig) return applyDecorators();

    return applyDecorators(
        ApiExtraModels(model),
        ApiOperation({ description: `метод ${description}` }),
        ApiOkResponse({
            schema: {
                properties: {
                    success: { type: 'boolean', description: 'является ли запрос успешным' },
                    data: isArray
                        ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                        : { $ref: getSchemaPath(model) },
                },
            },
        }),
    );
};
