// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Environment Variables for Development build.
 * * **apiUrl**: is the target URL for the restAPI that serves the Resources (based on the TMF369 model)
 * * **authUrl**: is the target URL for the restAPI that is being used for authentication for protecting the routes
 * * **defaultListView**: setting it to `true` will load the resources on the homepage with the List View by default
 */

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  authUrl: "",
  defaultListView: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
