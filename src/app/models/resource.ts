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
// import { AttachmentRefOrValue } from './attachmentRefOrValue';
import { Any } from './any';
import { Characteristic } from './characteristic';
// import { Note } from './note';
// import { RelatedParty } from './relatedParty';
// import { RelatedPlaceRefOrValue } from './relatedPlaceRefOrValue';
import { ResourceAdministrativeStateType } from './resourceAdministrativeStateType';
import { ResourceOperationalStateType } from './resourceOperationalStateType';
// import { ResourceRelationship } from './resourceRelationship';
// import { ResourceSpecificationRef } from './resourceSpecificationRef';
import { ResourceStatusType } from './resourceStatusType';
import { ResourceUsageStateType } from './resourceUsageStateType';


/**
 * Resource is an abstract entity that describes the common set of attributes shared by all concrete resources (e.g. TPE, EQUIPMENT) in the inventory.
 */
export interface Resource { 
    /**
     * Identifier of an instance of the resource. Required to be unique within the resource type.  Used in URIs as the identifier for specific instances of a type.
     */
    id: string;
    /**
     * The URI for the object itself.
     */
    href: string;
    /**
     * Category of the concrete resource. e.g Gold, Silver for MSISDN concrete resource
     */
    category?: string;
    /**
     * free-text description of the resource
     */
    description?: string;
    /**
     * A date time( DateTime). The date till the resource is operating
     */
    // endOperatingDate?: Date;
    /**
     * A string used to give a name to the resource
     */
    name?: string;
    /**
     * A field that identifies the specific version of an instance of a resource.
     */
    resource_version?: string;
    /**
     * A date time( DateTime). The date from which the resource is operating
     */
    // startOperatingDate?: Date;
    /**
     * Activation feature
     */
    activation_feature?: Array<any>;
    /**
     * Tracks the lifecycle status of the resource, such as planning, installing, opereating, retiring and so on.
     */
    administrative_state?: ResourceAdministrativeStateType;
    // attachment?: Array<AttachmentRefOrValue>;
    // note?: Array<Note>;
    /**
     * Tracks the lifecycle status of the resource, such as planning, installing, opereating, retiring and so on.
     */
    operational_state?: ResourceOperationalStateType;
    // place?: RelatedPlaceRefOrValue;
    // relatedParty?: Array<RelatedParty>;
    resource_characteristic?: Array<Characteristic>;
    // resourceRelationship?: Array<ResourceRelationship>;
    // resourceSpecification?: ResourceSpecificationRef;
    /**
     * Tracks the lifecycle status of the resource, such as planning, installing, opereating, retiring and so on.
     */
    resource_status?: ResourceStatusType;
    /**
     * Tracks the lifecycle status of the resource, such as planning, installing, opereating, retiring and so on.
     */
    usage_state?: ResourceUsageStateType;
    /**
     * When sub-classing, this defines the super-class
     */
    // baseType?: string;
    /**
     * A URI to a JSON-Schema file that defines additional attributes and relationships
     */
    // schemaLocation?: string;
    /**
     * When sub-classing, this defines the sub-class entity name
     */
    // type?: string;
}
