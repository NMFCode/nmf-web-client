import type { JsonSchema} from '@jsonforms/core';
import { rankWith, schemaMatches } from '@jsonforms/core';

const isStringEnumSchema = (schema: JsonSchema) => {
    return !Array.isArray(schema.enum) && Array.isArray(schema.oneOf) ;

};

export default rankWith(9, schemaMatches(isStringEnumSchema));
