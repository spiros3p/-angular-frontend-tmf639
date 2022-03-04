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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from 'api/encoder';

import { Observable } from 'rxjs';

import { Resource } from 'src/app/models/resource';
import { ResourceCreate } from 'src/app/models/resourceCreate';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';

import { BASE_PATH, COLLECTION_FORMATS } from 'api/variables';
import { Configuration } from 'api/configuration';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })

export class ResourceService {

    protected basePath = environment.apiUrl + '/proxy';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Creates a Resource
     * This operation creates a Resource entity.
     * @param resource The Resource to be created
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createResource(resource: ResourceCreate, observe?: 'body', reportProgress?: boolean): Observable<Resource>;
    public createResource(resource: ResourceCreate, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resource>>;
    public createResource(resource: ResourceCreate, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resource>>;
    public createResource(resource: ResourceCreate, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (resource === null || resource === undefined) {
            throw new Error('Required parameter resource was null or undefined when calling createResource.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<Resource>(`${this.basePath}/resource`,
            resource,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Deletes a Resource
     * This operation deletes a Resource entity.
     * @param id Identifier of the Resource
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteResource(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteResource(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteResource(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteResource(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteResource.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json;charset=utf-8'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/resource/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List or find Resource objects
     * This operation list or find Resource entities
     * @param fields Comma-separated properties to be provided in response
     * @param offset Requested index for start of resources to be provided in response
     * @param limit Requested number of resources to be provided in response
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listResource(fields?: string, offset?: number, limit?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Resource>>;
    public listResource(fields?: string, offset?: number, limit?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Resource>>>;
    public listResource(fields?: string, offset?: number, limit?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Resource>>>;
    public listResource(fields?: string, offset?: number, limit?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (fields !== undefined && fields !== null) {
            queryParameters = queryParameters.set('fields', <any>fields);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json;charset=utf-8'
        ];

        return this.httpClient.get<Resource[]>(`${this.basePath}/resource`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates partially a Resource
     * This operation updates partially a Resource entity.
     * @param id Identifier of the Resource
     * @param resource The Resource to be updated
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public patchResource(id: string, resource: ResourceUpdate, observe?: 'body', reportProgress?: boolean): Observable<Resource>;
    public patchResource(id: string, resource: ResourceUpdate, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resource>>;
    public patchResource(id: string, resource: ResourceUpdate, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resource>>;
    public patchResource(id: string, resource: ResourceUpdate, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling patchResource.');
        }

        if (resource === null || resource === undefined) {
            throw new Error('Required parameter resource was null or undefined when calling patchResource.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<Resource>(`${this.basePath}/resource/${encodeURIComponent(String(id))}`,
            resource,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves a Resource by ID
     * This operation retrieves a Resource entity. Attribute selection is enabled for all first level attributes.
     * @param id Identifier of the Resource
     * @param fields Comma-separated properties to provide in response
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveResource(id: string | any, fields?: string, observe?: 'body', reportProgress?: boolean): Observable<Resource>;
    public retrieveResource(id: string | any, fields?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resource>>;
    public retrieveResource(id: string | any, fields?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resource>>;
    public retrieveResource(id: string | any, fields?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling retrieveResource.');
        }


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (fields !== undefined && fields !== null) {
            queryParameters = queryParameters.set('fields', <any>fields);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json;charset=utf-8'
        ];

        return this.httpClient.get<Resource>(`${this.basePath}/resource/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
