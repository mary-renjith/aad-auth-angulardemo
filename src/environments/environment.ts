// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  postLogoutUrl:"http://localhost:4200",
  firebase: {
    apiKey: "AIzaSyCXblgEp9XJyxMccPlShpGZMWNQYfifWSA",
    authDomain: "skillportal-ce043.firebaseapp.com",
    projectId: "skillportal-ce043",
    storageBucket: "skillportal-ce043.appspot.com",
    messagingSenderId: "135968548663",
    appId: "1:135968548663:web:0c3bbe5dfc0204ea601cb2"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
