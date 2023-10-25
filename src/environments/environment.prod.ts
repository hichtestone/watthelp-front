export const environment = {
  production: true,
  api_uri: 'https://api-v2.watthelp.fr',
  places_api_key: 'AIzaSyAkGmwZBoe-jsgJOlxUk3cZ1nGpuxnHVY0',
  mercure_hub: 'https://mercure.watthelp.fr/well-known/mercure',
  mercure_path: 'https://app.watthelp.fr',
  availableLangs: ['fr', 'en', 'es'],

  snackbar_timer: 4000,

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
