import type { JsonSchema} from '@jsonforms/core';
import { rankWith, schemaMatches } from '@jsonforms/core';

export const isStringEnumSchema = (schema: JsonSchema) => {
    return schema.type === 'string' && !Array.isArray(schema.enum) && Array.isArray(schema.oneOf);

};

export default rankWith(3, schemaMatches(isStringEnumSchema));
