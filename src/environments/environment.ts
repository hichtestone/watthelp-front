// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_uri: 'http://localhost',
  places_api_key: 'AIzaSyAkGmwZBoe-jsgJOlxUk3cZ1nGpuxnHVY0',
  snackbar_timer: 4000,
  availableLangs: ['fr', 'en', 'es'],
  mercure_hub: 'https://mercure.dev.sprintechno.com/.well-known/mercure',
  mercure_path: 'http://localhost:4200',

  // User configuration
  user: {
    // Password security
    password: {
      min_length: 8,
      case_diff_required: true,
      number_required: false,
      special_char_required: true
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
