/**
 * Resource Inventory Management
 * This is Swagger UI environment generated for the TMF Resource Inventory Management specification
 *
 * OpenAPI spec version: 4.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Related Entity reference. A related party defines party or party role linked to a specific entity.
 */
export interface RelatedParty { 
    /**
     * Unique identifier of a related entity.
     */
    id: string;
    /**
     * Reference of the related entity.
     */
    href?: string;
    /**
     * Name of the related entity.
     */
    name?: string;
    /**
     * Role played by the related party
     */
    role?: string;
    /**
     * When sub-classing, this defines the super-class
     */
    baseType?: string;
    /**
     * A URI to a JSON-Schema file that defines additional attributes and relationships
     */
    schemaLocation?: string;
    /**
     * When sub-classing, this defines the sub-class entity name
     */
    type?: string;
    /**
     * The actual type of the target instance when needed for disambiguation.
     */
    referredType: string;
}
